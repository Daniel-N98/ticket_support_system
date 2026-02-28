import { ensureRoles } from "@/lib/api/seedRoles";
import dbConnect from "@/lib/mongodb";
import Role from "@/models/Role";
import User from "@/models/User";
import { RegisterRequest } from "@/types/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password }: RegisterRequest = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await dbConnect();
    await ensureRoles();

    const normalizedEmail = email.toLowerCase().trim();
    // Field validation.
    if (name.length < 3) return NextResponse.json({ error: "Name too short." }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: "Password too short." }, { status: 400 });
    if (!/\S+@\S+\.\S+/.test(email)) return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    // check if user exists
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    // hash password
    const userRole = await Role.findOne({ key: "user" });
    if (!userRole) {
      return NextResponse.json(
        { error: 'Default "user" role not found.' },
        { status: 500 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: userRole._id,
      status: "active",
    });

    return NextResponse.json({ message: "User has been registered.", id: user._id.toString() });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "User could not be created." }, { status: 500 });
  }
}