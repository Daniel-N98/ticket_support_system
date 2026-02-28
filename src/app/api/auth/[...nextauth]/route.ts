import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { DefaultJWT } from "next-auth/jwt";

declare global {
  var _mongoClient: MongoClient | undefined;
}

async function connectToDatabase() {
  if (!globalThis._mongoClient) {
    globalThis._mongoClient = new MongoClient(process.env.MONGODB_URI!);
    await globalThis._mongoClient.connect();
  }
  return globalThis._mongoClient.db("ticket_support_system");
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    id: string;
    role: string;
  }
}

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = await connectToDatabase();
        const user = await db.collection("users").findOne({ email: credentials.email }, { projection: { _id: 1, name: 1, email: 1, password: 1, role: 1 } });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role ?? "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      if (user) {
        return { ...token, id: user.id, role: user.role, name: user.name, email: user.email };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
          name: token.name,
          email: token.email as string,
        },
      };
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };