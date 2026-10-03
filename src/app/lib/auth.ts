import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL!);

const db = client.db("bangla-news24");

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Reset your password",
        html: `
          <h2>Password Reset</h2>

          <p>Hello ${user.name},</p>

          <p>
            You requested to reset your password.
            Click the button below to create a new password.
          </p>

          <a
            href="${url}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background-color: #c00000;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            Reset Password
          </a>

          <p>
            This link will expire soon.
          </p>

          <p>
            If you did not request this, you can safely ignore this email.
          </p>
        `,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,

    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Verify your email",
        html: `
          <h2>Welcome ${user.name}!</h2>

          <p>Please verify your email address.</p>

          <a
            href="${url}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background-color: #c00000;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            Verify Email
          </a>

          <p>This link expires in 1 hour.</p>
        `,
      });
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});