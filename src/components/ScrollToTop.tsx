'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  const [oldPathname, setOldPathname] = useState(pathname);

  useEffect(() => {
    if(pathname !== '/contact' && oldPathname !== '/contact') {
      window.scrollTo(0, 0);
    }
    setOldPathname(pathname);
  }, [pathname]);

  return null;
}