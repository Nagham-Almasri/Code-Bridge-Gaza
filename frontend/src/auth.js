// import CredentialsProvider from "next-auth/providers/credentials";
// const nextAuthConfig = {
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize:async (credentials) => {
//         const data = await fetch('http://127.0.0.1:3000/auth/login' , {
//             method:'post', 
//             body: JSON.stringify({email:credentials?.email , password:credentials?.password}),
//             headers:{
//                 'content-type':'application/json'
//             }
//         })

//         const payload = await data.json()
//         console.log('payload', payload)
        
//       },
//     }),
//   ],
//   pages: { signIn: "/login" },
// };
// export default nextAuthConfig;
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {

      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default nextAuthConfig;