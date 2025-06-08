import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "1028526455117-j4dov30t769757afrd0kq3fvdobka2dv.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6", // Replace with your generated secret
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 