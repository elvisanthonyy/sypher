import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/libs/dbConnect";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";

import NextAuth from "next-auth";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        adminLogin: {},
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          console.log("send fields");
          throw new Error("field not complete");
        }
        const user = await User.findOne({ email: credentials.email });
        console.log(user);
        if (!user) {
          console.log("user not found");
          throw new Error("user not found");
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          console.log("invalid login");
          throw new Error("invalid login");
        }

        if (credentials.adminLogin === "true") {
          if (user.role !== "admin") {
            console.log("Not an admin");
            throw new Error("Not an admin");
          }
        }

        if (!user.verified) {
          console.log("not verified");
          throw new Error("user not verified");
        }
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, metadata) {
      console.log("NextAuth error", code, metadata);
    },
    warn(code) {
      console.log("NextAuth error", code);
    },
    debug(code, metadata) {
      console.log("NextAuth error", code, metadata);
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session) {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = token.id;
          session.user.role = user.role;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
