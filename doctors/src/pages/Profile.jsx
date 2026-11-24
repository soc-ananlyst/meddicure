import React, { useMemo, useState } from "react";

const INITIAL_REQUESTS = [
  {
    id: "REQ-408",
    patientName: "Grace Wanjiku",
    age: 29,
    visitType: "Teleconsultation",
    requestedSlot: "Today, 5:30 PM",
    chiefComplaint: "Persistent dry cough and mild fatigue for 4 days",
    urgency: "Priority",
    status: "Pending",
    notes: "No fever reported; requests lab order check.",
  },
  {
    id: "REQ-409",
    patientName: "David Ochieng",
    age: 44,
    visitType: "In-Clinic Follow-up",
    requestedSlot: "Tomorrow, 9:15 AM",
    chiefComplaint: "Blood pressure log review & lisinopril refill request",
    urgency: "Routine",
    status: "Pending",
    notes: "Uploaded home BP readings averaging 132/84 mmHg.",
  },
  {
    id: "REQ-410",
    patientName: "Amina Hassan",
    age: 34,
    visitType: "Urgent Triage",
    requestedSlot: "Today, 6:15 PM",
    chiefComplaint: "Localized skin rash after starting new antibiotic",
    urgency: "Urgent",
    status: "Pending",
    notes: "No breathing difficulty; attached clear photo of rash.",
  },
  {
    id: "REQ-411",
    patientName: "Samuel Mwangi",
    age: 52,
    visitType: "Prescription Renewal",
    requestedSlot: "Tomorrow, 11:00 AM",
    chiefComplaint: "Metformin 500mg & HbA1c quarterly review",
    urgency: "Routine",
    status: "Approved",
    notes: "Latest HbA1c at 6.6%; approved 90-day supply.",
  },
];

const INITIAL_ACTION_LOG = [
  {
    id: "ACT-91",
    time: "3:40 PM",
    action: "Signed e-prescription",
    detail: "Amoxicillin 500mg for Patient #PT-204",
    tag: "Prescription",
  },
  {
    id: "ACT-92",
    time: "2:15 PM",
    action: "Completed video consultation",
    detail: "Follow-up summary shared with Brian Kiprop",
    tag: "Consultation",
  },
  {
    id: "ACT-93",
    time: "12:50 PM",
    action: "Ordered diagnostic panel",
    detail: "CBC & Fasting Lipid Profile for Mary Njeri",
    tag: "Lab Order",
  },
];

const URGENCY_STYLES = {
  Urgent: "bg-rose-50 text-rose-700 border-rose-200",
  Priority: "bg-amber-50 text-amber-800 border-amber-200",
  Routine: "bg-teal-50 text-teal-800 border-teal-200",
};

const STATUS_STYLES = {
  Pending: "bg-slate-100 text-slate-700 border-slate-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rescheduled: "bg-sky-50 text-sky-700 border-sky-200",
  Declined: "bg-rose-50 text-rose-700 border-rose-200",
};

function TendLogoMark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="36" height="36" rx="10" fill="#0F766E" />
        <path
          d="M18 9V27M9 18H27"
          stroke="#CCFBF1"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="26.5" cy="9.5" r="3.5" fill="#5EEAD4" />
      </svg>
      <div>
        <span className="text-lg font-bold tracking-tight text-slate-900">
          tend
        </span>
        <span className="ml-2 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-medium text-teal-700 border border-teal-200">
          Clinician Portal
        </span>
      </div>
    </div>
  );
}

