import type { APIRoute } from "astro";
import { Resend } from "resend";

export const resendClient = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
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
  const { data, error } = await resendClient.emails.send({
    from: "Página Web <onboarding@resend.dev>",
    to: ["javcor3@gmail.com"],
    subject: "Formulario de Contacto Página web",
    html: emailBody,
  });

  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: data.id,
    }),
    { status: 200 }
  );
};
