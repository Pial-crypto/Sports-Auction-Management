import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID|| "350493776532-8jaukcivnlnrpbh0qnor9ak8daljopcj.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET|| "SOCjRqLH+v76Yd9oTfPsG3PUkMX+HdQquy+sYqGvqMo=",
};

export default NextAuth(authOptions);
