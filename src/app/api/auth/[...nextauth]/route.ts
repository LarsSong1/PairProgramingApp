import { db } from "@/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { Adapter } from "next-auth/adapters"



const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error('GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET deben estar configuradas');
}

const handler = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
})

export { handler as GET, handler as POST }