"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "@/lib/axios";
import { Calendar, ChevronDown, UserPlus } from "lucide-react";

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
    <div style={{ marginTop: "1rem" }}>
      <h3 className="white-card-section-title">2. Register New Patient</h3>
      <p className="white-card-section-desc">If patient is not registered, create a new patient account.</p>

      {message && (
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid",
            fontSize: "0.8125rem",
            fontWeight: 600,
            backgroundColor: message.type === "success" ? "#f0fdf4" : "#fef2f2",
            borderColor: message.type === "success" ? "#bbf7d0" : "#fca5a5",
            color: message.type === "success" ? "#15803d" : "#b91c1c",
          }}
        >
          {message.type === "success" ? "✅ " : "⚠️ "} {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Row 1 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
          <div className="light-input-container">
            <label className="light-label">Full Name <span className="light-required">*</span></label>
            <input
              {...register("name", { required: true })}
              placeholder="Enter full name"
              className="light-input"
            />
          </div>

          <div className="light-input-container">
            <label className="light-label">NIC <span className="light-required">*</span></label>
            <input
              {...register("nic")}
              placeholder="Enter NIC"
              className="light-input"
            />
          </div>

          <div className="light-input-container">
            <label className="light-label">Phone Number <span className="light-required">*</span></label>
            <input
              {...register("phone")}
              placeholder="Enter phone number"
              className="light-input"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          <div className="light-input-container">
            <label className="light-label">Date of Birth <span className="light-required">*</span></label>
            <div style={{ position: "relative" }}>
              <input
                type="date"
                {...register("date_of_birth", { required: true })}
                className="light-input"
                style={{ paddingRight: "2.5rem" }}
              />
              <Calendar 
                size={16} 
                style={{ 
                  position: "absolute", 
                  inset: "0 0.875rem 0 auto", 
                  margin: "auto", 
                  color: "#94a3b8", 
                  pointerEvents: "none" 
                }} 
              />
            </div>
          </div>

          <div className="light-input-container">
            <label className="light-label">Gender <span className="light-required">*</span></label>
            <div style={{ position: "relative" }}>
              <select
                {...register("gender", { required: true })}
                className="light-select"
                style={{ appearance: "none", paddingRight: "2.5rem" }}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <ChevronDown 
                size={16} 
                style={{ 
                  position: "absolute", 
                  inset: "0 0.875rem 0 auto", 
                  margin: "auto", 
                  color: "#94a3b8", 
                  pointerEvents: "none" 
                }} 
              />
            </div>
          </div>

          <div className="light-input-container">
            <label className="light-label">Address (Optional)</label>
            <input
              {...register("address")}
              placeholder="Enter address"
              className="light-input"
            />
          </div>
        </div>

        {/* Row 3 Checkbox & Register Button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <label className="light-checkbox-container">
            <input type="checkbox" className="light-checkbox" />
            <span className="light-checkbox-label">Send registration confirmation via SMS / WhatsApp</span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-light-blue"
            style={{ borderRadius: "0.5rem" }}
          >
            <UserPlus size={16} />
            <span>{isSubmitting ? "Registering..." : "Register Patient"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}