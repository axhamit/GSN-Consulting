import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import Job from "@/models/Job";

const MAX_RESUME_SIZE = 1024 * 1024;
const RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    if (typeof body.resume !== "string" || typeof body.resumeName !== "string") {
      return NextResponse.json({ error: "Please upload your resume" }, { status: 400 });
    }

    const resumeMatch = body.resume.match(/^data:([^;]+);base64,([A-Za-z0-9+/]+={0,2})$/);
    if (!resumeMatch || !RESUME_TYPES.has(resumeMatch[1])) {
      return NextResponse.json({ error: "Resume must be a PDF, DOC, or DOCX file" }, { status: 400 });
    }
    const resumeBuffer = Buffer.from(resumeMatch[2], "base64");
    if (
      resumeBuffer.length === 0 ||
      resumeBuffer.length > MAX_RESUME_SIZE ||
      resumeBuffer.toString("base64") !== resumeMatch[2]
    ) {
      return NextResponse.json({ error: "Resume must be no larger than 1 MB" }, { status: 400 });
    }

    await connectDB();

    let jobTitle = body.jobTitle || "General application";
    if (body.job) {
      const job = await Job.findById(body.job);
      if (job) jobTitle = job.title;
    }

    const application = await Application.create({
      job: body.job || null,
      jobTitle,
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      experience: body.experience || "",
      currentCompany: body.currentCompany || "",
      noticePeriod: body.noticePeriod || "",
      message: body.message || "",
      resume: body.resume,
      resumeName: body.resumeName.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 200) || "resume",
      resumeUrl: body.resumeUrl || "",
      hasResume: true,
      status: "new",
    });

    return NextResponse.json({ ok: true, application }, { status: 201 });
  } catch (err) {
    console.error("Error submitting application:", err);
    return NextResponse.json({ error: "Could not submit application" }, { status: 500 });
  }
}
