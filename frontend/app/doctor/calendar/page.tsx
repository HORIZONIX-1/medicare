"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarDays,
  FileCheck,
} from "lucide-react";

export default function DoctorCalendarPage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDateVisits, setSelectedDateVisits] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    if (!token || !userString) {
      router.push("/");
    } else {
      setCurrentUser(JSON.parse(userString));
      setIsCheckingAuth(false);
    }
  }, [router]);


  // Fetch all consultations (visits)
  const fetchVisits = async () => {
    try {
      setLoading(true);
      const response = await api.get("/consultations");
      setVisits(response.data);
      
      // Auto-select today and set its visits if any
      const today = new Date();
      const todayVisits = response.data.filter((v: any) => {
        const visitDate = new Date(v.visit_date);
        return (
          visitDate.getFullYear() === today.getFullYear() &&
          visitDate.getMonth() === today.getMonth() &&
          visitDate.getDate() === today.getDate()
        );
      });
      setSelectedDate(today);
      setSelectedDateVisits(todayVisits);
    } catch (error) {
      console.error("Failed to load visits list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchVisits();
    }
  }, []);


  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const prevMonthTotalDays = new Date(year, month, 0).getDate();
    const paddingStart = [];
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      paddingStart.push({
        day: prevMonthTotalDays - i,
        date: new Date(year, month - 1, prevMonthTotalDays - i),
        isCurrentMonth: false,
      });
    }
    
    const currentDays = [];
    for (let i = 1; i <= totalDays; i++) {
      currentDays.push({
        day: i,
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    const totalSlots = paddingStart.length + currentDays.length;
    const remainingSlots = 42 - totalSlots;
    const paddingEnd = [];
    for (let i = 1; i <= remainingSlots; i++) {
      paddingEnd.push({
        day: i,
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return [...paddingStart, ...currentDays, ...paddingEnd];
  };

  const getVisitsForDate = (date: Date) => {
    return visits.filter((v: any) => {
      const visitDate = new Date(v.visit_date);
      return (
        visitDate.getFullYear() === date.getFullYear() &&
        visitDate.getMonth() === date.getMonth() &&
        visitDate.getDate() === date.getDate()
      );
    });
  };

  const handleDateClick = (dayObj: any) => {
    const dateVisits = getVisitsForDate(dayObj.date);
    setSelectedDate(dayObj.date);
    setSelectedDateVisits(dateVisits);
  };

  const daysArray = getDaysInMonth(currentDate);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (isCheckingAuth) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent"></div>
        <p className="text-slate-500 text-sm mt-4">Verifying session...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        
        /* Modern Scrollbars */
        .modern-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .modern-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .modern-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .modern-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Traditional Unified Grid Table Styles */
        .calendar-table-container {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          background-color: #ffffff;
        }
        .calendar-grid-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }
        .calendar-header-cell {
          padding: 12px 4px;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #64748b;
          letter-spacing: 0.05em;
          border-right: 1px solid #e2e8f0;
        }
        .calendar-header-cell:last-child {
          border-right: none;
        }
        .calendar-grid-body {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background-color: #ffffff;
        }
        .calendar-day-cell {
          min-height: 110px;
          padding: 8px;
          border-right: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        /* Remove outer border lines for clean box table look */
        .calendar-day-cell:nth-child(7n) {
          border-right: none;
        }
        /* The last row cells shouldn't have bottom borders */
        .calendar-day-cell:nth-child(n+36) {
          border-bottom: none;
        }
        .calendar-day-cell:hover {
          background-color: #f8fafc;
        }
        .calendar-day-cell.inactive {
          background-color: #fafbfc;
          color: #cbd5e1;
        }
        .calendar-day-cell.selected {
          background-color: #eff6ff;
          box-shadow: inset 0 0 0 2px #3b82f6;
          z-index: 10;
        }
        .calendar-day-cell.today {
          background-color: #f0fdf4/30;
        }
      `}</style>

      <div className="dr-page-header">
        <h1 className="dr-page-title">Clinic Calendar</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* Left 3 columns: Calendar Grid Table */}
        <div className="xl:col-span-3">
          <div className="bg-white border border-slate-150 rounded-2xl shadow-sm overflow-hidden p-6">
            {/* Calendar Top Controls */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ fontSize: "1.375rem", fontWeight: 900, color: "#1e293b", margin: 0, letterSpacing: "-0.02em" }} className="flex items-center gap-2">
                  <CalendarDays className="text-blue-600" size={20} />
                  <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                </h2>
                <p style={{ fontSize: "0.8125rem", color: "#64748b", margin: "0.125rem 0 0 0" }}>Structured calendar grid showing daily visit summary logs.</p>
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={prevMonth}
                  className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-95 transition bg-white shadow-sm"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextMonth}
                  className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-95 transition bg-white shadow-sm"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Calendar Grid Table Component */}
            {loading ? (
              <div className="py-24 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="text-slate-400 text-xs mt-3">Loading calendar grid...</p>
              </div>
            ) : (
              <div className="calendar-table-container">
                {/* Weekday Column Headers */}
                <div className="calendar-grid-header">
                  {weekDays.map((wd) => (
                    <div key={wd} className="calendar-header-cell">{wd}</div>
                  ))}
                </div>

                {/* Day cells body with rows and columns borders */}
                <div className="calendar-grid-body">
                  {daysArray.map((slot, index) => {
                    const dayVisits = getVisitsForDate(slot.date);
                    const hasVisits = dayVisits.length > 0;
                          
                    const isToday = 
                      new Date().getDate() === slot.date.getDate() &&
                      new Date().getMonth() === slot.date.getMonth() &&
                      new Date().getFullYear() === slot.date.getFullYear();

                    const isSelected = selectedDate &&
                      selectedDate.getDate() === slot.date.getDate() &&
                      selectedDate.getMonth() === slot.date.getMonth() &&
                      selectedDate.getFullYear() === slot.date.getFullYear();

                    // Construct cell class names
                    let cellClass = "calendar-day-cell ";
                    if (!slot.isCurrentMonth) {
                      cellClass += "inactive ";
                    }
                    if (isSelected) {
                      cellClass += "selected ";
                    }
                    if (isToday && slot.isCurrentMonth) {
                      cellClass += "today ";
                    }

                    return (
                      <div
                        key={index}
                        onClick={() => handleDateClick(slot)}
                        className={cellClass}
                      >
                        <div className="flex justify-between items-start">
                          <span className={`text-[11px] w-6 h-6 flex items-center justify-center rounded-full font-bold ${
                            isToday && slot.isCurrentMonth
                              ? "bg-blue-600 text-white"
                              : slot.isCurrentMonth
                              ? "text-slate-700"
                              : "text-slate-300"
                          }`}>
                            {slot.day}
                          </span>

                          {/* Mini pill indicator for visits count */}
                          {hasVisits && slot.isCurrentMonth && (
                            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-50 text-blue-700 border border-blue-100">
                              {dayVisits.length}
                            </span>
                          )}
                        </div>

                        {/* Day Cell visit content preview */}
                        <div className="mt-2 space-y-1">
                          {hasVisits && slot.isCurrentMonth ? (
                            <>
                              <div className="text-[10px] text-slate-800 font-extrabold truncate">
                                {dayVisits[0]?.patient?.name}
                              </div>
                              {dayVisits.length > 1 ? (
                                <div className="text-[9px] text-blue-600 font-bold">
                                  + {dayVisits.length - 1} other{dayVisits.length > 2 ? "s" : ""}
                                </div>
                              ) : (
                                <div className="text-[8px] text-slate-400 font-semibold truncate">
                                  {dayVisits[0]?.chief_complaint || "Visit consultation"}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="h-4"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Timelined logs */}
        <div className="xl:col-span-1">
          <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6 flex flex-col max-h-[800px]">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                <FileCheck className="text-slate-500" size={18} />
                <span>Daily Logs</span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                {selectedDate 
                  ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                  : "Select calendar day"
                }
              </p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 modern-scroll pr-1">
              {!selectedDate ? (
                <div className="text-center py-16 text-slate-400 text-xs">
                  Select a date to inspect visiting lists.
                </div>
              ) : selectedDateVisits.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-xs">
                  No patient consultations recorded for this day.
                </div>
              ) : (
                selectedDateVisits.map((visit: any, index: number) => (
                  <div
                    key={visit.consultation_id}
                    className="relative pl-6 pb-2 border-l border-slate-100 last:border-l-0"
                  >
                    {/* Timeline node */}
                    <span className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-50"></span>

                    <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3.5 hover:bg-slate-50 transition">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="font-mono text-blue-700 bg-blue-50/50 px-2 py-0.5 rounded text-[9px] font-bold border border-blue-100/50">
                          {visit.patient?.patient_code}
                        </span>
                        <div className="flex items-center gap-1 text-slate-400 text-[10px] whitespace-nowrap">
                          <Clock size={10} />
                          <span>{new Date(visit.visit_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>

                      <h4 className="font-extrabold text-xs text-slate-800 truncate mb-1">{visit.patient?.name}</h4>
                      <p className="text-slate-400 text-[9px] mb-2.5">Consultant: Dr. {visit.doctor?.name}</p>

                      {visit.chief_complaint && (
                        <div className="text-xs text-slate-600 bg-white border border-slate-100 rounded-lg p-2 mb-2">
                          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider mb-0.5">Complaint</span>
                          <span className="font-semibold text-slate-700">{visit.chief_complaint}</span>
                        </div>
                      )}

                      {visit.diagnoses?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {visit.diagnoses.map((d: any) => (
                            <span 
                              key={d.diagnosis_id} 
                              className="px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-100 text-indigo-800 text-[9px] font-bold"
                            >
                              {d.diagnosis_name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
