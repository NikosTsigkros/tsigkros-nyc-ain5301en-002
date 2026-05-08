# AIN5301 Assessment 002 - Student Performance Predictor

This repository contains the implementation evidence for the AIN5301 Introduction to AI Assessment 002 portfolio.

The project is a small MVP web application called **Student Performance Predictor**. Its goal is to predict whether a student is likely to pass or fail based on simple academic indicators such as study hours, attendance, previous grade, and submitted assignments.

## Project Structure

```text
.
├── ml/
│   ├── generate_dataset.py
│   └── student_performance_data.csv
├── ui-app/
└── README.md
```

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