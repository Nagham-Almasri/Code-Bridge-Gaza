import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
const nextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          const data = await fetch(`${process.env.API}auth/login`, {
            method: "post",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-type": "application/json" },
          });
          const payload = await data.json();

          if (!data?.ok) {
            return null;
          } else {
            const { sub } = jwtDecode(payload?.accessToken);

            return {
              id: sub,
              token: payload?.accessToken,
              message: payload?.message,
            };
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.userId = user.id;
      }

      return token;
    },

    secret: process.env.NEXTAUTH_SECRET,
  },
};
export default nextAuthConfig;
