import { connectDB } from "@/lib/db";
import { Setting } from "@/lib/models/Setting";
import { DEPLOYMENT_LOCALE } from "@/lib/i18n";

/**
 * Global "Enable ads" site setting. Defaults to true when never set.
 */
export async function isAdsGloballyEnabled(): Promise<boolean> {
  try {
    await connectDB();
    const doc = await Setting.findOne({ key: "site", locale: DEPLOYMENT_LOCALE }).lean();
    const value = (doc?.value ?? null) as { adsEnabled?: boolean } | null;
    return value?.adsEnabled !== false;
  } catch {
    return true;
  }
}
