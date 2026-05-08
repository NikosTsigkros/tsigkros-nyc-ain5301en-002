import json
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
data = pd.read_csv("student_performance_data.csv")

# Features
X = data[
    [
        "study_hours",
        "attendance_percentage",
        "previous_grade",
        "assignments_submitted",
    ]
]

# Labels
y = data["result"]

# Encode labels (Pass/Fail -> 1/0)
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Split train/test data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predictions
predictions = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, predictions)
print("\nMODEL TRAINING COMPLETE\n")
print(f"Accuracy: {accuracy * 100:.2f}%")

print("\nMODEL COEFFICIENTS:")
for feature, coefficient in zip(X.columns, model.coef_[0]):
    print(f"{feature}: {coefficient:.4f}")
print("\nMODEL INTERCEPT:")
print(model.intercept_[0])

# Save trained model
joblib.dump(model, "student_performance_model.pkl")
print("\nModel saved successfully: student_performance_model.pkl")

# Export model parameters as JSON so the Next.js MVP can run inference
# without a Python runtime in production.
model_params = {
    "features": list(X.columns),
    "coefficients": model.coef_[0].tolist(),
    "intercept": float(model.intercept_[0]),
    "classes": label_encoder.classes_.tolist(),
    "accuracy": float(accuracy),
}

JSON_TARGETS = [
    "student_performance_model.json",
    os.path.join("..", "ui-app", "src", "lib", "model.json"),
]

for target in JSON_TARGETS:
    os.makedirs(os.path.dirname(target) or ".", exist_ok=True)
    with open(target, "w") as f:
        json.dump(model_params, f, indent=2)
    print(f"Model parameters exported: {target}")

print("MODEL TRAINING COMPLETE")