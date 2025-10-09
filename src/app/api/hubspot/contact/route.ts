import { NextResponse } from "next/server";

type ContactFormBody = {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    jobTitle: string;
    country: string;
    phoneNumber: string;
    message: string;
    pageUri?: string;
    pageName?: string;
    hp?: string; // honeypot
};

function getCookieFromHeader(
    cookieHeader: string,
    name: string
): string | undefined {
    const parts = cookieHeader.split(";").map((c) => c.trim());
    for (const part of parts) {
        if (part.startsWith(name + "=")) {
            return decodeURIComponent(part.substring(name.length + 1));
        }
    }
    return undefined;
}

export async function POST(request: Request) {
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID;
    const privateAppToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

    if (!portalId || !formId || !privateAppToken) {
        return NextResponse.json(
            { error: "HubSpot environment variables are not configured." },
            { status: 500 }
        );
    }

    let body: ContactFormBody;
    try {
        body = (await request.json()) as ContactFormBody;
    } catch (err) {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 }
        );
    }

    // Basic honeypot check: if set, act as success without submitting
    if (body.hp) {
        return NextResponse.json({ ok: true, skipped: true });
    }

    const cookieHeader = request.headers.get("cookie") || "";
    const hutk = getCookieFromHeader(cookieHeader, "hubspotutk");

    const fields = [
        { name: "firstname", value: body.firstName },
        { name: "lastname", value: body.lastName },
        { name: "email", value: body.email },
        { name: "company", value: body.companyName },
        { name: "jobtitle", value: body.jobTitle },
        { name: "country", value: body.country },
        { name: "phone", value: body.phoneNumber },
        { name: "message", value: body.message },
    ];

    const context: Record<string, string | undefined> = {
        pageUri: body.pageUri,
        pageName: body.pageName,
    };
    if (hutk) context.hutk = hutk;

    const hubspotPayload = {
        fields,
        context,
    };

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${privateAppToken}`,
            },
            body: JSON.stringify(hubspotPayload),
        });

        const text = await res.text();
        if (!res.ok) {
            return NextResponse.json(
                { error: "HubSpot submission failed", details: text },
                { status: res.status }
            );
        }

        // HubSpot usually returns JSON; attempt to parse but fall back to text
        try {
            const json = JSON.parse(text);
            return NextResponse.json({ ok: true, hubspot: json });
        } catch {
            return NextResponse.json({ ok: true, hubspot: text });
        }
    } catch (error: any) {
        return NextResponse.json(
            {
                error: "Unexpected error submitting to HubSpot",
                details: String(error?.message || error),
            },
            { status: 500 }
        );
    }
}
