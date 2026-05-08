import { PredictorForm } from "@/components/PredictorForm";
import { MODEL_METADATA } from "@/lib/predict";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-16 sm:px-8 sm:py-24">
        <header className="flex flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
            AIN5301 · Assessment 002 MVP
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Student Performance Predictor
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            A small machine learning MVP that estimates whether a student is
            likely to <strong>pass</strong> or <strong>fail</strong> based on
            their study habits, attendance, prior performance, and coursework
            engagement. Predictions run on a Logistic Regression model trained
            with scikit-learn ({(MODEL_METADATA.accuracy * 100).toFixed(0)}%
            test accuracy).
          </p>
        </header>

        <footer className="mt-auto border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          Trained on a synthetic dataset of 200 students. Predictions are
          illustrative and not a substitute for academic judgement.
        </footer>
      </main>
    </div>
  );
}
