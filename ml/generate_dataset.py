print("SCRIPT STARTED")

import csv
import random

OUTPUT_FILE = "student_performance_data.csv"

TOTAL_STUDENTS = 200

with open(OUTPUT_FILE, "w", newline="") as file:
    fieldnames = [
        "student_id",
        "study_hours",
        "attendance_percentage",
        "previous_grade",
        "assignments_submitted",
        "result"
    ]

    writer = csv.DictWriter(file, fieldnames=fieldnames)

    writer.writeheader()

    for student_id in range(1, TOTAL_STUDENTS + 1):

        study_hours = random.randint(0, 12)

        attendance_percentage = random.randint(40, 100)

        previous_grade = random.randint(20, 100)

        assignments_submitted = random.randint(0, 5)

        score = (
            study_hours * 4 +
            attendance_percentage * 0.3 +
            previous_grade * 0.4 +
            assignments_submitted * 5
        )

        result = "Pass" if score >= 65 else "Fail"

        writer.writerow({
            "student_id": student_id,
            "study_hours": study_hours,
            "attendance_percentage": attendance_percentage,
            "previous_grade": previous_grade,
            "assignments_submitted": assignments_submitted,
            "result": result
        })

print(f"Dataset generated successfully: {OUTPUT_FILE}")

print("SCRIPT ENDED")