import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "contact@metabrainlab.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://metabrainlab.com";

interface SendEmailOptions {
  to?: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  const recipient = to || NOTIFY_EMAIL;

  const { error } = await resend.emails.send({
    from: `MetaBrain Lab <${FROM_EMAIL}>`,
    to: recipient,
    subject,
    html,
  });

  if (error) {
    console.error("[Email] Failed to send:", error);
    throw new Error(`Email delivery failed: ${error.message}`);
  }
}

// ── Helpers ──

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function timestamp(): string {
  return new Date().toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/London",
  });
}

// Logo hosted publicly — works in Gmail, Outlook, Apple Mail
// Update this URL once the site is deployed with a PNG version
const LOGO_URL = process.env.EMAIL_LOGO_URL || "";

function logoBlock(): string {
  if (LOGO_URL) {
    return `<img src="${LOGO_URL}" alt="MetaBrain Lab" width="180" height="40" style="display:block;margin:0 auto 8px" />`;
  }
  // Text fallback with brand styling (works everywhere)
  return `
    <div style="text-align:center;margin-bottom:8px">
      <div style="display:inline-block;width:48px;height:48px;border:2px solid #2DD4BF;border-radius:50%;line-height:48px;text-align:center;margin-bottom:12px">
        <span style="font-size:22px;font-weight:700;color:#2DD4BF;font-family:Georgia,serif">m</span>
      </div>
      <div style="font-size:18px;font-weight:700;color:#F8FAFC;letter-spacing:4px;text-transform:uppercase">METABRAIN</div>
      <div style="font-size:11px;font-weight:600;color:#94A3B8;letter-spacing:6px;text-transform:uppercase;margin-top:2px">LABS</div>
    </div>`;
}

function row(label: string, value: string | undefined): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:12px 16px;font-size:12px;font-weight:600;color:#64748B;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;vertical-align:top;border-bottom:1px solid rgba(255,255,255,0.04)">${escapeHtml(label)}</td>
      <td style="padding:12px 16px;font-size:14px;color:#F8FAFC;border-bottom:1px solid rgba(255,255,255,0.04)">${escapeHtml(value)}</td>
    </tr>`;
}

function badge(text: string, color: string): string {
  return `<span style="display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;background:${color};color:#0A0F1C">${escapeHtml(text)}</span>`;
}

function emailWrapper(
  title: string,
  subtitle: string,
  badgeText: string,
  badgeColor: string,
  rows: string,
  footer?: string,
): string {
  const now = timestamp();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#080C18;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif">
  <div style="max-width:620px;margin:0 auto;padding:40px 16px">

    <!-- Header -->
    <div style="text-align:center;padding:32px 0">
      ${logoBlock()}
      <p style="margin:12px 0 0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#64748B">Engineering the Future of Human Intelligence</p>
    </div>

    <!-- Main Card -->
    <div style="background:linear-gradient(180deg,#1A2540 0%,#151D32 100%);border:1px solid rgba(45,212,191,0.15);border-radius:16px;overflow:hidden">

      <!-- Card Header -->
      <div style="padding:28px 32px 20px;border-bottom:1px solid rgba(255,255,255,0.06)">
        <div style="margin-bottom:12px">${badge(badgeText, badgeColor)}</div>
        <h1 style="margin:0 0 4px;font-size:24px;font-weight:700;color:#F8FAFC">${escapeHtml(title)}</h1>
        <p style="margin:0;font-size:13px;color:#94A3B8">${escapeHtml(subtitle)}</p>
      </div>

      <!-- Card Body -->
      <div style="padding:8px 16px">
        <table style="width:100%;border-collapse:collapse">
          ${rows}
        </table>
      </div>

      <!-- Card Footer -->
      <div style="padding:16px 32px 24px;border-top:1px solid rgba(255,255,255,0.06)">
        <table style="width:100%;font-size:12px;color:#64748B">
          <tr>
            <td style="padding:4px 0">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#2DD4BF;margin-right:6px;vertical-align:middle"></span>
              Received: ${escapeHtml(now)} (GMT)
            </td>
          </tr>
          <tr>
            <td style="padding:4px 0">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#06B6D4;margin-right:6px;vertical-align:middle"></span>
              Source: metabrainlab.com
            </td>
          </tr>
        </table>
      </div>

      ${footer ? `
      <!-- Extra Footer -->
      <div style="padding:20px 32px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.04)">
        <p style="margin:0;font-size:13px;color:#94A3B8;line-height:1.6">${footer}</p>
      </div>` : ""}

    </div>

    <!-- Bottom Links -->
    <div style="text-align:center;padding:28px 0 12px">
      <a href="${SITE_URL}" style="color:#2DD4BF;font-size:12px;text-decoration:none;margin:0 10px">Website</a>
      <span style="color:#1E2A3E">|</span>
      <a href="${SITE_URL}/contact" style="color:#2DD4BF;font-size:12px;text-decoration:none;margin:0 10px">Contact</a>
      <span style="color:#1E2A3E">|</span>
      <a href="${SITE_URL}/privacy" style="color:#2DD4BF;font-size:12px;text-decoration:none;margin:0 10px">Privacy</a>
    </div>

    <p style="text-align:center;font-size:11px;color:#475569;margin:0">
      &copy; ${new Date().getFullYear()} MetaBrain Lab Ltd. All rights reserved.
    </p>
    <p style="text-align:center;font-size:10px;color:#334155;margin:8px 0 0">
      This is an automated notification. Please do not reply directly to this email.
    </p>

  </div>
</body>
</html>`;
}

