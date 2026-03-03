import dbConnect from "@/lib/mongodb";
import { checkForBanError, requirePermission, requireSession } from "@/lib/permissionUtils";
import SiteSettings from "@/models/SiteSettings";
import { PERMISSIONS } from "@/types/Permissions";
import { SETTINGS_SCHEMA, SiteSettingsType } from "@/types/SiteSettings";
import { NextRequest, NextResponse } from "next/server";

let cachedSettings: SiteSettingsType[] | null = null;
let lastFetchedAt = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 min

export async function GET() {
  const now = Date.now();

  if (cachedSettings && now - lastFetchedAt < CACHE_TTL_MS) {
    console.log("Returning cached");

    return NextResponse.json({ message: "Settings fetched (cache).", settings: cachedSettings });
  }

  await dbConnect();
  try {
    const settings = await SiteSettings.find({}).lean();
    lastFetchedAt = now;
    cachedSettings = settings;
    return NextResponse.json({ message: "Settings fetched.", settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { settings } = await req.json();

  if (!settings || settings.length !== Object.keys(SETTINGS_SCHEMA).length) {
    return NextResponse.json({ error: "Invalid settings payload." }, { status: 400 });
  }

  try {
    const settingsValidation: boolean = validateSettings(settings);
    if (!settingsValidation) {
      return NextResponse.json({ error: "Malformed settings" }, { status: 400 });
    }
    const isInternal = isInternalRequest(req);
    if (!isInternal) {
      await requireSession();
      if (!await requirePermission(PERMISSIONS.TICKETS_CREATE)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    }

    await dbConnect();
    await Promise.all(
      settings.map((setting: SiteSettingsType) =>
        SiteSettings.findOneAndUpdate(
          { key: setting.key },
          { $set: { value: setting.value, name: setting.name } },
          { upsert: true }
        )
      )
    );

    cachedSettings = [...settings];
    lastFetchedAt = Date.now();

    return NextResponse.json({ success: true });
  } catch (error) {
    return checkForBanError(error);
  }
}

function isInternalRequest(req: NextRequest) {
  return req.headers.get("x-internal-secret") === process.env.INTERNAL_API_SECRET;
}

function validateSettings(settings: SiteSettingsType[]) {
  if (!Array.isArray(settings)) return false;

  const expectedKeys = Object.keys(SETTINGS_SCHEMA);

  if (settings.length !== expectedKeys.length) return false;

  const seenKeys = new Set<string>();

  return settings.every(setting => {
    if (typeof setting.key !== "string" || typeof setting.name !== "string" || typeof setting.value !== "boolean") return false;

    if (!(setting.key in SETTINGS_SCHEMA)) return false;

    if (SETTINGS_SCHEMA[setting.key as keyof typeof SETTINGS_SCHEMA] !== setting.name) return false;

    if (seenKeys.has(setting.key)) return false;
    seenKeys.add(setting.key);

    return true;
  });
}