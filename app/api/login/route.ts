import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const body = await req.json();
  const { username, password } = body;
  if (username === "test" && password === "test") {
    const token = jwt.sign({ username }, "Token", {
      expiresIn: "1h",
    });
    const encryptedSessionData = token;
    cookies().set("session", encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return Response.json({ token, user: { username } });
  } else {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const encryptedSessionData: any = cookies().get("session");
  if (!encryptedSessionData) {
    return Response.json({ message: "No session found"}, { status: 401});
  }
  const session = jwt.verify(encryptedSessionData.value, "Token");
  return Response.json(session);
}
