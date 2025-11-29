import emailjs from "@emailjs/browser";

// Initialize EmailJS
if (typeof window !== "undefined") {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  query: string;
  agentName: string;
}

export async function submitForm(data: FormData): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("EmailJS can only be used in the browser");
  }

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

  if (!serviceId || !templateId) {
    console.warn("EmailJS credentials not configured. Skipping email send.");
    return;
  }

  try {
    await emailjs.send(serviceId, templateId, {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      message: data.query,
      agent_name: data.agentName,
      to_email: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL || "",
    });
  } catch (error) {
    console.error("EmailJS error:", error);
    throw error;
  }
}

