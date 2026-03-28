import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "http://23.254.129.173:8090";

async function handler(
    req: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params;
    const search = req.nextUrl.search || "";
    const url = `${BASE_URL}/${path.join("/")}${search}`;

    const authorization = req.headers.get("authorization") || "";

    const response = await fetch(url, {
        method: req.method,
        headers: {
            "Content-Type": "application/json",
            ...(authorization ? { Authorization: authorization } : {}),
        },
        body:
            req.method !== "GET" && req.method !== "HEAD"
                ? await req.text()
                : undefined,
        cache: "no-store",
    });

    const text = await response.text();

    return new NextResponse(text, {
        status: response.status,
        headers: {
            "Content-Type":
                response.headers.get("content-type") || "application/json",
        },
    });
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };