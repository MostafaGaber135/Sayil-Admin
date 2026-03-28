import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json(
    {
      message:
        "This route is disabled. Call the backend directly (NEXT_PUBLIC_API_BASE_URL).",
    },
    { status: 404 }
  );
}
