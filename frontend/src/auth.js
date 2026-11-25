import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
const nextAuthConfig = {
   secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

    async authorize(credentials) {
  try {
    const response = await fetch(`${process.env.API}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials?.email,
        password: credentials?.password,
      }),
    });

    const payload = await response.json();

    console.log("LOGIN STATUS:", response.status);
    console.log("LOGIN OK:", response.ok);
    console.log("LOGIN MESSAGE:", payload?.message);
    console.log("RESPONSE KEYS:", Object.keys(payload || {}));

    if (!response.ok) {
      return null;
    }

    if (!payload?.accessToken) {
      console.error("Access token missing from response");
      return null;
    }

    const { sub } = jwtDecode(payload.accessToken);

    return {
      id: String(sub),
      token: payload.accessToken,
    };

  } catch (error) {
    console.error("AUTHORIZE ERROR:", error);
    throw error;
  }
}
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
        console.log(user , 'user');
        console.log(token , 'token');
        
      }

      return token;
    },

   
  },
};
export default nextAuthConfig;
