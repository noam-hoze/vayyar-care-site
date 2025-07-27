import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { videoId } = await req.json();

        if (!videoId) {
            return NextResponse.json(
                { error: "videoId is required" },
                { status: 400 }
            );
        }

        const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
        const apiToken = process.env.CLOUDFLARE_API_TOKEN;
        const customerSubdomain = process.env.CLOUDFLARE_CUSTOMER_SUBDOMAIN;

        if (!accountId || !apiToken || !customerSubdomain) {
            console.error(
                "Cloudflare environment variables are not fully set."
            );
            return NextResponse.json(
                { error: "Stream credentials not configured." },
                { status: 500 }
            );
        }

        // 1. Fetch the signed token from Cloudflare
        const tokenResponse = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/${videoId}/token`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            }
        );

        if (!tokenResponse.ok) {
            const errorBody = await tokenResponse.text();
            console.error(
                "Failed to fetch stream token from Cloudflare:",
                tokenResponse.status,
                errorBody
            );
            return NextResponse.json(
                { error: "Failed to fetch stream token from Cloudflare" },
                { status: tokenResponse.status }
            );
        }

        const { result } = await tokenResponse.json();
        const token = result.token;

        // 2. Construct the HLS URL
        const hlsUrl = `https://customer-${customerSubdomain}.cloudflarestream.com/${token}/manifest/video.m3u8`;

        return NextResponse.json({ hlsUrl });
    } catch (error) {
        console.error("Error in stream API route:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
