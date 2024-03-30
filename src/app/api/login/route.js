import SignIn from "@/app/api/auth/email-signin";
import { getCsrfToken } from "next-auth/react";

export default function LoginPage({ csrfToken }) {
  return (
    <div>
      <h1>Connectez-vous à votre compte</h1>
      <SignIn csrfToken={csrfToken} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
