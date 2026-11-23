import React, { useState,useContext,useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
const TendMark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 210" className="h-8 w-auto">
    <defs>
      <linearGradient id="tendMainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3898A8" />
        <stop offset="55%" stopColor="#5DB9AD" />
        <stop offset="100%" stopColor="#87D3BE" />
      </linearGradient>
      <linearGradient id="tendDarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2B7A8C" />
        <stop offset="100%" stopColor="#48A69E" />
      </linearGradient>
      <linearGradient id="tendWordGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2E7D90" />
        <stop offset="50%" stopColor="#4399A6" />
        <stop offset="100%" stopColor="#58B0B5" />
      </linearGradient>
    </defs>
    <g transform="translate(112, 105) scale(0.88)">
      <path
        d="M -88 -38 C -105 18, -80 88, 0 92 C 78 96, 114 38, 108 -18 C 106 -32, 92 -32, 90 -18 C 88 22, 54 62, 4 62 C -46 62, -76 22, -72 -32 C -70 -44, -84 -48, -88 -38 Z"
        fill="url(#tendMainGrad)"
      />
      <circle cx="99" cy="-42" r="10" fill="#63BEB1" />
      <circle cx="0" cy="44" r="17" fill="url(#tendDarkGrad)" />
      <circle cx="0" cy="44" r="7" fill="#FFFFFF" opacity="0.35" />
      <path d="M -6 28 L -6 48 L 6 48 L 6 28 Z" fill="url(#tendDarkGrad)" />
      <path
        d="M -46 -84 C -62 -35, -48 24, 0 26 C 48 24, 62 -35, 46 -84"
        fill="none"
        stroke="url(#tendMainGrad)"
        strokeWidth="15"
        strokeLinecap="round"
      />
      <circle cx="-46" cy="-88" r="12" fill="#2A7587" />
      <circle cx="46" cy="-88" r="12" fill="#2A7587" />
    </g>
    <text
      x="228"
      y="141"
      textAnchor="start"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="112"
      fontWeight="800"
      letterSpacing="-3"
      fill="url(#tendWordGrad)"
    >
      tend
    </text>
  </svg>
);

const PatientAvatarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" className="h-full w-full">
    <defs>
      <clipPath id="patAvatarClip">
        <circle cx="120" cy="120" r="106" />
      </clipPath>
      <linearGradient id="patSkin" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD4BA" />
        <stop offset="100%" stopColor="#F4B28E" />
      </linearGradient>
      <linearGradient id="patHair" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4B3838" />
        <stop offset="100%" stopColor="#2E2121" />
      </linearGradient>
    </defs>
    <g clipPath="url(#patAvatarClip)">
      <path
        d="M 60 112 C 52 98, 56 80, 68 72 C 68 54, 84 42, 102 44 C 114 34, 134 34, 146 46 C 164 46, 178 60, 176 78 C 186 88, 186 106, 176 116 C 178 130, 166 142, 152 140 L 88 140 C 74 142, 62 130, 60 112 Z"
        fill="url(#patHair)"
        stroke="#2A1D1D"
        strokeWidth="3.5"
      />
      <path
        d="M 54 232 C 62 198, 84 186, 120 186 C 156 186, 178 198, 186 232 Z"
        fill="#2B7A8C"
        stroke="#2A1D1D"
        strokeWidth="3.5"
      />
      <path
        d="M 103 152 L 103 190 C 103 200, 137 200, 137 190 L 137 152 Z"
        fill="url(#patSkin)"
        stroke="#2A1D1D"
        strokeWidth="3.5"
      />
      <path
        d="M 81 96 C 81 70, 159 70, 159 96 L 159 124 C 159 150, 138 166, 120 166 C 102 166, 81 150, 81 124 Z"
        fill="url(#patSkin)"
        stroke="#2A1D1D"
        strokeWidth="3.5"
      />
      <path
        d="M 80 104 C 78 82, 92 64, 114 66 C 122 58, 140 58, 148 68 C 160 72, 164 88, 160 104 C 154 90, 144 82, 132 82 C 124 88, 114 88, 108 80 C 96 80, 86 90, 80 104 Z"
        fill="url(#patHair)"
        stroke="#2A1D1D"
        strokeWidth="3.5"
      />
      <circle cx="101" cy="116" r="4.5" fill="#2A1D1D" />
      <circle cx="139" cy="116" r="4.5" fill="#2A1D1D" />
      <g fill="none" stroke="#2B3A42" strokeWidth="3.2">
        <circle cx="101" cy="116" r="14.5" />
        <circle cx="139" cy="116" r="14.5" />
        <path d="M 115.5 115 Q 120 112 124.5 115" />
      </g>
      <path d="M 107 140 Q 120 151 133 140 Z" fill="#FFFFFF" stroke="#2A1D1D" strokeWidth="2.8" />
    </g>
    <circle cx="120" cy="120" r="106" fill="none" stroke="#3898A8" strokeWidth="5" />
  </svg>
);

