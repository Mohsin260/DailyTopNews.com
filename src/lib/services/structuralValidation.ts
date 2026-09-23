export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateJsonLd(schema: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];

  if (!schema["@context"]) errors.push("Missing @context");
  if (!schema["@type"]) errors.push("Missing @type");

  return { valid: errors.length === 0, errors };
}

export function checkDisclosurePresent(hasAffiliateLinks: boolean, hasDisclosure: boolean): ValidationResult {
  if (hasAffiliateLinks && !hasDisclosure) {
    return {
      valid: false,
      errors: ["Inline affiliate disclosure missing on page with affiliate links (FTC violation)"],
    };
  }
  return { valid: true, errors: [] };
}