// ── Email formatters ──

export function formatInvestorEmail(data: Record<string, unknown>): string {
  const rows = [
    row("Name", data.name as string),
    row("Email", data.email as string),
    row("Organisation", data.organisation as string),
    row("Role", data.role as string),
    row("Country", data.country as string),
    row("Investment Focus", data.investmentFocus as string),
    row("Message", data.message as string),
  ].join("");

  return emailWrapper(
    "New Investor Enquiry",
    `${data.name} from ${data.organisation} has submitted an investor enquiry.`,
    "Investor",
    "#2DD4BF",
    rows,
  );
}

export function formatScientificEmail(data: Record<string, unknown>): string {
  const rows = [
    row("Name", data.name as string),
    row("Email", data.email as string),
    row("Institution", data.institution as string),
    row("Field", data.field as string),
    row("Current Role", data.currentRole as string),
    row("Area of Interest", data.areaOfInterest as string),
    row("Statement", data.statement as string),
    row("CV / Profile", data.cvLink as string),
  ].join("");

  return emailWrapper(
    "New Scientific Collaboration Enquiry",
    `${data.name} from ${data.institution} has submitted a research collaboration request.`,
    "Scientific",
    "#06B6D4",
    rows,
  );
}

export function formatPartnershipEmail(data: Record<string, unknown>): string {
  const rows = [
    row("Name", data.name as string),
    row("Email", data.email as string),
    row("Organisation", data.organisation as string),
    row("Country", data.country as string),
    row("Partnership Type", data.partnershipType as string),
    row("Message", data.message as string),
  ].join("");

  return emailWrapper(
    "New Partnership Enquiry",
    `${data.name} from ${data.organisation} has submitted a partnership enquiry.`,
    "Partnership",
    "#8B5CF6",
    rows,
  );
}

export function formatNewsletterConfirmation(email: string): string {
  return emailWrapper(
    "Subscription Confirmed",
    "You have been subscribed to MetaBrain Lab updates.",
    "Newsletter",
    "#2DD4BF",
    row("Email", email),
    "You will receive occasional updates about MetaBrain Lab&rsquo;s research, milestones, and announcements. You can unsubscribe at any time by contacting us at contact@metabrainlab.com.",
  );
}
