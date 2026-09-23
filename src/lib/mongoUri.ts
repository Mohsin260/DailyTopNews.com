/**
 * Single source of truth for the project database name.
 * Every connection (app + all scripts) must go through forceDbUri()
 * so no other database name can ever be used.
 */
export const DB_NAME = "dailytopnews-db";

/**
 * Takes any mongodb/mongodb+srv URI (with or without a database name,
 * with or without query params) and returns it pointing at DB_NAME.
 * Strips whatever database name was in the original URI.
 */
export function forceDbUri(raw?: string | null): string {
  if (!raw || !raw.trim()) {
    throw new Error("MONGO_URI is not set");
  }

  const uri = raw.trim();
  const [main, ...queryParts] = uri.split("?");
  const params = queryParts.length ? `?${queryParts.join("?")}` : "";

  const schemeIdx = main.indexOf("://");
  if (schemeIdx === -1) {
    throw new Error("Invalid MONGO_URI (missing mongodb:// scheme)");
  }

  const scheme = main.slice(0, schemeIdx + 3);
  const rest = main.slice(schemeIdx + 3);

  // Authority = everything up to the path. Path starts at the first "/"
  // after the last "@" (userinfo may legally contain "/" but "@host" marks
  // the end of userinfo). Without userinfo, the first "/" starts the path.
  const at = rest.lastIndexOf("@");
  const searchFrom = at >= 0 ? at : 0;
  const pathStart = rest.indexOf("/", searchFrom);
  const authority = pathStart >= 0 ? rest.slice(0, pathStart) : rest;

  if (!authority) {
    throw new Error("Invalid MONGO_URI (missing host)");
  }

  return `${scheme}${authority}/${DB_NAME}${params}`;
}
