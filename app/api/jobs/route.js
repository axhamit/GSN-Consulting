import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";

export async function GET() {
  try {
    await connectDB();
    const jobs = await Job.find({ visible: true }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return NextResponse.json({ error: "Could not fetch jobs" }, { status: 500 });
  }
}
