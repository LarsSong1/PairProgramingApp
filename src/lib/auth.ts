import { AuthOptions, getServerSession, DefaultSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import { db } from "@/db";



const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientID || !googleClientSecret) {
    throw new Error('GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET deben estar configuradas');
}


declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        id: string;
      } & DefaultSession["user"];
    }
  }

export const authConfig = {
    adapter: DrizzleAdapter(db) as Adapter,
    session: {
        strategy: "jwt",
    },
    providers: [
        Google({
            clientId: googleClientID,
            clientSecret: googleClientSecret,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            const dbUser = await db.query.users.findFirst({
                where: (users, { eq }) => eq(users.email, token.email!),
            });

            if (!dbUser) {
                throw new Error("no user with email found");
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            };
        },
        async session({ token, session }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                };
            }

            return session;
        },
    },
} satisfies AuthOptions;

export function getSession() {
    return getServerSession(authConfig)
}