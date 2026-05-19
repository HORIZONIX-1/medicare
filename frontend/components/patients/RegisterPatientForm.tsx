"use client";

import { useForm } from "react-hook-form";
import api from "@/lib/axios";

export default function RegisterPatientForm() {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {

    try {

      await api.post("/patients", data);

      alert("Patient registered");

      reset();

    } catch (error) {
      console.error(error);

      alert("Registration failed");
    }
  };

  return (
    <div className="border rounded-lg p-5 bg-white">

      <h2 className="font-semibold mb-4">
        3. REGISTER NEW PATIENT
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >

        <input
          {...register("name")}
          placeholder="Full Name"
          className="border p-2 rounded"
        />

        <input
          {...register("nic")}
          placeholder="NIC"
          className="border p-2 rounded"
        />

        <input
          {...register("phone")}
          placeholder="Phone Number"
          className="border p-2 rounded"
        />

        <input
          type="date"
          {...register("date_of_birth")}
          className="border p-2 rounded"
        />

        <select
          {...register("gender")}
          className="border p-2 rounded"
        >
          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>
        </select>

        <input
          {...register("address")}
          placeholder="Address"
          className="border p-2 rounded"
        />

        <div className="col-span-2 flex justify-end">

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded"
          >
            REGISTER PATIENT
          </button>

        </div>

      </form>
    </div>
  );
}