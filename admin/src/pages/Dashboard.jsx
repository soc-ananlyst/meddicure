import React, { useMemo, useState,useContext } from "react";
import { AdminContext } from "../context/AdminContext";

const INITIAL_DOCTORS = [
  {
    id: "DOC-104",
    name: "Dr. Faith Kamau, MBChB, MMed",
    specialty: "Internal Medicine",
    licenseNo: "KMPDC-MED-8492",
    clinic: "tend Care Hub • Nairobi",
    status: "Verified",
    activeConsults: 14,
    joinedAt: "12 Oct 2026",
  },
  {
    id: "DOC-109",
    name: "Dr. Kevin Otieno, MBChB",
    specialty: "Pediatrics & Child Health",
    licenseNo: "KMPDC-MED-9134",
    clinic: "Westlands Outpatient • Nairobi",
    status: "Pending Verification",
    activeConsults: 0,
    joinedAt: "23 Nov 2026",
  },
  {
    id: "DOC-112",
    name: "Dr. Beatrice Mutua, BDS, MDS",
    specialty: "Dental & Oral Surgery",
    licenseNo: "KMPDC-DEN-4401",
    clinic: "Kilimani Medical Plaza",
    status: "Pending Verification",
    activeConsults: 0,
    joinedAt: "24 Nov 2026",
  },
  {
    id: "DOC-098",
    name: "Dr. Yusuf Abdullahi, MBChB",
    specialty: "Dermatology",
    licenseNo: "KMPDC-MED-7720",
    clinic: "Mombasa Telehealth Desk",
    status: "Suspended",
    activeConsults: 0,
    joinedAt: "04 Sep 2026",
  },
];

const INITIAL_USERS_PATIENTS = [
  {
    id: "PAT-204",
    fullName: "Grace Wanjiku",
    email: "grace.wanjiku@example.com",
    phone: "+254 712 340 819",
    role: "Patient",
    accountStatus: "Active",
    bloodGroup: "O+",
    allergies: "Penicillin",
    lastVisit: "Today, 3:40 PM",
  },
  {
    id: "PAT-384",
    fullName: "Samuel Mwangi",
    email: "samuel.mwangi@example.com",
    phone: "+254 722 908 411",
    role: "Patient",
    accountStatus: "Active",
    bloodGroup: "A+",
    allergies: "None known",
    lastVisit: "21 Nov 2026",
  },
  {
    id: "USR-512",
    fullName: "Brian Kiprop",
    email: "brian.kiprop@example.com",
    phone: "+254 701 554 920",
    role: "User",
    accountStatus: "Active",
    bloodGroup: "B+",
    allergies: "Sulfa drugs",
    lastVisit: "Today, 2:15 PM",
  },
  {
    id: "PAT-612",
    fullName: "Mary Njeri",
    email: "mary.njeri@example.com",
    phone: "+254 733 118 672",
    role: "Patient",
    accountStatus: "Inactive",
    bloodGroup: "AB-",
    allergies: "None known",
    lastVisit: "10 Nov 2026",
  },
];

const INITIAL_APPOINTMENTS = [
  {
    id: "APT-801",
    patientName: "Grace Wanjiku",
    patientId: "PAT-204",
    doctorName: "Dr. Faith Kamau, MBChB, MMed",
    doctorId: "DOC-104",
    visitType: "Teleconsultation",
    dateTime: "24 Nov 2026, 6:00 PM",
    reason: "Persistent dry cough & lab panel review",
    paymentStatus: "Paid (M-Pesa)",
    status: "Confirmed",
  },
  {
    id: "APT-802",
    patientName: "Samuel Mwangi",
    patientId: "PAT-384",
    doctorName: "Dr. Faith Kamau, MBChB, MMed",
    doctorId: "DOC-104",
    visitType: "In-Clinic Visit",
    dateTime: "25 Nov 2026, 10:30 AM",
    reason: "HbA1c quarterly review & Metformin refill",
    paymentStatus: "Paid (M-Pesa)",
    status: "Pending",
  },
  {
    id: "APT-803",
    patientName: "Brian Kiprop",
    patientId: "USR-512",
    doctorName: "Dr. Kevin Otieno, MBChB",
    doctorId: "DOC-109",
    visitType: "Teleconsultation",
    dateTime: "24 Nov 2026, 5:30 PM",
    reason: "Pediatric fever & hydration guidance",
    paymentStatus: "Pending Payment",
    status: "In Progress",
  },
  {
    id: "APT-804",
    patientName: "Mary Njeri",
    patientId: "PAT-612",
    doctorName: "Dr. Beatrice Mutua, BDS, MDS",
    doctorId: "DOC-112",
    visitType: "In-Clinic Visit",
    dateTime: "22 Nov 2026, 2:00 PM",
    reason: "Routine dental scaling & checkup",
    paymentStatus: "Paid (Card)",
    status: "Completed",
  },
  {
    id: "APT-805",
    patientName: "Amina Hassan",
    patientId: "PAT-519",
    doctorName: "Dr. Yusuf Abdullahi, MBChB",
    doctorId: "DOC-098",
    visitType: "Urgent Triage",
    dateTime: "24 Nov 2026, 7:15 PM",
    reason: "Acute antibiotic skin reaction — needs clinician reassignment",
    paymentStatus: "Paid (M-Pesa)",
    status: "Cancelled",
  },
];

