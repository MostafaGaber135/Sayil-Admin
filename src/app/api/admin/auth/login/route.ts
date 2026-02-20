import { NextResponse } from "next/server";

type NetworkErrorResult = { __network_error__: true; error: unknown };
type UpstreamResult = Response | NetworkErrorResult;

function isNetworkErrorResult(value: UpstreamResult): value is NetworkErrorResult {
  return (
    typeof value === "object" &&
    value !== null &&
    "__network_error__" in value &&
    (value as NetworkErrorResult).__network_error__ === true
  );
}

export async function POST(req: Request) {
  const API_BASE_URL = process.env.API_BASE_URL;

  if (!API_BASE_URL) {
    return NextResponse.json(
      {
        statusCode: 500,
        succeeded: false,
        message: "API_BASE_URL is not configured on the server.",
        errors: ["Missing API_BASE_URL"],
        data: null,
      },
      { status: 500 }
    );
  }

  const body: unknown = await req.json().catch(() => null);

  const upstream: UpstreamResult = await fetch(
    `${API_BASE_URL}/api/admin/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain",
      },
      body: JSON.stringify(body ?? {}),
      cache: "no-store",
    }
  ).catch((error: unknown) => {
    return { __network_error__: true, error };
  });

  if (isNetworkErrorResult(upstream)) {
    return NextResponse.json(
      {
        statusCode: 502,
        succeeded: false,
        message: "Cannot reach upstream API.",
        errors: ["Upstream unreachable"],
        data: null,
      },
      { status: 502 }
    );
  }

  const status = upstream.status;
  const contentType = upstream.headers.get("content-type") || "";
  const text = await upstream.text();

  if (contentType.includes("application/json")) {
    return new NextResponse(text, {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const json = JSON.parse(text);
    return NextResponse.json(json, { status });
  } catch {
    return new NextResponse(text, {
      status,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
