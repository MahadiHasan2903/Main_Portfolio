import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "../../index";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Type your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Type your password",
        },
      },
      async authorize(credentials, req) {
        try {
          console.log("Credentials received:", credentials);

          const loginData = {
            email: credentials?.email,
            password: credentials?.password,
          };
          console.log("Login data:", loginData);

          const response = await api.authentication.loginResponse(loginData);
          console.log("API Response:", response);
          const user = response;

          if (!response || response.success !== true) {
            console.error("Unsuccessful login:", response?.message);
            throw new Error(response?.message || "Unsuccessful login");
          } else {
            console.log("Successful login:", response.user);
            return user;
          }
        } catch (error) {
          console.error("Error occurred:", error);
          throw error;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      console.log("Token:", token);
      session = token;
      console.log("Session:", session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
