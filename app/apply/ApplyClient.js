"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, DollarSign, FileText, MapPin, Upload, Users, X, Loader2 } from "lucide-react";

const MAX_RESUME_SIZE = 1024 * 1024;
const ACCEPTED_RESUME_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the selected resume."));
    reader.readAsDataURL(file);
  });
}

function formatFileSize(size) {
  return size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Apply() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job");
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (!jobId) {
      setLoading(false);
      return;
    }

    fetch("/api/jobs")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load job details.");
        return res.json();
      })
      .then((data) => setJob(data.jobs?.find((item) => item._id === jobId) || null))
      .catch((err) => {
        console.error("Error fetching job:", err);
        setError("Job details could not be loaded. You can still submit a general application.");
      })
      .finally(() => setLoading(false));
  }, [jobId]);

  function onResumeChange(event) {
    const file = event.target.files?.[0] || null;
    setError("");
    if (!file) {
      setResume(null);
      return;
    }
    if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
      setResume(null);
      event.target.value = "";
      setError("Please upload your resume as a PDF, DOC, or DOCX file.");
      return;
    }
    if (file.size > MAX_RESUME_SIZE) {
      setResume(null);
      event.target.value = "";
      setError("Your resume must be 1 MB or smaller.");
      return;
    }
    setResume(file);
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!resume) {
      setError("Please attach your resume before submitting.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());
      delete data.resumeFile;
      data.job = jobId || null;
      data.jobTitle = job?.title || "General application";
      data.resume = await readFileAsDataUrl(resume);
      data.resumeName = resume.name;

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Could not submit application.");
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Could not submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div className="container-x py-24 text-center text-gray-500">Loading application details…</div>;
  }

  if (success) {
    return (
      <section className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-xl rounded-3xl border border-line bg-white px-8 py-12 text-center shadow-xl shadow-ink/5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 text-teal"><CheckCircle2 size={34} /></div>
          <h1 className="mt-6 text-3xl font-bold text-ink">Application submitted!</h1>
          <p className="mt-3 leading-relaxed text-gray-600">Thank you for your interest. Our team will review your application and get back to you soon.</p>
          <button onClick={() => router.push("/")} className="btn btn-primary mt-7">Back to home</button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-navy py-12 text-white md:py-16">
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-teal/20 blur-3xl" />
        <div className="container-x relative">
          <button type="button" onClick={() => router.back()} className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white">
            <ArrowLeft size={17} /> Back
          </button>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Your next opportunity starts here</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold md:text-5xl">Let’s get to know you.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">Share a few details and upload your resume. Our recruitment team will be in touch if your profile is a match.</p>
        </div>
      </section>

      <section className="container-x py-10 md:py-14">
        <div className="grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
          <aside className="space-y-5 lg:sticky lg:top-8">
            <div className="rounded-3xl bg-ink p-7 text-white shadow-xl shadow-ink/10 md:p-8">
              <div className="flex items-center gap-3 text-teal">
                <BriefcaseBusiness size={20} />
                <span className="text-xs font-bold uppercase tracking-[0.16em]">{job ? "Position details" : "Join our talent network"}</span>
              </div>
              <h2 className="mt-5 text-2xl font-bold leading-tight md:text-3xl">{job?.title || "General application"}</h2>
              {job ? (
                <>
                  <p className="mt-2 text-white/70">{job.client || "GSN Consulting"}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.location && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/85"><MapPin size={14} />{job.location}</span>}
                    {job.type && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/85"><BriefcaseBusiness size={14} />{job.type}</span>}
                  </div>
                  <div className="mt-7 space-y-4 border-t border-white/15 pt-6">
                    {job.experience && <p className="flex items-start gap-3 text-sm text-white/80"><Users size={17} className="mt-0.5 shrink-0 text-teal" /><span><strong className="block text-white">Experience</strong>{job.experience}</span></p>}
                    {job.salary && <p className="flex items-start gap-3 text-sm text-white/80"><DollarSign size={17} className="mt-0.5 shrink-0 text-teal" /><span><strong className="block text-white">Compensation</strong>{job.salary}</span></p>}
                    {job.skills && <p className="flex items-start gap-3 text-sm text-white/80"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-teal" /><span><strong className="block text-white">Key skills</strong>{job.skills}</span></p>}
                  </div>
                  {job.description && <div className="mt-7 border-t border-white/15 pt-6"><h3 className="font-bold">About the role</h3><p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-white/75">{job.description}</p></div>}
                </>
              ) : (
                <p className="mt-3 leading-relaxed text-white/75">Tell us about your experience and the kind of opportunity you’re looking for. We’ll keep your profile in mind for future roles.</p>
              )}
            </div>
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="font-bold text-ink">A quick note</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">There is no fee to apply for a role through GSN Consulting. Your resume is shared only with our recruitment team.</p>
            </div>
          </aside>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-xl shadow-ink/5 md:p-9">
            <div className="mb-7 border-b border-line pb-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-teal">Application form</p>
              <h2 className="mt-2 text-2xl font-bold text-ink md:text-3xl">Your details</h2>
              <p className="mt-2 text-sm text-gray-600"><span className="text-red-500">*</span> Required fields</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="name">Full name <span className="text-red-500">*</span></label>
                  <input id="name" name="name" type="text" autoComplete="name" required maxLength={120} placeholder="Your full name" className="w-full rounded-xl border border-line bg-mist/50 px-4 py-3 text-ink placeholder:text-gray-400 outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="email">Email address <span className="text-red-500">*</span></label>
                  <input id="email" name="email" type="email" autoComplete="email" required maxLength={160} placeholder="you@example.com" className="w-full rounded-xl border border-line bg-mist/50 px-4 py-3 text-ink placeholder:text-gray-400 outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="phone">Phone number</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+91 98765 43210" className="w-full rounded-xl border border-line bg-mist/50 px-4 py-3 text-ink placeholder:text-gray-400 outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="experience">Years of experience</label>
                  <input id="experience" name="experience" type="text" maxLength={40} placeholder="e.g. 3–5 years" className="w-full rounded-xl border border-line bg-mist/50 px-4 py-3 text-ink placeholder:text-gray-400 outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="currentCompany">Current company</label>
                  <input id="currentCompany" name="currentCompany" type="text" maxLength={160} placeholder="Company name" className="w-full rounded-xl border border-line bg-mist/50 px-4 py-3 text-ink placeholder:text-gray-400 outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="noticePeriod">Notice period</label>
                  <input id="noticePeriod" name="noticePeriod" type="text" maxLength={60} placeholder="e.g. 30 days" className="w-full rounded-xl border border-line bg-mist/50 px-4 py-3 text-ink placeholder:text-gray-400 outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="resume">Resume / CV <span className="text-red-500">*</span></label>
                <input id="resume" name="resumeFile" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={onResumeChange} className="sr-only" />
                <label htmlFor="resume" className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-line bg-mist/40 px-5 py-7 text-center transition hover:border-teal hover:bg-teal/5">
                  {resume ? (
                    <>
                      <FileText size={28} className="text-teal" />
                      <span className="mt-3 max-w-full break-all font-semibold text-ink">{resume.name}</span>
                      <span className="mt-1 text-sm text-gray-500">{formatFileSize(resume.size)} · Click to replace</span>
                    </>
                  ) : (
                    <>
                      <Upload size={27} className="text-teal" />
                      <span className="mt-3 font-semibold text-ink">Choose a resume to upload</span>
                      <span className="mt-1 text-sm text-gray-500">PDF, DOC, or DOCX · 1 MB maximum</span>
                    </>
                  )}
                </label>
                {resume && <button type="button" onClick={() => { setResume(null); document.getElementById("resume").value = ""; }} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-red-600"><X size={14} /> Remove file</button>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="resumeUrl">LinkedIn or portfolio link <span className="font-normal text-gray-500">(optional)</span></label>
                <input id="resumeUrl" name="resumeUrl" type="url" maxLength={500} placeholder="https://linkedin.com/in/your-profile" className="w-full rounded-xl border border-line bg-mist/50 px-4 py-3 text-ink placeholder:text-gray-400 outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="message">A note for our team <span className="font-normal text-gray-500">(optional)</span></label>
                <textarea id="message" name="message" rows={4} maxLength={3000} placeholder="Tell us anything else you’d like us to know…" className="w-full resize-y rounded-xl border border-line bg-mist/50 px-4 py-3 text-ink placeholder:text-gray-400 outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10" />
              </div>

              {error && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
              <button type="submit" className="btn btn-primary w-full gap-2 py-4 text-base disabled:cursor-not-allowed disabled:opacity-60" disabled={submitting}>
                {submitting ? <><Loader2 className="animate-spin" size={18} /> Submitting…</> : "Submit application"}
              </button>
              <p className="text-center text-xs leading-relaxed text-gray-500">By submitting, you agree to be contacted by the GSN Consulting recruitment team about this application.</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
