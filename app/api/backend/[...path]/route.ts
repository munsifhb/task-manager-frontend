
import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://nest-task-manager-api.onrender.com";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function proxyRequest(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { path } = await context.params;

    const backendUrl = new URL(
      `${API_URL}/${path.map(encodeURIComponent).join("/")}`
    );

    backendUrl.search = request.nextUrl.search;

    const headers = new Headers();
    const contentType = request.headers.get("content-type");
    const cookie = request.headers.get("cookie");

    if (contentType) headers.set("content-type", contentType);
    if (cookie) headers.set("cookie", cookie);

    const method = request.method;
    const body =
      method === "GET" || method === "HEAD"
        ? undefined
        : await request.arrayBuffer();

    const backendResponse = await fetch(backendUrl, {
      method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
    });

    const responseBody = await backendResponse.arrayBuffer();

    const response = new NextResponse(responseBody, {
      status: backendResponse.status,
    });

    const responseType =
      backendResponse.headers.get("content-type");
    if (responseType) {
      response.headers.set("content-type", responseType);
    }

    const setCookies =
      backendResponse.headers.getSetCookie();

    for (const setCookie of setCookies) {
      response.headers.append("set-cookie", setCookie);
    }

    return response;
  } catch (error) {
    console.error("Backend proxy error:", error);

    return NextResponse.json(
      { message: "Unable to communicate with the backend." },
      { status: 502 }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PATCH = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
