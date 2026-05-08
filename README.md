# AIN5301 Assessment 002 - Student Performance Predictor

This repository contains the implementation evidence for the AIN5301 Introduction to AI Assessment 002 portfolio.

The project is a small MVP web application called **Student Performance Predictor**. Its goal is to predict whether a student is likely to pass or fail based on simple academic indicators such as study hours, attendance, previous grade, and submitted assignments.

## Project Structure

```text
.
├── ml/
│   ├── generate_dataset.py
│   ├── student_performance_data.csv
│   ├── train_model.py
│   ├── student_performance_model.pkl
│   └── student_performance_model.json
├── ui-app/
│   └── src/
│       ├── app/
│       │   ├── api/predict/route.ts
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components/PredictorForm.tsx
│       └── lib/
│           ├── model.json
│           └── predict.ts
└── README.md
```

## Current Progress

So far, the following implementation steps have been completed for the Student Performance Predictor MVP:

1. Created the initial repository structure for the AIN5301 Assessment 002 project.

2. Added a dedicated `ml/` directory to contain all machine learning-related scripts and generated datasets.

3. Implemented a synthetic dataset generator using Python.

4. Generated a mock student performance dataset (`student_performance_data.csv`) containing realistic academic-related data for machine learning experimentation.

5. Defined the following dataset features:

   - student_id

   - study_hours

   - attendance_percentage

   - previous_grade

   - assignments_submitted

   - result (Pass / Fail)

6. Implemented a Logistic Regression machine learning training pipeline using scikit-learn.

7. Added preprocessing steps including:

   - feature selection

   - label encoding

   - train/test splitting

8. Trained a classification model to predict whether a student is likely to pass or fail.

9. Evaluated the model using prediction accuracy metrics.

10. Displayed the learned Logistic Regression coefficients to better understand feature importance and model behaviour.

11. Serialized and saved the trained machine learning model using `joblib`:

```text

student_performance_model.pkl
```

12. Implemented a prediction inference script (predict.py) that loads the serialized model and performs real-time predictions using sample student data.

13. Initialized the Next.js MVP application using:

* TypeScript
* App Router
* Tailwind CSS
* ESLint

14. Prepared the frontend structure for integrating machine learning predictions into the web application.

15. Established an incremental Git workflow with structured commits documenting each development stage of the project.

16. Began preparing the project architecture for:

* API prediction endpoints
* frontend prediction forms
* model integration
* deployment
* portfolio documentation

17. Exported the trained model coefficients to `student_performance_model.json` so the Next.js MVP can run inference without a Python runtime in production.

18. Implemented a TypeScript logistic regression inference layer (`ui-app/src/lib/predict.ts`) that mirrors the scikit-learn model and validates inputs.

19. Added a Next.js API route at `POST /api/predict` that consumes the exported model and returns a Pass/Fail prediction with probability and per-feature contributions.

20. Built the **Student Performance Predictor** MVP page with a Tailwind v4 form, dark-mode support, real-time prediction results, and feature contribution breakdown.

## How to Generate the Dataset

```bash
cd ml

python3 generate_dataset.py

// After running the script, the following file should be created: student_performance_data.csv
```

## How to train the model

```bash
cd ml

python3 trail_model.py

// After running the script, the following file should be created: student_performance_model.pkl
```

## Machine Learning Training

A Logistic Regression classification model was implemented using scikit-learn.

The training pipeline performs the following steps:

1. Loads the generated CSV dataset.

2. Selects the feature columns used for prediction.

3. Encodes the classification labels (`Pass` / `Fail`) into numeric values.

4. Splits the dataset into training and testing subsets.

5. Trains a Logistic Regression classification model.

6. Evaluates prediction accuracy.

7. Saves the trained model for future inference.

## Features Used

The following student-related features are used during model training:

| Feature | Purpose |

|---|---|

| `study_hours` | Weekly study effort |

| `attendance_percentage` | Student attendance consistency |

| `previous_grade` | Historical academic performance |

| `assignments_submitted` | Coursework engagement |

## Learned Model Coefficients

The model produced the following learned coefficients:

```
study_hours: 1.7896

attendance_percentage: 0.1541

previous_grade: 0.1843

assignments_submitted: 2.2551
```

## Model Accuracy

The current Logistic Regression model achieved the following result during evaluation:

```text
Accuracy: 95.00%
```

## How to run the MVP web app

```bash
cd ui-app

npm install

npm run dev

# Open http://localhost:3000
```

The app calls `POST /api/predict` with a JSON body of the four features and renders the predicted outcome, the model confidence, and each feature's contribution to the decision.

Example request:

```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"study_hours": 6, "attendance_percentage": 85, "previous_grade": 72, "assignments_submitted": 4}'
```

## Architecture

```text
[ml/train_model.py]                    (training, scikit-learn)
        │
        ├── student_performance_model.pkl   (Python inference)
        └── student_performance_model.json ─┐
                                            ▼
                          [ui-app/src/lib/model.json]
                                            │
                                            ▼
                  [ui-app/src/lib/predict.ts]   (pure-TS logistic regression)
                                            │
                                            ▼
                [ui-app/src/app/api/predict/route.ts]   (Next.js API route)
                                            │
                                            ▼
              [ui-app/src/components/PredictorForm.tsx]  (UI form + result)
```

Re-running `python3 train_model.py` retrains the model and refreshes both `student_performance_model.json` (in `ml/`) and `ui-app/src/lib/model.json`, so the frontend always stays in sync with the latest trained weights.