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