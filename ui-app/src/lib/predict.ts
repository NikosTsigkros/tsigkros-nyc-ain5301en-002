import modelData from "./model.json";

export const FEATURE_KEYS = [
  "study_hours",
  "attendance_percentage",
  "previous_grade",
  "assignments_submitted",
] as const;

export type FeatureKey = (typeof FEATURE_KEYS)[number];

export type StudentFeatures = Record<FeatureKey, number>;

export type PredictionResult = {
  label: string;
  probability: number;
  confidence: number;
  contributions: Array<{
    feature: FeatureKey;
    value: number;
    coefficient: number;
    contribution: number;
  }>;
};

const sigmoid = (z: number): number => 1 / (1 + Math.exp(-z));

export function predictStudentOutcome(
  features: StudentFeatures,
): PredictionResult {
  const { coefficients, intercept, classes } = modelData;

  let z = intercept;
  const contributions = FEATURE_KEYS.map((feature, index) => {
    const coefficient = coefficients[index];
    const value = features[feature];
    const contribution = coefficient * value;
    z += contribution;
    return { feature, value, coefficient, contribution };
  });

  const probabilityPositive = sigmoid(z);
  const predictedIndex = probabilityPositive >= 0.5 ? 1 : 0;
  const label = classes[predictedIndex];

  const confidence =
    predictedIndex === 1 ? probabilityPositive : 1 - probabilityPositive;

  return {
    label,
    probability: probabilityPositive,
    confidence,
    contributions,
  };
}

const FEATURE_BOUNDS: Record<FeatureKey, { min: number; max: number }> = {
  study_hours: { min: 0, max: 24 },
  attendance_percentage: { min: 0, max: 100 },
  previous_grade: { min: 0, max: 100 },
  assignments_submitted: { min: 0, max: 20 },
};

export function validateFeatures(input: unknown): {
  ok: true;
  features: StudentFeatures;
} | { ok: false; error: string } {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const features = {} as StudentFeatures;
  for (const key of FEATURE_KEYS) {
    const raw = (input as Record<string, unknown>)[key];
    const value = typeof raw === "string" ? Number(raw) : raw;

    if (typeof value !== "number" || !Number.isFinite(value)) {
      return { ok: false, error: `Field "${key}" must be a finite number.` };
    }

    const { min, max } = FEATURE_BOUNDS[key];
    if (value < min || value > max) {
      return {
        ok: false,
        error: `Field "${key}" must be between ${min} and ${max}.`,
      };
    }

    features[key] = value;
  }

  return { ok: true, features };
}

export const MODEL_METADATA = {
  accuracy: modelData.accuracy,
  classes: modelData.classes,
  features: modelData.features,
} as const;
