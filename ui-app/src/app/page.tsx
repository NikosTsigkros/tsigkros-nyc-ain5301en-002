import { PredictorForm } from "@/components/PredictorForm";
import { MODEL_METADATA } from "@/lib/predict";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-16 sm:px-8 sm:py-24">
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300">
              AIN5301 · Assessment 002 MVP
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              By <a className="text-blue-500" href="https://tsigros.gr" target="_blank" rel="noopener noreferrer">Nikos Tsigkros</a> · New York College of Greece ·{" "}
              <em className="not-italic">Introduction to AI</em>
            </span>
            <a
              href="https://github.com/NikosTsigkros"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nikos Tsigkros on GitHub"
              title="View on GitHub"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-50"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
                />
              </svg>
            </a>
          </div>
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

        <PredictorForm />

        <footer className="mt-auto border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          Trained on a synthetic dataset of 200 students. Predictions are
          illustrative and not a substitute for academic judgement.
        </footer>
      </main>
    </div>
  );
}
