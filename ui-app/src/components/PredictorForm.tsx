"use client";

import { useState } from "react";
import type { PredictionResult } from "@/lib/predict";

type FieldConfig = {
  name: "study_hours" | "attendance_percentage" | "previous_grade" | "assignments_submitted";
  label: string;
  helper: string;
  min: number;
  max: number;
  step: number;
  suffix?: string;
};

const FIELDS: FieldConfig[] = [
  {
    name: "study_hours",
    label: "Study hours per week",
    helper: "Average self-study time outside of class.",
    min: 0,
    max: 24,
    step: 1,
    suffix: "h",
  },
  {
    name: "attendance_percentage",
    label: "Attendance",
    helper: "Percentage of classes attended this semester.",
    min: 0,
    max: 100,
    step: 1,
    suffix: "%",
  },
  {
    name: "previous_grade",
    label: "Previous grade",
    helper: "Most recent overall grade on a 0-100 scale.",
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: "assignments_submitted",
    label: "Assignments submitted",
    helper: "Number of completed coursework assignments.",
    min: 0,
    max: 20,
    step: 1,
  },
];

const DEFAULT_VALUES: Record<FieldConfig["name"], number> = {
  study_hours: 6,
  attendance_percentage: 80,
  previous_grade: 70,
  assignments_submitted: 4,
};

type ApiResponse = {
  prediction: PredictionResult;
  model: { accuracy: number; classes: string[]; features: string[] };
};

export function PredictorForm() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (name: FieldConfig["name"], raw: string) => {
    const next = raw === "" ? 0 : Number(raw);
    setValues((prev) => ({ ...prev, [name]: Number.isFinite(next) ? next : 0 }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error ?? "Prediction failed. Please try again.");
        setResult(null);
      } else {
        setResult(data as ApiResponse);
      }
    } catch {
      setError("Could not reach the prediction service.");
      setResult(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setValues(DEFAULT_VALUES);
    setResult(null);
    setError(null);
  };

  return (
    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-5">
      <form
        onSubmit={handleSubmit}
        className="lg:col-span-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
      >
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Student profile
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter the academic indicators below and we&apos;ll estimate the likely
            outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <label
              key={field.name}
              className="flex flex-col gap-1.5 text-sm"
              htmlFor={field.name}
            >
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {field.label}
              </span>
              <div className="relative">
                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  inputMode="numeric"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={values[field.name]}
                  onChange={(event) => updateField(field.name, event.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-10 text-zinc-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  required
                />
                {field.suffix && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-zinc-400">
                    {field.suffix}
                  </span>
                )}
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {field.helper}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center rounded-full bg-indigo-600 px-6 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? "Predicting…" : "Predict outcome"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Reset
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </div>
        )}
      </form>

      <ResultPanel result={result} />
    </div>
  );
}

function ResultPanel({ result }: { result: ApiResponse | null }) {
  if (!result) {
    return (
      <aside className="lg:col-span-2 flex flex-col gap-3 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/60 p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400 sm:p-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Prediction
        </h2>
        <p>
          Submit the form to see whether the student is likely to <strong>Pass</strong>{" "}
          or <strong>Fail</strong>, the model&apos;s confidence, and per-feature
          contributions.
        </p>
      </aside>
    );
  }

  const { prediction, model } = result;
  const isPass = prediction.label === "Pass";
  const confidencePct = (prediction.confidence * 100).toFixed(1);
  const probabilityPct = (prediction.probability * 100).toFixed(1);

  return (
    <aside className="lg:col-span-2 flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8">
      <div>
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Predicted outcome
        </span>
        <div className="mt-2 flex items-baseline gap-3">
          <span
            className={`text-3xl font-semibold tracking-tight ${
              isPass
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {prediction.label}
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {confidencePct}% confidence
          </span>
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>P(Pass)</span>
          <span>{probabilityPct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className={`h-full rounded-full transition-all ${
              isPass ? "bg-emerald-500" : "bg-rose-500"
            }`}
            style={{ width: `${probabilityPct}%` }}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Feature contributions
        </h3>
        <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
          {prediction.contributions.map((c) => (
            <li
              key={c.feature}
              className="flex items-center justify-between gap-2 rounded-md bg-zinc-50 px-3 py-1.5 dark:bg-zinc-900"
            >
              <span className="font-mono">{c.feature}</span>
              <span
                className={
                  c.contribution >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }
              >
                {c.contribution >= 0 ? "+" : ""}
                {c.contribution.toFixed(3)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-zinc-100 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        Logistic Regression model · test accuracy{" "}
        <strong>{(model.accuracy * 100).toFixed(1)}%</strong>
      </p>
    </aside>
  );
}
