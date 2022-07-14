import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "../../../services/axios";

const credentialInstance = CredentialsProvider({
  async authorize(credentials) {
    const { email, password } = credentials;

    const res = await axiosInstance.post("/users/login", { email, password });

    //   {
    //     "user_id": 43,
    //     "username": "rochafi",
    //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0MywidXNlcm5hbWUiOiJyb2NoYWZpIiwiaWF0IjoxNjU2OTk0MTEzfQ.a6f5A4F1tN-NjSRGuOVEFkNus7Nsn_MLWprx0qtIZWQ"
    //  }
    const user = res.data.data.result;

    return user;
  },
});

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [credentialInstance],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});
