import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/model/user-model";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        try {
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }

          const isMatch = credentials.password === user.password

          if (!isMatch) {
            return null;
          }

          return { id: user._id, email: user.email, name: user.name };
        } catch (error) {
          throw new Error("Failed to authorize user");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
};
