import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Lead from "@/models/Lead";

export async function POST(req) {
  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    await connectDB();
    await Lead.create({
      name,
      email,
      phone: typeof body.phone === "string" ? body.phone.trim() : "",
      type: body.who === "Company looking to hire" ? "employer" : "general",
      interest: typeof body.role === "string" ? body.role.trim() : "",
      message,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("contact:", err);
    return NextResponse.json({ error: "Could not submit your message. Please try again later." }, { status: 500 });
  }
}
