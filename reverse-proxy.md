### 1) Next.js config (subpath)

`/srv/vayyar-care-site/next.config.js`

```js
/** @type {import('next').NextConfig} */
module.exports = {
    basePath: "/care",
    trailingSlash: false,
    output: "standalone", // optional but nice for prod
};
```

Build & run it on an internal port:

```bash
cd /srv/vayyar-care-site
npm ci
npm run build
PORT=3001 npm start
```

_(Recommended: make a systemd service; example at the end.)_

---

### 2) Nginx: reverse-proxy only `/care` to Next.js

Edit your vhost, e.g. `/etc/nginx/sites-available/vayyar.com`:

```nginx
server {
  listen 80;
  listen 443 ssl http2;
  server_name vayyar.com www.vayyar.com;

  # WordPress root
  root /srv/vayyar.com;
  index index.php index.html;

  # --- Next.js under /care ---
  # EXACT /care (no redirect, no slash add)
  location = /care {
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Connection "";
    proxy_pass http://127.0.0.1:3001;
  }

  # Everything under /care/... goes to Next.js
  location ^~ /care/ {
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Connection "";
    proxy_read_timeout 60s;
    proxy_send_timeout 60s;

    # IMPORTANT: no path suffix on proxy_pass so original URI (/care/...) is preserved
    proxy_pass http://127.0.0.1:3001;
  }

  # --- WordPress for everything else ---
  location / {
    try_files $uri $uri/ /index.php?$args;
  }

  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;  # adjust if needed
  }

  # (Optional) Static caching for WP
  location ~* \.(?:css|js|jpg|jpeg|gif|png|svg|ico|woff2?)$ {
    expires 7d;
    access_log off;
    add_header Cache-Control "public, max-age=604800, immutable";
    try_files $uri =404;
  }
}
```

Reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

### 3) Avoid collisions

-   Make sure **no WordPress page/slug** named `care` exists.
-   Keep the `/care` `location` blocks **above** the generic `location /` and PHP locations.

---

### 4) Quick test

```bash
curl -I https://vayyar.com/care
# Expect: HTTP/2 200 (served by Next.js), no 301/302
curl -I https://vayyar.com/care/_next/static/chunks/webpack-*.js
# Should be 200 via proxy
```

---

### (Optional) systemd service for the Next app

`/etc/systemd/system/vayyar-care.service`

```ini
[Unit]
Description=Next.js - Vayyar Care
After=network.target

[Service]
Type=simple
WorkingDirectory=/srv/vayyar-care-site
Environment=PORT=3001
ExecStart=/usr/bin/npm start
Restart=always
User=www-data
# If you use nvm/node via /usr/bin/node adjust ExecStart to call node directly:
# ExecStart=/usr/bin/node ./.next/standalone/server.js
# and set WorkingDirectory accordingly.

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now vayyar-care
```

If anything 404s under `/care`, it’s almost always (a) missing `basePath: '/care'` in Next.js, (b) a WP slug collision, or (c) the `/care` locations sitting **below** your catch-all `location /`.
