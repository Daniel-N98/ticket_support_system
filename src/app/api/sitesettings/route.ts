import dbConnect from "@/lib/mongodb";
import { checkForBanError, requirePermission, requireSession } from "@/lib/permissionUtils";
import SiteSettings from "@/models/SiteSettings";
import { PERMISSIONS } from "@/types/Permissions";
import { SETTINGS_SCHEMA, SiteSettingsType } from "@/types/SiteSettings";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const settings = await SiteSettings.find({}).lean();
    if (settings && settings.length > 0) {
      return NextResponse.json({ message: "Settings fetched.", settings }, { status: 200 });
    }
    return NextResponse.json({ error: "Could not fetch settings." }, { status: 200 });
  } catch (error) {
    return checkForBanError(error);
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
    await SiteSettings.create(settings);
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