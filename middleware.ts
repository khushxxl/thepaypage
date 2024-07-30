// middleware.ts
import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*"); // Adjust this according to your needs
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}