export default function Profile() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [actionLog, setActionLog] = useState(INITIAL_ACTION_LOG);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState("REQ-408");
  const [acceptingRequests, setAcceptingRequests] = useState(true);
  const [rescheduleSlot, setRescheduleSlot] = useState("Tomorrow, 2:00 PM");
  const [quickNote, setQuickNote] = useState("");

  const doctor = {
    name: "Dr. Faith Kamau, MBChB, MMed",
    specialty: "Internal Medicine & Telehealth Lead",
    licenseNo: "KMPDC-MED-8492",
    clinic: "tend Care Hub • Nairobi",
    rating: "4.94",
    consultationsCompleted: 1420,
    avgResponseTime: "11 mins",
  };

  const selectedRequest = useMemo(
    () => requests.find((r) => r.id === selectedRequestId) || requests[0],
    [requests, selectedRequestId]
  );

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesStatus =
        statusFilter === "All" || req.status === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        req.patientName.toLowerCase().includes(q) ||
        req.chiefComplaint.toLowerCase().includes(q) ||
        req.id.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [requests, statusFilter, searchQuery]);

  const metrics = useMemo(() => {
    const pendingCount = requests.filter((r) => r.status === "Pending").length;
    const urgentCount = requests.filter(
      (r) => r.status === "Pending" && r.urgency === "Urgent"
    ).length;
    const approvedCount = requests.filter((r) => r.status === "Approved").length;
    return { pendingCount, urgentCount, approvedCount };
  }, [requests]);

  function recordAction(action, detail, tag) {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setActionLog((prev) => [
      {
        id: `ACT-${Date.now().toString().slice(-4)}`,
        time: timeLabel,
        action,
        detail,
        tag,
      },
      ...prev,
    ]);
  }

  function handleRequestDecision(id, nextStatus, customSlot) {
    const target = requests.find((r) => r.id === id);
    if (!target) return;

    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status: nextStatus,
              requestedSlot: customSlot || req.requestedSlot,
              notes: quickNote.trim()
                ? `${req.notes} • Note: ${quickNote.trim()}`
                : req.notes,
            }
          : req
      )
    );

    recordAction(
      `${nextStatus} request (${target.id})`,
      `${target.patientName} — ${target.visitType}${
        customSlot ? ` (${customSlot})` : ""
      }`,
      "Patient Request"
    );
    setQuickNote("");
  }

  function toggleAvailability() {
    const next = !acceptingRequests;
    setAcceptingRequests(next);
    recordAction(
      next ? "Opened incoming request queue" : "Paused new patient requests",
      next
        ? "Patients can book immediate & scheduled slots"
        : "Existing appointments remain active",
      "Availability"
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <TendLogoMark />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleAvailability}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                acceptingRequests
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                  : "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  acceptingRequests ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              {acceptingRequests
                ? "Accepting Patient Requests"
                : "Requests Paused"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* Doctor Profile Header Card */}
        <section className="rounded-2xl border border-teal-100 bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-800 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-500/20 text-xl font-bold text-teal-100 ring-1 ring-teal-300/40">
                FK
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold sm:text-2xl">
                    {doctor.name}
                  </h1>
                  <span className="rounded-md bg-white/15 px-2.5 py-0.5 text-xs font-medium text-teal-100">
                    {doctor.licenseNo}
                  </span>
                </div>
                <p className="mt-1 text-sm text-teal-100">
                  {doctor.specialty} • {doctor.clinic}
                </p>
              </div>
            </div>

            {/* Key Stats Strip */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-xs">
                <p className="text-xs text-teal-100">Pending Requests</p>
                <p className="mt-0.5 text-xl font-bold">{metrics.pendingCount}</p>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-xs">
                <p className="text-xs text-teal-100">Urgent Triage</p>
                <p className="mt-0.5 text-xl font-bold text-amber-200">
                  {metrics.urgentCount}
                </p>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-xs">
                <p className="text-xs text-teal-100">Approved Today</p>
                <p className="mt-0.5 text-xl font-bold text-emerald-200">
                  {metrics.approvedCount}
                </p>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-xs">
                <p className="text-xs text-teal-100">Avg. Response</p>
                <p className="mt-0.5 text-xl font-bold">
                  {doctor.avgResponseTime}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Workspace: Patient Requests + Inspector + Action Feed */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 7 Cols: Incoming Patient Requests */}
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-7">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Patient Requests Queue
                </h2>
                <p className="text-xs text-slate-500">
                  Review consultations, renewals, and triage requests
                </p>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient, ID, or symptom..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none sm:w-60"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {["All", "Pending", "Approved", "Rescheduled", "Declined"].map(
                (tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setStatusFilter(tab)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      statusFilter === tab
                        ? "bg-teal-700 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Requests List */}
            <div className="space-y-3">
              {filteredRequests.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
                  No patient requests match your current filter.
                </div>
              ) : (
                filteredRequests.map((req) => {
                  const isSelected = selectedRequest?.id === req.id;
                  return (
                    <div
                      key={req.id}
                      onClick={() => setSelectedRequestId(req.id)}
                      className={`cursor-pointer rounded-xl border p-4 transition ${
                        isSelected
                          ? "border-teal-600 bg-teal-50/40 ring-1 ring-teal-600/20"
                          : "border-slate-200 bg-white hover:border-teal-300"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-semibold text-teal-700">
                              {req.id}
                            </span>
                            <h3 className="text-sm font-semibold text-slate-900">
                              {req.patientName} ({req.age}y)
                            </h3>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                                URGENCY_STYLES[req.urgency]
                              }`}
                            >
                              {req.urgency}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-700">
                            {req.chiefComplaint}
                          </p>
                        </div>

                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                            STATUS_STYLES[req.status]
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-xs text-slate-500">
                        <span>
                          <strong className="font-medium text-slate-700">
                            Type:
                          </strong>{" "}
                          {req.visitType} •{" "}
                          <strong className="font-medium text-slate-700">
                            Slot:
                          </strong>{" "}
                          {req.requestedSlot}
                        </span>
                        <span className="font-medium text-teal-700">
                          Inspect & Act →
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Right 5 Cols: Selected Request Actions + Action Audit Log */}
          <div className="space-y-6 lg:col-span-5">
            {/* Request Action Panel */}
            {selectedRequest && (
              <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-semibold text-teal-700">
                      {selectedRequest.id} • {selectedRequest.visitType}
                    </span>
                    <h2 className="text-base font-semibold text-slate-900">
                      {selectedRequest.patientName}
                    </h2>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                      STATUS_STYLES[selectedRequest.status]
                    }`}
                  >
                    {selectedRequest.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-slate-700">
                    <span className="font-medium text-slate-900">
                      Presenting issue:
                    </span>{" "}
                    {selectedRequest.chiefComplaint}
                  </p>
                  <p className="text-xs text-slate-600">
                    <span className="font-medium text-slate-800">
                      Clinical context:
                    </span>{" "}
                    {selectedRequest.notes}
                  </p>
                  <p className="text-xs text-slate-500">
                    Requested window: {selectedRequest.requestedSlot}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-700">
                    Alternative Slot (for Reschedule)
                  </label>
                  <input
                    type="text"
                    value={rescheduleSlot}
                    onChange={(e) => setRescheduleSlot(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-700">
                    Doctor Note / Action Instruction
                  </label>
                  <textarea
                    rows={2}
                    value={quickNote}
                    onChange={(e) => setQuickNote(e.target.value)}
                    placeholder="Add instructions for the patient or care team..."
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleRequestDecision(selectedRequest.id, "Approved")
                    }
                    className="rounded-xl bg-teal-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleRequestDecision(
                        selectedRequest.id,
                        "Rescheduled",
                        rescheduleSlot
                      )
                    }
                    className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-800 transition hover:bg-sky-100"
                  >
                    Reschedule
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleRequestDecision(selectedRequest.id, "Declined")
                    }
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    Decline
                  </button>
                </div>
              </section>
            )}

            {/* Doctor Actions Monitor */}
            <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Recent Doctor Actions
                  </h2>
                  <p className="text-xs text-slate-500">
                    Live activity log across consultations & prescriptions
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {actionLog.length} logged
                </span>
              </div>

              <ul className="divide-y divide-slate-100">
                {actionLog.map((item) => (
                  <li key={item.id} className="py-3 first:pt-1 last:pb-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-900">
                        {item.action}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600">
                      {item.detail}
                    </p>
                    <span className="mt-1.5 inline-block rounded bg-teal-50 px-2 py-0.5 text-[10px] font-medium text-teal-700">
                      {item.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}