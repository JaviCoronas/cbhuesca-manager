import type { APIRoute } from "astro";
import { Resend } from "resend";

export const resendClient = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");
  if (!name || !email || !message || !phone) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos en el formulario",
      }),
      { status: 400 }
    );
  }
  const emailBody = `
    <strong>Nombre:</strong> ${name}<br>
    <strong>Email:</strong> ${email}<br>
    <strong>Teléfono:</strong> ${phone}<br>
    <strong>Mensaje:</strong> ${message}
  `;
  const recipients = [email] as string[];
  const { data } = await resendClient.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: recipients,
    bcc: ["javcor3@gmail.com"],
    subject: "Formulario de contacto Web",
    html: emailBody as string,
  });

  return new Response(
    JSON.stringify({
      message: data.id,
    }),
    { status: 200 }
  );
};
