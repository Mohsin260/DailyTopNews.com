import type { Article } from "@/types";
import { validateJsonLd, type ValidationResult } from "./structuralValidation";

export interface QualityGateResult {
  passed: boolean;
  gates: Record<string, ValidationResult>;
}

export function runQualityGates(article: Article): QualityGateResult {
  const gates: Record<string, ValidationResult> = {};

  // Schema gate
  if (article.seo_metadata?.jsonLd) {
    gates.schema = validateJsonLd(article.seo_metadata.jsonLd as Record<string, unknown>);
  } else {
    gates.schema = { valid: true, errors: [] };
  }

  // Uniqueness gate (basic check — title should not be empty)
  gates.uniqueness = {
    valid: !!article.title && article.title.length > 0,
    errors: article.title ? [] : ["Title is empty"],
  };

  // Content type gate
  gates.content_type = {
    valid: !!article.content_type,
    errors: article.content_type ? [] : ["content_type not set"],
  };

  const passed = Object.values(gates).every((g) => g.valid);

  return { passed, gates };
}
