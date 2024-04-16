import Email from "@/email/devis/email";

export async function sendVerificationRequest(params) {
  const { identifier, url, provider } = params;
  const { host } = new URL(url);

  try {
    await Email.getTemplate("email-connexion", {
      to: identifier,
      subject: `Connexion à votre compte ${host}`,
      metadata: {
        name: "Utilisateur",
        url,
        site: host,
      },
    });
  } catch (e) {
    throw new Error("Le message n'est pas parti", e);
  }
}
