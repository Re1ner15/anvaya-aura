import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface PilotApplicationRequest {
  propertyName: string;
  propertyType: string;
  rooms: string;
  monthlyEnergy: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: PilotApplicationRequest = await req.json();

    if (!data.propertyName || !data.name || !data.email) {
      throw new Error("Missing required fields");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email address");
    }
    if (data.name.length > 200 || data.email.length > 255 || data.propertyName.length > 300) {
      throw new Error("Input exceeds maximum length");
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const htmlBody = `
      <h2>New Pilot Program Application</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Property Name</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.propertyName)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Property Type</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.propertyType || 'Not provided')}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Number of Rooms</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.rooms || 'Not provided')}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Monthly Energy Spend</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.monthlyEnergy || 'Not provided')}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Contact Name</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.phone || 'Not provided')}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Interest</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.interest || 'Not provided')}</td></tr>
      </table>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Neev Pilot <onboarding@resend.dev>",
        to: ["director@anvayaenertech.in"],
        subject: `Pilot Application: ${escapeHtml(data.propertyName)} - ${escapeHtml(data.name)}`,
        html: htmlBody,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Resend error:", result);
      throw new Error(result.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Pilot application error:", { message: error.message, stack: error.stack, timestamp: new Date().toISOString() });
    return new Response(
      JSON.stringify({ error: "Unable to process your request. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