const INITIAL_ESCALATIONS = [
  {
    id: "ESC-302",
    category: "Urgent Triage SLA",
    subject: "Unassigned urgent dermatology request > 20 mins",
    patient: "Amina Hassan (#PT-519)",
    priority: "High",
    status: "Open",
    createdAt: "12 mins ago",
  },
  {
    id: "ESC-303",
    category: "Pharmacy Dispatch",
    subject: "Prescription verification hold on controlled refill",
    patient: "Samuel Mwangi (#PT-384)",
    priority: "Medium",
    status: "Open",
    createdAt: "38 mins ago",
  },
  {
    id: "ESC-304",
    category: "Billing & M-Pesa",
    subject: "Duplicate STK push webhook reconciliation",
    patient: "Grace Wanjiku (#PT-612)",
    priority: "Low",
    status: "Resolved",
    createdAt: "2 hrs ago",
  },
];

const INITIAL_AUDIT_LOGS = [
  {
    id: "AUD-701",
    time: "4:45 PM",
    actor: "Admin (Francis K.)",
    action: "Approved clinician onboarding",
    target: "Dr. Faith Kamau (KMPDC-MED-8492)",
    scope: "Credentialing",
  },
  {
    id: "AUD-702",
    time: "3:20 PM",
    actor: "System Watchdog",
    action: "API health check passed",
    target: "/api/users & /api/doctors endpoints (99.98% uptime)",
    scope: "Platform Health",
  },
  {
    id: "AUD-703",
    time: "1:55 PM",
    actor: "Admin (Francis K.)",
    action: "Resolved payment reconciliation",
    target: "ESC-304 — M-Pesa Ref #SK94PL20Q",
    scope: "Finance & Billing",
  },
];

const DOCTOR_STATUS_STYLES = {
  Verified: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Pending Verification": "bg-amber-50 text-amber-800 border-amber-200",
  Suspended: "bg-rose-50 text-rose-700 border-rose-200",
};

const USER_STATUS_STYLES = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Inactive: "bg-amber-50 text-amber-800 border-amber-200",
  Suspended: "bg-rose-50 text-rose-700 border-rose-200",
};

const APPOINTMENT_STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-800 border-amber-200",
  Confirmed: "bg-teal-50 text-teal-800 border-teal-200",
  "In Progress": "bg-sky-50 text-sky-800 border-sky-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

const PRIORITY_STYLES = {
  High: "bg-rose-50 text-rose-700 border-rose-200",
  Medium: "bg-amber-50 text-amber-800 border-amber-200",
  Low: "bg-teal-50 text-teal-800 border-teal-200",
};

const EMPTY_PATIENT_FORM = {
  fullName: "",
  email: "",
  phone: "",
  role: "Patient",
  accountStatus: "Active",
  bloodGroup: "O+",
  allergies: "",
  lastVisit: "Added manually today",
};

const EMPTY_DOCTOR_FORM = {
  name: "",
  specialty: "",
  licenseNo: "",
  clinic: "tend Care Hub • Nairobi",
  status: "Pending Verification",
  activeConsults: 0,
};

const EMPTY_APPOINTMENT_FORM = {
  patientName: "",
  patientId: "PAT-NEW",
  doctorName: "Dr. Faith Kamau, MBChB, MMed",
  doctorId: "DOC-104",
  visitType: "Teleconsultation",
  dateTime: "25 Nov 2026, 11:00 AM",
  reason: "",
  paymentStatus: "Paid (M-Pesa)",
  status: "Confirmed",
};