export default function Account() {
  const [statusMessage, setStatusMessage] = useState(
    'Ready for your upcoming cardiology video check-in.'
  );
  const [refillRequested, setRefillRequested] = useState({});
  const [rescheduledId, setRescheduledId] = useState(null);

  const actionTiles = [
    {
      id: 'book',
      title: 'Book Consultation',
      desc: 'Schedule an online video call or clinic visit',
      badge: 'Available Today',
      accent: 'bg-teal-600 text-white hover:bg-teal-700',
      onClick: () => setStatusMessage('Opening specialty & doctor booking flow...'),
    },
    {
      id: 'refill',
      title: 'Refill Prescription',
      desc: 'Request repeat medication & pharmacy pickup',
      badge: '1 Due',
      accent: 'bg-white text-slate-900 border border-slate-200 hover:border-teal-400',
      onClick: () => setStatusMessage('Prescription refill queue opened for active meds.'),
    },
    {
      id: 'labs',
      title: 'Lab & Scan Results',
      desc: 'View diagnostic reports & download PDFs',
      badge: '2 New',
      accent: 'bg-white text-slate-900 border border-slate-200 hover:border-teal-400',
      onClick: () => setStatusMessage('Showing latest blood work and diagnostic summaries.'),
    },
    {
      id: 'message',
      title: 'Message Care Team',
      desc: 'Send a follow-up note or symptom update',
      badge: 'Avg reply < 2h',
      accent: 'bg-white text-slate-900 border border-slate-200 hover:border-teal-400',
      onClick: () => setStatusMessage('Direct message thread ready with your care coordinator.'),
    },
  ];

  const upcomingVisits = [
    {
      id: 'v-101',
      doctor: 'Dr. Amara Patel',
      role: 'Cardiologist',
      mode: 'Video Consult',
      when: 'Tomorrow · 10:30 AM',
      canJoin: true,
    },
    {
      id: 'v-102',
      doctor: 'Dr. Samuel Kariuki',
      role: 'General Physician',
      mode: 'Clinic Appointment',
      when: 'Dec 04 · 02:00 PM',
      canJoin: false,
    },
  ];

  const medications = [
    {
      id: 'm-1',
      name: 'Lisinopril 10mg',
      schedule: 'Once daily · Morning',
      refills: 2,
    },
    {
      id: 'm-2',
      name: 'Vitamin D3 2000 IU',
      schedule: 'Once daily · With meal',
      refills: 0,
    },
  ];

  const toggleRefill = (medId, medName) => {
    setRefillRequested((prev) => {
      const nextState = !prev[medId];
      setStatusMessage(
        nextState
          ? `Refill requested for ${medName}.`
          : `Refill request cancelled for ${medName}.`
      );
      return { ...prev, [medId]: nextState };
    });
  };

  const {token,setToken,backendUrl} = useContext(ShopContext);
  const {user, setUser} = useState([]);

  



  const getUserData = async () => {
    try {
       const response =  await axios.get(backendUrl+'/api/users/profile',{headers:{
      authorization:`Bearer ${token}`
    }})

      if (!response.data.success) {
        throw new Error('Failed to fetch user data');
      }

      const user = await response.data.user;
      console.log('User Data:', user);
      setUser(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed please login or register');
    }
  };

  useEffect(() => {
    getUserData();
  }, [token]);
  

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <TendMark />
          <div className = "hover:underline hover:text-blue-600 cursor-pointer" onClick={()=>navigate('/')}>
            <span><i className="fas fa-home fill-green-950"></i></span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Patient Profile</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-7 sm:px-6">
        {/* Compact Patient Identity Header */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 rounded-full bg-teal-50 p-0.5 ring-2 ring-teal-500/20">
                <PatientAvatarIcon />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                   
                  </h1>
                  <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 border border-teal-200">
                    ID #TND-84920
                  </span>
                </div>
                <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
                  Blood Type: <strong className="text-slate-700">O+</strong> · Allergies:{' '}
                  <strong className="text-slate-700">Penicillin, Peanuts</strong> · Cover:{' '}
                  <strong className="text-slate-700">AAR Health Care</strong>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStatusMessage('Editing patient contact & emergency details.')}
              className="self-start sm:self-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Edit Details
            </button>
          </div>

          {/* Live Action Feedback Strip */}
          <div className="mt-4 flex items-center justify-between rounded-2xl bg-teal-50/70 px-4 py-2.5 text-xs text-teal-900 border border-teal-100">
            <span className="font-medium">{statusMessage}</span>
            <span className="hidden sm:inline font-semibold text-teal-700">Active Care Plan</span>
          </div>
        </section>

        {/* Primary Patient Action Grid */}
        <section aria-label="Patient Actions">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {actionTiles.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={tile.onClick}
                className={`group flex flex-col justify-between rounded-2xl p-4 text-left shadow-sm transition ${tile.accent}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-base font-bold leading-snug">{tile.title}</span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      tile.id === 'book'
                        ? 'bg-white/20 text-white'
                        : 'bg-teal-50 text-teal-700'
                    }`}
                  >
                    {tile.badge}
                  </span>
                </div>
                <p
                  className={`mt-2 text-xs leading-relaxed ${
                    tile.id === 'book' ? 'text-teal-50' : 'text-slate-500'
                  }`}
                >
                  {tile.desc}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Actionable Appointments & Medications */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Appointments Action Card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <h2 className="text-base font-bold text-slate-900">Manage Appointments</h2>
              <button
                type="button"
                onClick={() => setStatusMessage('New appointment slot picker opened.')}
                className="text-xs font-semibold text-teal-700 hover:underline"
              >
                + New Booking
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {upcomingVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{visit.doctor}</p>
                      <p className="text-xs text-slate-500">
                        {visit.role} · {visit.mode}
                      </p>
                    </div>
                    <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
                      {visit.when}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {visit.canJoin && (
                      <button
                        type="button"
                        onClick={() =>
                          setStatusMessage(`Joining video consultation room with ${visit.doctor}...`)
                        }
                        className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 transition"
                      >
                        Join Call
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setRescheduledId(visit.id);
                        setStatusMessage(`Reschedule options loaded for ${visit.doctor}.`);
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                    >
                      {rescheduledId === visit.id ? 'Reschedule Selected' : 'Reschedule'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Prescriptions Action Card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <h2 className="text-base font-bold text-slate-900">Prescription Actions</h2>
              <span className="text-xs font-medium text-slate-400">Pharmacy Delivery</span>
            </div>

            <div className="mt-4 space-y-3">
              {medications.map((med) => {
                const isRequested = !!refillRequested[med.id];
                return (
                  <div
                    key={med.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900">{med.name}</p>
                      <p className="text-xs text-slate-500">
                        {med.schedule} · {med.refills} refills left
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleRefill(med.id, med.name)}
                      className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        isRequested
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
                      }`}
                    >
                      {isRequested ? 'Requested' : 'Request Refill'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}