import { Suspense } from "react";
import ApplyClient from "./ApplyClient";

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="container-x py-24 text-center text-gray-500">Loading application details…</div>}>
      <ApplyClient />
    </Suspense>
  );
}
