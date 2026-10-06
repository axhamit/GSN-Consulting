import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // TODO: send email (Resend / Nodemailer) or save to a database here.
  console.log("New enquiry:", body);
  return NextResponse.json({ ok: true });
}
