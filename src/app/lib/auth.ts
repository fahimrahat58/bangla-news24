import { betterAuth } from "better-auth";
import { Resend } from "resend";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const resend = new Resend(process.env.RESEND_API_KEY);

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL!);
const db = client.db("bangla-news247");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

    sendResetPassword: async ({ user, url }) => {
      try {
        const { data, error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: user.email,
          subject: "Reset your password - Bangla News 24",
          html: `
            <h2>Hello ${user.name}!</h2>

            <p>
              We received a request to reset your Bangla News 24 password.
            </p>

            <p>
              Click the button below to create a new password:
            </p>

            <a
              href="${url}"
              style="
                display:inline-block;
                padding:12px 20px;
                background:#b91c1c;
                color:white;
                text-decoration:none;
                border-radius:6px;
              "
            >
              Reset Password
            </a>

            <p>
              If you did not request a password reset, you can safely ignore
              this email.
            </p>
          `,
        });

        if (error) {
          console.error("RESET PASSWORD EMAIL ERROR:", error);
          throw new Error(error.message);
        }

        console.log("RESET PASSWORD EMAIL SENT:", data);
      } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        throw error;
      }
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,

    sendVerificationEmail: async ({ user, url }) => {
      try {
        const { data, error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: user.email,
          subject: "Verify your email - Bangla News 24",
          html: `
            <h2>Welcome ${user.name}!</h2>

            <p>Your Bangla News 24 account has been created.</p>

            <p>Please click the button below to verify your email:</p>

            <a
              href="${url}"
              style="
                display:inline-block;
                padding:12px 20px;
                background:#b91c1c;
                color:white;
                text-decoration:none;
                border-radius:6px;
              "
            >
              Verify Email
            </a>

            <p>This verification link will expire in 1 hour.</p>
          `,
        });

        if (error) {
          console.error("RESEND ERROR:", error);
          throw new Error(error.message);
        }

        console.log("VERIFICATION EMAIL SENT:", data);
      } catch (error) {
        console.error("VERIFICATION EMAIL ERROR:", error);
        throw error;
      }
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});