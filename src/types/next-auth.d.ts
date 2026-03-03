import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      status: string;
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    status: "active" | "banned";
  }

  interface User {
    id: string;
    role: string;
    status: "active" | "banned";
  }
}