import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/libs/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  //db check
  if (body.username === "admin" && body.password === "123") {
    //generate token
    const token = await new SignJWT({
      username: body.username,
      role: "admin",
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .setExpirationTime("30s")
      .sign(getJwtSecretKey());
    console.log(token);
    //set token to cookie
    const response = NextResponse.json({
      success: true,
      token,
    });
    response.cookies.set({
      name: "token",
      value: token,
      path: "/",
    });
    return response;
  }

  return NextResponse.json({
    success: false,
    token: null,
  });
}
