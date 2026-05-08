import { NextResponse } from "next/server";
import {
  MODEL_METADATA,
  predictStudentOutcome,
  validateFeatures,
} from "@/lib/predict";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const validation = validateFeatures(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const prediction = predictStudentOutcome(validation.features);

  return NextResponse.json({
    prediction,
    model: MODEL_METADATA,
  });
}

export async function GET() {
  return NextResponse.json({
    message:
      "Student Performance Predictor API. POST JSON with study_hours, attendance_percentage, previous_grade, assignments_submitted.",
    model: MODEL_METADATA,
  });
}
