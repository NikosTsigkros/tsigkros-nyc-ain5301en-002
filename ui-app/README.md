# Student Performance Predictor — Next.js MVP

This is the frontend MVP for the AIN5301 Assessment 002 project. It is a [Next.js](https://nextjs.org) app (App Router, TypeScript, Tailwind CSS v4) that runs the Logistic Regression model trained in `../ml/` directly in the browser/server runtime — no Python required at runtime.

## How it works

1. The training pipeline at `../ml/train_model.py` trains a scikit-learn `LogisticRegression` model and exports its parameters (coefficients, intercept, class labels, accuracy) to `src/lib/model.json`.
2. `src/lib/predict.ts` re-implements the same logistic regression in TypeScript, validating inputs and returning the predicted class plus the per-feature contributions.
3. `src/app/api/predict/route.ts` exposes `POST /api/predict` which the form on `src/app/page.tsx` calls.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the predictor.

## API

`POST /api/predict`

```json
{
  "study_hours": 6,
  "attendance_percentage": 85,
  "previous_grade": 72,
  "assignments_submitted": 4
}
```

Response:

```json
{
  "prediction": {
    "label": "Pass",
    "probability": 0.99,
    "confidence": 0.99,
    "contributions": [
      { "feature": "study_hours", "value": 6, "coefficient": 1.789, "contribution": 10.74 }
    ]
  },
  "model": { "accuracy": 0.95, "classes": ["Fail", "Pass"], "features": ["..."] }
}
```

## Refreshing the model

Re-run the training pipeline whenever the dataset changes:

```bash
cd ../ml
python3 train_model.py
```

This rewrites `src/lib/model.json` so the frontend automatically picks up the new weights on the next build.
