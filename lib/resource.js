import { revalidatePath } from "next/cache";
import Job from "@/models/Job";
import Application from "@/models/Application";
import Lead from "@/models/Lead";

export const MODELS = { jobs: Job, applications: Application, leads: Lead };

export function cleanBody(resource, body = {}) {
  const { _id, __v, createdAt, updatedAt, ...rest } = body;
  if (resource === "applications") {
    const out = {};
    if (rest.status !== undefined) out.status = rest.status;
    if (rest.notes !== undefined) out.notes = rest.notes;
    return out;
  }
  if (resource === "leads") {
    const out = {};
    if (rest.status !== undefined) out.status = rest.status;
    if (rest.notes !== undefined) out.notes = rest.notes;
    return out;
  }
  return rest;
}

export function refreshSite() {
  revalidatePath("/", "layout");
}
