import NextAuth from "next-auth";
import { authOptions } from "@/shared/lib/auth/nextauth.options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