function TendAdminBrand() {
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
        <span className="ml-2 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-800">
          Admin Console
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("appointments"); // "appointments" | "users" | "doctors"
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [usersPatients, setUsersPatients] = useState(INITIAL_USERS_PATIENTS);
  const [escalations, setEscalations] = useState(INITIAL_ESCALATIONS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Filters & search
  const [appointmentFilter, setAppointmentFilter] = useState("All");
  const [doctorFilter, setDoctorFilter] = useState("All");
  const [userRoleFilter, setUserRoleFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Manual Add & Edit State for Appointments
  const [showAddAppointmentForm, setShowAddAppointmentForm] = useState(false);
  const [newAppointmentForm, setNewAppointmentForm] = useState(
    EMPTY_APPOINTMENT_FORM
  );
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [editAppointmentForm, setEditAppointmentForm] = useState(
    EMPTY_APPOINTMENT_FORM
  );

  // Manual Add & Edit State for Users/Patients
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUserForm, setNewUserForm] = useState(EMPTY_PATIENT_FORM);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState(EMPTY_PATIENT_FORM);

  // Manual Add & Edit State for Doctors
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const [newDoctorForm, setNewDoctorForm] = useState(EMPTY_DOCTOR_FORM);
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [editDoctorForm, setEditDoctorForm] = useState(EMPTY_DOCTOR_FORM);

  // local imports Context 
  const {token,setToken,backendUrl,navigate} = useContext(AdminContext)


  // handle logout of uset
  
  const log_out =()=>{
    localStorage.removeItem('token');
    setToken('');
    navigate('/')

  }


  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesStatus =
        appointmentFilter === "All" || apt.status === appointmentFilter;
      const q = searchTerm.trim().toLowerCase();
      const matchesQuery =
        !q ||
        apt.id.toLowerCase().includes(q) ||
        apt.patientName.toLowerCase().includes(q) ||
        apt.doctorName.toLowerCase().includes(q) ||
        apt.reason.toLowerCase().includes(q) ||
        apt.visitType.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [appointments, appointmentFilter, searchTerm]);

  const filteredUsers = useMemo(() => {
    return usersPatients.filter((person) => {
      const matchesRole =
        userRoleFilter === "All" || person.role === userRoleFilter;
      const q = searchTerm.trim().toLowerCase();
      const matchesQuery =
        !q ||
        person.fullName.toLowerCase().includes(q) ||
        person.email.toLowerCase().includes(q) ||
        person.phone.toLowerCase().includes(q) ||
        person.id.toLowerCase().includes(q);
      return matchesRole && matchesQuery;
    });
  }, [usersPatients, userRoleFilter, searchTerm]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesStatus =
        doctorFilter === "All" || doc.status === doctorFilter;
      const q = searchTerm.trim().toLowerCase();
      const matchesQuery =
        !q ||
        doc.name.toLowerCase().includes(q) ||
        doc.specialty.toLowerCase().includes(q) ||
        doc.licenseNo.toLowerCase().includes(q) ||
        doc.id.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [doctors, doctorFilter, searchTerm]);

  const summary = useMemo(() => {
    const activeAppointments = appointments.filter(
      (a) =>
        a.status === "Pending" ||
        a.status === "Confirmed" ||
        a.status === "In Progress"
    ).length;
    const totalUsersPatients = usersPatients.length;
    const verifiedDoctors = doctors.filter(
      (d) => d.status === "Verified"
    ).length;
    const openEscalations = escalations.filter(
      (e) => e.status === "Open"
    ).length;
    return {
      activeAppointments,
      totalUsersPatients,
      verifiedDoctors,
      openEscalations,
    };
  }, [appointments, usersPatients, doctors, escalations]);

  function pushAudit(action, target, scope) {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setAuditLogs((prev) => [
      {
        id: `AUD-${Date.now().toString().slice(-3)}`,
        time,
        actor: "Admin (Francis K.)",
        action,
        target,
        scope,
      },
      ...prev,
    ]);
  }

  // --- Appointment Handlers ---
  function handleCreateAppointment(e) {
    e.preventDefault();
    if (!newAppointmentForm.patientName.trim()) return;

    const matchedPatient = usersPatients.find(
      (u) =>
        u.fullName.toLowerCase() ===
        newAppointmentForm.patientName.trim().toLowerCase()
    );
    const matchedDoctor = doctors.find(
      (d) => d.name === newAppointmentForm.doctorName
    );

    const created = {
      ...newAppointmentForm,
      id: `APT-${Math.floor(810 + Math.random() * 189)}`,
      patientId: matchedPatient ? matchedPatient.id : "PAT-MAN",
      doctorId: matchedDoctor ? matchedDoctor.id : "DOC-104",
      reason: newAppointmentForm.reason.trim() || "General consultation",
    };

    setAppointments((prev) => [created, ...prev]);
    pushAudit(
      `Scheduled appointment ${created.id}`,
      `${created.patientName} with ${created.doctorName} (${created.dateTime})`,
      "Appointments"
    );
    setNewAppointmentForm(EMPTY_APPOINTMENT_FORM);
    setShowAddAppointmentForm(false);
  }

  function startEditingAppointment(apt) {
    setEditingAppointmentId(apt.id);
    setEditAppointmentForm({
      patientName: apt.patientName,
      patientId: apt.patientId,
      doctorName: apt.doctorName,
      doctorId: apt.doctorId,
      visitType: apt.visitType,
      dateTime: apt.dateTime,
      reason: apt.reason,
      paymentStatus: apt.paymentStatus,
      status: apt.status,
    });
  }

  function handleSaveAppointmentEdit(id) {
    if (!editAppointmentForm.patientName.trim()) return;

    const matchedDoctor = doctors.find(
      (d) => d.name === editAppointmentForm.doctorName
    );

    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              ...editAppointmentForm,
              doctorId: matchedDoctor ? matchedDoctor.id : apt.doctorId,
            }
          : apt
      )
    );
    pushAudit(
      `Updated appointment ${id}`,
      `${editAppointmentForm.patientName} → ${editAppointmentForm.status} (${editAppointmentForm.dateTime})`,
      "Appointments"
    );
    setEditingAppointmentId(null);
  }

  function quickUpdateAppointmentStatus(id, nextStatus) {
    const target = appointments.find((a) => a.id === id);
    if (!target) return;

    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: nextStatus } : apt))
    );
    pushAudit(
      `Marked appointment ${id} as ${nextStatus}`,
      `${target.patientName} • ${target.doctorName}`,
      "Appointments"
    );
  }

  // --- User / Patient Handlers ---
  function handleCreateUserPatient(e) {
    e.preventDefault();
    if (!newUserForm.fullName.trim() || !newUserForm.email.trim()) return;

    const prefix = newUserForm.role === "Patient" ? "PAT" : "USR";
    const created = {
      ...newUserForm,
      id: `${prefix}-${Math.floor(700 + Math.random() * 299)}`,
      allergies: newUserForm.allergies.trim() || "None known",
      lastVisit: "Just registered by admin",
    };

    setUsersPatients((prev) => [created, ...prev]);
    pushAudit(
      `Manually added ${created.role.toLowerCase()}`,
      `${created.fullName} (${created.id})`,
      "User & Patient Mgmt"
    );
    setNewUserForm(EMPTY_PATIENT_FORM);
    setShowAddUserForm(false);
  }

  function startEditingUser(person) {
    setEditingUserId(person.id);
    setEditUserForm({
      fullName: person.fullName,
      email: person.email,
      phone: person.phone,
      role: person.role,
      accountStatus: person.accountStatus,
      bloodGroup: person.bloodGroup,
      allergies: person.allergies,
      lastVisit: person.lastVisit,
    });
  }

  function handleSaveUserEdit(id) {
    if (!editUserForm.fullName.trim() || !editUserForm.email.trim()) return;

    setUsersPatients((prev) =>
      prev.map((person) =>
        person.id === id ? { ...person, ...editUserForm } : person
      )
    );
    pushAudit(
      `Edited ${editUserForm.role.toLowerCase()} record`,
      `${editUserForm.fullName} (${id}) • Status: ${editUserForm.accountStatus}`,
      "User & Patient Mgmt"
    );
    setEditingUserId(null);
  }

  // --- Doctor Handlers ---
  function handleCreateDoctor(e) {
    e.preventDefault();
    if (!newDoctorForm.name.trim() || !newDoctorForm.specialty.trim()) return;

    const created = {
      ...newDoctorForm,
      id: `DOC-${Math.floor(120 + Math.random() * 800)}`,
      licenseNo:
        newDoctorForm.licenseNo.trim() ||
        `KMPDC-MED-${Math.floor(1000 + Math.random() * 8999)}`,
      activeConsults: Number(newDoctorForm.activeConsults) || 0,
      joinedAt: "24 Nov 2026",
    };

    setDoctors((prev) => [created, ...prev]);
    pushAudit(
      "Manually added clinician profile",
      `${created.name} (${created.licenseNo})`,
      "Clinician Mgmt"
    );
    setNewDoctorForm(EMPTY_DOCTOR_FORM);
    setShowAddDoctorForm(false);
  }

  function startEditingDoctor(doc) {
    setEditingDoctorId(doc.id);
    setEditDoctorForm({
      name: doc.name,
      specialty: doc.specialty,
      licenseNo: doc.licenseNo,
      clinic: doc.clinic,
      status: doc.status,
      activeConsults: doc.activeConsults,
    });
  }

  function handleSaveDoctorEdit(id) {
    if (!editDoctorForm.name.trim() || !editDoctorForm.specialty.trim()) return;

    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              ...editDoctorForm,
              activeConsults:
                editDoctorForm.status === "Verified"
                  ? Number(editDoctorForm.activeConsults) || 0
                  : 0,
            }
          : doc
      )
    );
    pushAudit(
      "Updated clinician profile",
      `${editDoctorForm.name} (${id}) • ${editDoctorForm.status}`,
      "Clinician Mgmt"
    );
    setEditingDoctorId(null);
  }

  function resolveEscalation(id) {
    const targetEsc = escalations.find((e) => e.id === id);
    if (!targetEsc) return;

    setEscalations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Resolved" } : item
      )
    );

    pushAudit(
      `Resolved escalation ${targetEsc.id}`,
      `${targetEsc.category} — ${targetEsc.patient}`,
      "Operations"
    );
  }

  function handleMaintenanceToggle() {
    const next = !maintenanceMode;
    setMaintenanceMode(next);
    pushAudit(
      next
        ? "Enabled booking intake freeze"
        : "Restored normal platform booking intake",
      "Global tend Patient & Clinician Routing",
      "System Control"
    );
  }



  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <TendAdminBrand />

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              API & MongoDB Atlas Healthy
            </span>

            <button
              type="button"
              onClick={handleMaintenanceToggle}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                maintenanceMode
                  ? "border-amber-300 bg-amber-100 text-amber-900 hover:bg-amber-200"
                  : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {maintenanceMode
                ? "Intake Frozen (Resume)"
                : "Pause New Bookings"}
            </button>
            <button className="btn btn-info px-2 py-1 rounded-full" onClick={log_out}>
                logout
            </button>


          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* Executive Overview Banner */}
        <section className="rounded-2xl border border-teal-100 bg-gradient-to-r from-slate-900 via-teal-950 to-teal-900 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                Platform Operations & Clinical Governance
              </p>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                tend Network Control Center
              </h1>
              <p className="mt-1 text-sm text-teal-100/90">
                Monitor and manage all appointments, add or edit patients,
                users, and doctors, and resolve escalations from one console.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-white/10 px-4 py-3">
                <p className="text-xs text-teal-200">Active Appointments</p>
                <p className="mt-0.5 text-2xl font-bold text-teal-200">
                  {summary.activeAppointments}
                </p>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3">
                <p className="text-xs text-teal-200">Users & Patients</p>
                <p className="mt-0.5 text-2xl font-bold">
                  {summary.totalUsersPatients}
                </p>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3">
                <p className="text-xs text-teal-200">Verified Doctors</p>
                <p className="mt-0.5 text-2xl font-bold text-emerald-300">
                  {summary.verifiedDoctors}
                </p>
              </div>
              <div className="rounded-xl bg-white/10 px-4 py-3">
                <p className="text-xs text-teal-200">Open Escalations</p>
                <p className="mt-0.5 text-2xl font-bold text-rose-300">
                  {summary.openEscalations}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Grid: Appointments, Users/Patients & Doctors + Escalations & Audit */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 7 Cols: Appointments, Users/Patients & Doctors Management */}
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:col-span-7">
            {/* Top Directory Switcher & Search */}
            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center">
              <div className="inline-flex flex-wrap rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("appointments")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    activeTab === "appointments"
                      ? "bg-teal-700 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Appointments ({appointments.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("users")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    activeTab === "users"
                      ? "bg-teal-700 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Users & Patients ({usersPatients.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("doctors")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    activeTab === "doctors"
                      ? "bg-teal-700 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Doctors ({doctors.length})
                </button>
              </div>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  activeTab === "appointments"
                    ? "Search booking ID, patient, doctor..."
                    : activeTab === "users"
                    ? "Search user, patient, email, ID..."
                    : "Search doctor, specialty, license..."
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none sm:w-56"
              />
            </div>

            {/* TAB 1: ALL APPOINTMENTS */}
            {activeTab === "appointments" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "All",
                      "Pending",
                      "Confirmed",
                      "In Progress",
                      "Completed",
                      "Cancelled",
                    ].map((statusTab) => (
                      <button
                        key={statusTab}
                        type="button"
                        onClick={() => setAppointmentFilter(statusTab)}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                          appointmentFilter === statusTab
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {statusTab}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddAppointmentForm((prev) => !prev)}
                    className="rounded-xl bg-teal-700 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
                  >
                    {showAddAppointmentForm
                      ? "Close Form"
                      : "+ Schedule Appointment"}
                  </button>
                </div>

                {/* Manual Schedule Appointment Form */}
                {showAddAppointmentForm && (
                  <form
                    onSubmit={handleCreateAppointment}
                    className="space-y-3 rounded-xl border border-teal-200 bg-teal-50/40 p-4"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-wide text-teal-900">
                      Manually Schedule New Appointment
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Patient Name *
                        </label>
                        <input
                          type="text"
                          required
                          list="admin-patient-suggestions"
                          value={newAppointmentForm.patientName}
                          onChange={(e) =>
                            setNewAppointmentForm({
                              ...newAppointmentForm,
                              patientName: e.target.value,
                            })
                          }
                          placeholder="Select or enter patient name"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                        <datalist id="admin-patient-suggestions">
                          {usersPatients.map((p) => (
                            <option key={p.id} value={p.fullName} />
                          ))}
                        </datalist>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Assigned Doctor
                        </label>
                        <select
                          value={newAppointmentForm.doctorName}
                          onChange={(e) =>
                            setNewAppointmentForm({
                              ...newAppointmentForm,
                              doctorName: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        >
                          {doctors.map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name} ({d.specialty})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Visit Type
                        </label>
                        <select
                          value={newAppointmentForm.visitType}
                          onChange={(e) =>
                            setNewAppointmentForm({
                              ...newAppointmentForm,
                              visitType: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        >
                          <option value="Teleconsultation">
                            Teleconsultation
                          </option>
                          <option value="In-Clinic Visit">
                            In-Clinic Visit
                          </option>
                          <option value="Urgent Triage">Urgent Triage</option>
                          <option value="Follow-up Review">
                            Follow-up Review
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Date & Time Slot
                        </label>
                        <input
                          type="text"
                          value={newAppointmentForm.dateTime}
                          onChange={(e) =>
                            setNewAppointmentForm({
                              ...newAppointmentForm,
                              dateTime: e.target.value,
                            })
                          }
                          placeholder="25 Nov 2026, 11:00 AM"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Payment Status
                        </label>
                        <select
                          value={newAppointmentForm.paymentStatus}
                          onChange={(e) =>
                            setNewAppointmentForm({
                              ...newAppointmentForm,
                              paymentStatus: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        >
                          <option value="Paid (M-Pesa)">Paid (M-Pesa)</option>
                          <option value="Paid (Card)">Paid (Card)</option>
                          <option value="Pending Payment">
                            Pending Payment
                          </option>
                          <option value="Waived / Insurance">
                            Waived / Insurance
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Initial Status
                        </label>
                        <select
                          value={newAppointmentForm.status}
                          onChange={(e) =>
                            setNewAppointmentForm({
                              ...newAppointmentForm,
                              status: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Reason / Clinical Notes
                        </label>
                        <input
                          type="text"
                          value={newAppointmentForm.reason}
                          onChange={(e) =>
                            setNewAppointmentForm({
                              ...newAppointmentForm,
                              reason: e.target.value,
                            })
                          }
                          placeholder="e.g. Post-lab follow-up & prescription review"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddAppointmentForm(false)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-teal-700 px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-800"
                      >
                        Create Booking
                      </button>
                    </div>
                  </form>
                )}

                {/* All Appointments List */}
                <div className="space-y-3">
                  {filteredAppointments.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
                      No appointments match your current filter.
                    </div>
                  ) : (
                    filteredAppointments.map((apt) => {
                      const isEditingApt = editingAppointmentId === apt.id;

                      return (
                        <div
                          key={apt.id}
                          className="rounded-xl border border-slate-200 p-4 transition hover:border-teal-300"
                        >
                          {isEditingApt ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-teal-700">
                                  Editing Appointment {apt.id}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  {apt.patientId}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                <input
                                  type="text"
                                  value={editAppointmentForm.patientName}
                                  onChange={(e) =>
                                    setEditAppointmentForm({
                                      ...editAppointmentForm,
                                      patientName: e.target.value,
                                    })
                                  }
                                  placeholder="Patient name"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                                <select
                                  value={editAppointmentForm.doctorName}
                                  onChange={(e) =>
                                    setEditAppointmentForm({
                                      ...editAppointmentForm,
                                      doctorName: e.target.value,
                                    })
                                  }
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                >
                                  {doctors.map((d) => (
                                    <option key={d.id} value={d.name}>
                                      {d.name}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  type="text"
                                  value={editAppointmentForm.dateTime}
                                  onChange={(e) =>
                                    setEditAppointmentForm({
                                      ...editAppointmentForm,
                                      dateTime: e.target.value,
                                    })
                                  }
                                  placeholder="Date & Time"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                                <select
                                  value={editAppointmentForm.visitType}
                                  onChange={(e) =>
                                    setEditAppointmentForm({
                                      ...editAppointmentForm,
                                      visitType: e.target.value,
                                    })
                                  }
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                >
                                  <option value="Teleconsultation">
                                    Teleconsultation
                                  </option>
                                  <option value="In-Clinic Visit">
                                    In-Clinic Visit
                                  </option>
                                  <option value="Urgent Triage">
                                    Urgent Triage
                                  </option>
                                  <option value="Follow-up Review">
                                    Follow-up Review
                                  </option>
                                </select>
                                <select
                                  value={editAppointmentForm.status}
                                  onChange={(e) =>
                                    setEditAppointmentForm({
                                      ...editAppointmentForm,
                                      status: e.target.value,
                                    })
                                  }
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="In Progress">
                                    In Progress
                                  </option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                                <input
                                  type="text"
                                  value={editAppointmentForm.paymentStatus}
                                  onChange={(e) =>
                                    setEditAppointmentForm({
                                      ...editAppointmentForm,
                                      paymentStatus: e.target.value,
                                    })
                                  }
                                  placeholder="Payment status"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                                <input
                                  type="text"
                                  value={editAppointmentForm.reason}
                                  onChange={(e) =>
                                    setEditAppointmentForm({
                                      ...editAppointmentForm,
                                      reason: e.target.value,
                                    })
                                  }
                                  placeholder="Reason / Notes"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs sm:col-span-2"
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingAppointmentId(null)}
                                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSaveAppointmentEdit(apt.id)
                                  }
                                  className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-800"
                                >
                                  Save Appointment
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-semibold text-teal-700">
                                      {apt.id}
                                    </span>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                      {apt.patientName}
                                    </h3>
                                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                                      {apt.visitType}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-xs text-slate-700">
                                    Clinician:{" "}
                                    <strong className="font-semibold text-slate-900">
                                      {apt.doctorName}
                                    </strong>
                                  </p>
                                  <p className="mt-0.5 text-xs text-slate-600">
                                    {apt.reason}
                                  </p>
                                </div>

                                <span
                                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                                    APPOINTMENT_STATUS_STYLES[apt.status]
                                  }`}
                                >
                                  {apt.status}
                                </span>
                              </div>

                              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
                                <span className="text-xs text-slate-500">
                                  <strong className="text-slate-700">
                                    {apt.dateTime}
                                  </strong>{" "}
                                  • {apt.paymentStatus}
                                </span>

                                <div className="flex flex-wrap items-center gap-1.5">
                                  {apt.status === "Pending" && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        quickUpdateAppointmentStatus(
                                          apt.id,
                                          "Confirmed"
                                        )
                                      }
                                      className="rounded-lg bg-teal-700 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-teal-800"
                                    >
                                      Confirm
                                    </button>
                                  )}
                                  {apt.status !== "Completed" &&
                                    apt.status !== "Cancelled" && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          quickUpdateAppointmentStatus(
                                            apt.id,
                                            "Completed"
                                          )
                                        }
                                        className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100"
                                      >
                                        Complete
                                      </button>
                                    )}
                                  {apt.status !== "Cancelled" &&
                                    apt.status !== "Completed" && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          quickUpdateAppointmentStatus(
                                            apt.id,
                                            "Cancelled"
                                          )
                                        }
                                        className="rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-700 hover:bg-rose-100"
                                      >
                                        Cancel
                                      </button>
                                    )}
                                  <button
                                    type="button"
                                    onClick={() => startEditingAppointment(apt)}
                                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-800 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
                                  >
                                    Edit / Reassign
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: USERS & PATIENTS */}
            {activeTab === "users" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {["All", "Patient", "User"].map((roleTab) => (
                      <button
                        key={roleTab}
                        type="button"
                        onClick={() => setUserRoleFilter(roleTab)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          userRoleFilter === roleTab
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {roleTab === "All" ? "All Accounts" : `${roleTab}s`}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddUserForm((prev) => !prev)}
                    className="rounded-xl bg-teal-700 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
                  >
                    {showAddUserForm ? "Close Form" : "+ Add User / Patient"}
                  </button>
                </div>

                {/* Manual Add User / Patient Form */}
                {showAddUserForm && (
                  <form
                    onSubmit={handleCreateUserPatient}
                    className="space-y-3 rounded-xl border border-teal-200 bg-teal-50/40 p-4"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-wide text-teal-900">
                      Manually Add User or Patient
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newUserForm.fullName}
                          onChange={(e) =>
                            setNewUserForm({
                              ...newUserForm,
                              fullName: e.target.value,
                            })
                          }
                          placeholder="e.g. Daniel Mutua"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={newUserForm.email}
                          onChange={(e) =>
                            setNewUserForm({
                              ...newUserForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="daniel.mutua@example.com"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={newUserForm.phone}
                          onChange={(e) =>
                            setNewUserForm({
                              ...newUserForm,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+254 712 000 111"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Account Type
                        </label>
                        <select
                          value={newUserForm.role}
                          onChange={(e) =>
                            setNewUserForm({
                              ...newUserForm,
                              role: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        >
                          <option value="Patient">Patient</option>
                          <option value="User">User</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Blood Group
                        </label>
                        <input
                          type="text"
                          value={newUserForm.bloodGroup}
                          onChange={(e) =>
                            setNewUserForm({
                              ...newUserForm,
                              bloodGroup: e.target.value,
                            })
                          }
                          placeholder="O+, A-, B+..."
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Known Allergies
                        </label>
                        <input
                          type="text"
                          value={newUserForm.allergies}
                          onChange={(e) =>
                            setNewUserForm({
                              ...newUserForm,
                              allergies: e.target.value,
                            })
                          }
                          placeholder="None known"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddUserForm(false)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-teal-700 px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-800"
                      >
                        Save Record
                      </button>
                    </div>
                  </form>
                )}

                {/* Users & Patients List */}
                <div className="space-y-3">
                  {filteredUsers.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
                      No users or patients match your filter.
                    </div>
                  ) : (
                    filteredUsers.map((person) => {
                      const isEditing = editingUserId === person.id;

                      return (
                        <div
                          key={person.id}
                          className="rounded-xl border border-slate-200 p-4 transition hover:border-teal-300"
                        >
                          {isEditing ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-teal-700">
                                  Editing {person.id}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  {person.lastVisit}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                <input
                                  type="text"
                                  value={editUserForm.fullName}
                                  onChange={(e) =>
                                    setEditUserForm({
                                      ...editUserForm,
                                      fullName: e.target.value,
                                    })
                                  }
                                  placeholder="Full name"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                                <input
                                  type="email"
                                  value={editUserForm.email}
                                  onChange={(e) =>
                                    setEditUserForm({
                                      ...editUserForm,
                                      email: e.target.value,
                                    })
                                  }
                                  placeholder="Email"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                                <input
                                  type="text"
                                  value={editUserForm.phone}
                                  onChange={(e) =>
                                    setEditUserForm({
                                      ...editUserForm,
                                      phone: e.target.value,
                                    })
                                  }
                                  placeholder="Phone"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                                <select
                                  value={editUserForm.role}
                                  onChange={(e) =>
                                    setEditUserForm({
                                      ...editUserForm,
                                      role: e.target.value,
                                    })
                                  }
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                >
                                  <option value="Patient">Patient</option>
                                  <option value="User">User</option>
                                </select>
                                <input
                                  type="text"
                                  value={editUserForm.bloodGroup}
                                  onChange={(e) =>
                                    setEditUserForm({
                                      ...editUserForm,
                                      bloodGroup: e.target.value,
                                    })
                                  }
                                  placeholder="Blood group"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                                <select
                                  value={editUserForm.accountStatus}
                                  onChange={(e) =>
                                    setEditUserForm({
                                      ...editUserForm,
                                      accountStatus: e.target.value,
                                    })
                                  }
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                  <option value="Suspended">Suspended</option>
                                </select>
                                <input
                                  type="text"
                                  value={editUserForm.allergies}
                                  onChange={(e) =>
                                    setEditUserForm({
                                      ...editUserForm,
                                      allergies: e.target.value,
                                    })
                                  }
                                  placeholder="Allergies"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs sm:col-span-2"
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingUserId(null)}
                                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSaveUserEdit(person.id)}
                                  className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-800"
                                >
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-semibold text-teal-700">
                                      {person.id}
                                    </span>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                      {person.fullName}
                                    </h3>
                                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                                      {person.role}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-xs text-slate-600">
                                    {person.email} • {person.phone || "No phone"}
                                  </p>
                                  <p className="mt-0.5 text-xs text-slate-500">
                                    Blood:{" "}
                                    <strong className="text-slate-700">
                                      {person.bloodGroup}
                                    </strong>{" "}
                                    • Allergies:{" "}
                                    <strong className="text-slate-700">
                                      {person.allergies}
                                    </strong>
                                  </p>
                                </div>

                                <span
                                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                                    USER_STATUS_STYLES[person.accountStatus]
                                  }`}
                                >
                                  {person.accountStatus}
                                </span>
                              </div>

                              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
                                <span className="text-xs text-slate-500">
                                  Activity: {person.lastVisit}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => startEditingUser(person)}
                                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
                                >
                                  Edit Profile
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: DOCTORS (ADD, EDIT & VERIFY) */}
            {activeTab === "doctors" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "All",
                      "Pending Verification",
                      "Verified",
                      "Suspended",
                    ].map((statusTab) => (
                      <button
                        key={statusTab}
                        type="button"
                        onClick={() => setDoctorFilter(statusTab)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          doctorFilter === statusTab
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {statusTab}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddDoctorForm((prev) => !prev)}
                    className="rounded-xl bg-teal-700 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
                  >
                    {showAddDoctorForm ? "Close Form" : "+ Add Doctor"}
                  </button>
                </div>

                {/* Manual Add Doctor Form */}
                {showAddDoctorForm && (
                  <form
                    onSubmit={handleCreateDoctor}
                    className="space-y-3 rounded-xl border border-teal-200 bg-teal-50/40 p-4"
                  >
                    <h3 className="text-xs font-bold uppercase tracking-wide text-teal-900">
                      Manually Add Doctor / Clinician
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Doctor Name & Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newDoctorForm.name}
                          onChange={(e) =>
                            setNewDoctorForm({
                              ...newDoctorForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="e.g. Dr. Grace Nyambura, MBChB"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Specialty *
                        </label>
                        <input
                          type="text"
                          required
                          value={newDoctorForm.specialty}
                          onChange={(e) =>
                            setNewDoctorForm({
                              ...newDoctorForm,
                              specialty: e.target.value,
                            })
                          }
                          placeholder="e.g. Family Medicine"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          License Number
                        </label>
                        <input
                          type="text"
                          value={newDoctorForm.licenseNo}
                          onChange={(e) =>
                            setNewDoctorForm({
                              ...newDoctorForm,
                              licenseNo: e.target.value,
                            })
                          }
                          placeholder="KMPDC-MED-9510"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Clinic / Hub
                        </label>
                        <input
                          type="text"
                          value={newDoctorForm.clinic}
                          onChange={(e) =>
                            setNewDoctorForm({
                              ...newDoctorForm,
                              clinic: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-700">
                          Initial Status
                        </label>
                        <select
                          value={newDoctorForm.status}
                          onChange={(e) =>
                            setNewDoctorForm({
                              ...newDoctorForm,
                              status: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-teal-600 focus:outline-none"
                        >
                          <option value="Pending Verification">
                            Pending Verification
                          </option>
                          <option value="Verified">Verified</option>
                          <option value="Suspended">Suspended</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddDoctorForm(false)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-teal-700 px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-800"
                      >
                        Add Doctor
                      </button>
                    </div>
                  </form>
                )}

                {/* Doctors List */}
                <div className="space-y-3">
                  {filteredDoctors.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
                      No doctors match the selected filter.
                    </div>
                  ) : (
                    filteredDoctors.map((doc) => {
                      const isEditingDoc = editingDoctorId === doc.id;

                      return (
                        <div
                          key={doc.id}
                          className="rounded-xl border border-slate-200 p-4 transition hover:border-teal-300"
                        >
                          {isEditingDoc ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-teal-700">
                                  Editing Clinician {doc.id}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  Joined {doc.joinedAt}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                                <input
                                  type="text"
                                  value={editDoctorForm.name}
                                  onChange={(e) =>
                                    setEditDoctorForm({
                                      ...editDoctorForm,
                                      name: e.target.value,
                                    })
                                  }
                                  placeholder="Doctor name"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                                <input
                                  type="text"
                                  value={editDoctorForm.specialty}
                                  onChange={(e) =>
                                    setEditDoctorForm({
                                      ...editDoctorForm,
                                      specialty: e.target.value,
                                    })
                                  }
                                  placeholder="Specialty"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                                <input
                                  type="text"
                                  value={editDoctorForm.licenseNo}
                                  onChange={(e) =>
                                    setEditDoctorForm({
                                      ...editDoctorForm,
                                      licenseNo: e.target.value,
                                    })
                                  }
                                  placeholder="License number"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                                <input
                                  type="text"
                                  value={editDoctorForm.clinic}
                                  onChange={(e) =>
                                    setEditDoctorForm({
                                      ...editDoctorForm,
                                      clinic: e.target.value,
                                    })
                                  }
                                  placeholder="Clinic"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                                <select
                                  value={editDoctorForm.status}
                                  onChange={(e) =>
                                    setEditDoctorForm({
                                      ...editDoctorForm,
                                      status: e.target.value,
                                    })
                                  }
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                >
                                  <option value="Pending Verification">
                                    Pending Verification
                                  </option>
                                  <option value="Verified">Verified</option>
                                  <option value="Suspended">Suspended</option>
                                </select>
                                <input
                                  type="number"
                                  min="0"
                                  value={editDoctorForm.activeConsults}
                                  onChange={(e) =>
                                    setEditDoctorForm({
                                      ...editDoctorForm,
                                      activeConsults: e.target.value,
                                    })
                                  }
                                  placeholder="Active consults"
                                  className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs"
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingDoctorId(null)}
                                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSaveDoctorEdit(doc.id)}
                                  className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-800"
                                >
                                  Save Doctor
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-semibold text-teal-700">
                                      {doc.id}
                                    </span>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                      {doc.name}
                                    </h3>
                                  </div>
                                  <p className="mt-1 text-xs text-slate-600">
                                    {doc.specialty} •{" "}
                                    <span className="font-mono font-medium text-slate-800">
                                      {doc.licenseNo}
                                    </span>
                                  </p>
                                  <p className="mt-0.5 text-xs text-slate-500">
                                    {doc.clinic} • Joined {doc.joinedAt}
                                  </p>
                                </div>

                                <span
                                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                                    DOCTOR_STATUS_STYLES[doc.status]
                                  }`}
                                >
                                  {doc.status}
                                </span>
                              </div>

                              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                                <span className="text-xs text-slate-500">
                                  Active consultations:{" "}
                                  <strong className="text-slate-800">
                                    {doc.activeConsults}
                                  </strong>
                                </span>

                                <button
                                  type="button"
                                  onClick={() => startEditingDoctor(doc)}
                                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
                                >
                                  Edit Doctor
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Right 5 Cols: Escalation Queue + Admin Audit Trail */}
          <div className="space-y-6 lg:col-span-5">
            {/* Operational Escalations */}
            <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Operations & SLA Escalations
                  </h2>
                  <p className="text-xs text-slate-500">
                    Unassigned triage alerts, pharmacy holds, and billing flags
                  </p>
                </div>
                <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
                  {summary.openEscalations} Open
                </span>
              </div>

              <div className="space-y-3">
                {escalations.map((esc) => (
                  <div
                    key={esc.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-teal-800">
                        {esc.id} • {esc.category}
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                          PRIORITY_STYLES[esc.priority]
                        }`}
                      >
                        {esc.priority}
                      </span>
                    </div>

                    <p className="mt-1 text-xs font-medium text-slate-900">
                      {esc.subject}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {esc.patient} • {esc.createdAt}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between">
                      <span
                        className={`text-[11px] font-semibold ${
                          esc.status === "Open"
                            ? "text-amber-700"
                            : "text-emerald-700"
                        }`}
                      >
                        Status: {esc.status}
                      </span>

                      {esc.status === "Open" && (
                        <button
                          type="button"
                          onClick={() => resolveEscalation(esc.id)}
                          className="rounded-lg bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-teal-800"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Immutable Admin Audit Feed */}
            <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Admin Governance Audit Log
                  </h2>
                  <p className="text-xs text-slate-500">
                    Recorded bookings, edits, credentialing, and system changes
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {auditLogs.length} events
                </span>
              </div>

              <ul className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <li key={log.id} className="py-3 first:pt-1 last:pb-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-900">
                        {log.action}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {log.time}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600">
                      {log.target}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between text-[10px]">
                      <span className="rounded bg-teal-50 px-2 py-0.5 font-medium text-teal-700">
                        {log.scope}
                      </span>
                      <span className="text-slate-400">{log.actor}</span>
                    </div>
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