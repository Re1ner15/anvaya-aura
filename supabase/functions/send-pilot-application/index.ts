import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: PilotApplicationRequest = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const htmlBody = `
      <h2>New Pilot Program Application</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Property Name</td><td style="padding: 8px; border: 1px solid #ddd;">${data.propertyName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Property Type</td><td style="padding: 8px; border: 1px solid #ddd;">${data.propertyType}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Number of Rooms</td><td style="padding: 8px; border: 1px solid #ddd;">${data.rooms}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Monthly Energy Spend</td><td style="padding: 8px; border: 1px solid #ddd;">${data.monthlyEnergy || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Contact Name</td><td style="padding: 8px; border: 1px solid #ddd;">${data.name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || 'Not provided'}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Interest</td><td style="padding: 8px; border: 1px solid #ddd;">${data.interest || 'Not provided'}</td></tr>
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
        subject: `Pilot Application: ${data.propertyName} - ${data.name}`,
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
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
