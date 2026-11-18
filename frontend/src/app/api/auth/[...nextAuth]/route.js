const { default: nextAuthConfig } = require("@/auth");
const { default: NextAuth } = require("next-auth");

const handler = NextAuth(nextAuthConfig)

export  {handler as GET , handler as POST}