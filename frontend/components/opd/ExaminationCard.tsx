"use client";

import {
  forwardRef,
  type ForwardedRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import api from "@/lib/axios";

interface Props {
  consultationId: number;
  examinations: any[];
  onDataAdded?: () => void;
}

export interface ExaminationCardHandle {
  saveMetrics: () => Promise<void>;
}

function ExaminationCard(
  {
    consultationId,
    examinations,
    onDataAdded,
  }: Props,
  ref: ForwardedRef<ExaminationCardHandle>
) {
  const [showForm, setShowForm] = useState(false);
  const [localExaminations, setLocalExaminations] = useState<any[]>(examinations || []);
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mainMetricNames = [
    "Blood Pressure",
    "Temperature",
    "Pulse",
    "Respiratory Rate",
    "Oxygen Saturation",
  ];
  const [metrics, setMetrics] = useState<Record<string, string>>(
    Object.fromEntries(mainMetricNames.map((n) => [n, ""]))
  );
  const [isSavingMetrics, setIsSavingMetrics] = useState(false);

  const normalizeTitle = (value: string) => value.trim().toLowerCase();

  const mapExaminationsToMetrics = (items: any[]) => {
    const nextMetrics = Object.fromEntries(mainMetricNames.map((n) => [n, ""]));

    items.forEach((item) => {
      const matchedMetric = mainMetricNames.find(
        (metricName) => normalizeTitle(metricName) === normalizeTitle(item?.title || "")
      );

      if (matchedMetric) {
        nextMetrics[matchedMetric] = item?.result || "";
      }
    });

    return nextMetrics;
  };

  useEffect(() => {
    setLocalExaminations(examinations || []);
  }, [examinations]);

  useEffect(() => {
    setMetrics(mapExaminationsToMetrics(examinations || []));
  }, [examinations]);

  useImperativeHandle(ref, () => ({
    saveMetrics: async () => {
      setIsSavingMetrics(true);

      try {
        const existingByTitle = new Map(
          localExaminations.map((item) => [
            normalizeTitle(item?.title || ""),
            item,
          ])
        );

        const savedItems: any[] = [];

        for (const metricName of mainMetricNames) {
          const value = metrics[metricName]?.trim();

          if (!value) {
            continue;
          }

          const existing = existingByTitle.get(normalizeTitle(metricName));

          if (existing?.examination_id) {
            const response = await api.put(`/examinations/${existing.examination_id}`, {
              title: metricName,
              result: value,
            });

            savedItems.push(response.data);
          } else {
            const response = await api.post("/examinations", {
              consultation_id: consultationId,
              title: metricName,
              result: value,
            });

            savedItems.push(response.data);
          }
        }

        if (savedItems.length > 0) {
          setLocalExaminations((current) => {
            const remaining = current.filter(
              (item) =>
                !mainMetricNames.some(
                  (metricName) => normalizeTitle(metricName) === normalizeTitle(item?.title || "")
                )
            );

            return [...remaining, ...savedItems];
          });
        }
      } finally {
        setIsSavingMetrics(false);
      }
    },
  }));

  const handleAddExamination = async () => {
    if (!title || !result) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/examinations", {
        consultation_id: consultationId,
        title,
        result,
      });

      setLocalExaminations((current) => [
        ...current,
        { consultation_id: consultationId, title, result },
      ]);

      setTitle("");
      setResult("");
      setShowForm(false);
      onDataAdded?.();
    } catch (error) {
      console.error("Failed to add examination:", error);
      alert("Failed to add examination");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-modern">

      <div className="symptoms-header">
        <h2 className="card-title">
          <span className="card-number">③</span> Physical Examination
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-cyan"
        >
          {showForm ? "Cancel" : "+ Add"}
        </button>
      </div>

      <div className="metrics-container space-y-4">
        <div>
          <h3 className="text-sm text-slate-300 font-semibold mb-2">Default examinations</h3>
          <div className="grid grid-cols-1 gap-2">
            {mainMetricNames.map((name) => (
              <div key={name} className="flex items-center gap-3">
                <label className="w-40 text-sm">{name}</label>
                <input
                  type="text"
                  value={metrics[name]}
                  onChange={(e) => setMetrics((m) => ({ ...m, [name]: e.target.value }))}
                  className="input-dark flex-1"
                  placeholder="Value"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {localExaminations.length > 0 ? (
          localExaminations.map((item) => (
            <div key={item.examination_id || `${item.title}-${item.result}`} className="symptom-item">
              <div className="flex-1">
                <p className="text-base font-semibold text-slate-100">{item.title}</p>
                <p className="text-xs text-slate-400 mt-1">Result: <span className="text-cyan-400 font-semibold">{item.result}</span></p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 py-2 text-sm">No physical examinations recorded</p>
        )}
      </div>

      {showForm && (
        <div className="symptoms-form-container">
          <div className="space-y-4">
            <div>
              <label className="form-label">
                Examination
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Blood Pressure, Temperature"
                className="input-dark"
              />
            </div>

            <div>
              <label className="form-label">
                Result
              </label>
              <input
                type="text"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="e.g., 120/80 mmHg, Normal"
                className="input-dark"
              />
            </div>

            <button
              onClick={handleAddExamination}
              disabled={isLoading}
              className="btn-indigo-gradient w-full"
            >
              {isLoading ? "Adding..." : "Add Examination"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default forwardRef(ExaminationCard);