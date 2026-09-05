import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { CONTACT_EMAIL, CONTACT_PHONE } from "../constants/constants";

const ContactUs = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      // Clipboard unavailable (e.g. non-secure context) — the mailto link
      // below still works as a fallback.
    }
  };

  return (
    <div className="app-page flex items-center justify-center">
      <div className="card w-full max-w-md p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Get in touch
        </p>
        <h2 className="page-title mt-2 text-2xl">Contact Us</h2>
        <p className="page-subtitle mt-1">We're happy to help with your bookings</p>

        <div className="mt-7 space-y-3 text-left">
          <div className="flex items-center justify-between gap-3 rounded-[14px] border border-stroke bg-gray-2 px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Email
              </p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="link text-sm">
                {CONTACT_EMAIL}
              </a>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="btn btn-secondary shrink-0 px-3 py-1.5 text-xs"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          {CONTACT_PHONE ? (
            <div className="rounded-[14px] border border-stroke bg-gray-2 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Phone
              </p>
              <p className="text-sm text-ink">{CONTACT_PHONE}</p>
            </div>
          ) : null}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary mt-8 w-full"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
