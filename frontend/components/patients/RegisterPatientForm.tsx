"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "@/lib/axios";

export default function RegisterPatientForm() {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      await api.post("/patients", data);
      setMessage({ type: "success", text: "Patient successfully registered in the Medicare database!" });
      reset();
    } catch (error: any) {
      console.error(error);
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Registration failed. Please verify your details." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-sm font-extrabold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <span>✍️</span> 3. Register New Patient
      </h3>

      {message && (
        <div
          className={`mb-6 p-4 rounded-2xl border text-xs font-semibold ${
            message.type === "success"
              ? "bg-teal-500/10 border-teal-500/20 text-teal-300"
              : "bg-rose-500/10 border-rose-500/20 text-rose-300"
          }`}
        >
          {message.type === "success" ? "✅" : "⚠️"} {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="e.g. John Doe"
            className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">NIC / ID Card</label>
          <input
            {...register("nic")}
            placeholder="e.g. 199912345678"
            className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Phone Number</label>
          <input
            {...register("phone")}
            placeholder="e.g. +94771234567"
            className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Date of Birth</label>
          <input
            type="date"
            {...register("date_of_birth", { required: true })}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Gender</label>
          <div className="relative">
            <select
              {...register("gender", { required: true })}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 cursor-pointer appearance-none pr-10"
            >
              <option value="" className="bg-slate-950 text-slate-400">Select Gender</option>
              <option value="Male" className="bg-slate-950 text-white">Male</option>
              <option value="Female" className="bg-slate-950 text-white">Female</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Home Address</label>
          <input
            {...register("address")}
            placeholder="e.g. 123 Clinic Road, Colombo 03"
            className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 text-white text-sm font-bold px-8 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-600/20 active:scale-[0.99] flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                REGISTERING...
              </>
            ) : (
              "REGISTER PATIENT"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}