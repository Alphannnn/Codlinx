import LegalLayout from "../components/LegalLayout";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Codlinx collects, uses, and protects personal data — written in plain English.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy"
      highlight="Policy."
      description="How we collect, use, and protect personal data — written in plain English. Codlinx Studio Ltd is the data controller for codlinx.com."
      lastUpdated="May 1, 2026"
      sections={[
        {
          id: "who-we-are",
          title: "Who we are",
          body: (
            <>
              <p>
                Codlinx Studio Ltd (&quot;Codlinx&quot;, &quot;we&quot;,
                &quot;us&quot;) is a private company registered in England &amp;
                Wales. Our registered address is on file with Companies House.
                For any privacy enquiry, write to{" "}
                <a href="mailto:privacy@codlinx.com">privacy@codlinx.com</a>.
              </p>
            </>
          ),
        },
        {
          id: "what-we-collect",
          title: "What we collect",
          body: (
            <>
              <p>We collect only what we need to run our business:</p>
              <ul>
                <li>
                  <strong>Contact info you give us</strong> — name, email,
                  company, role, and the content of your enquiry, when you fill
                  out the contact form or email us.
                </li>
                <li>
                  <strong>Account info</strong> — email and authentication
                  data, when you sign in to a client portal.
                </li>
                <li>
                  <strong>Technical telemetry</strong> — IP address, browser,
                  device, and pages viewed, via privacy-respecting analytics.
                </li>
              </ul>
              <p>
                We do not knowingly collect data from children under 16. If you
                believe we have, contact us and we will delete it.
              </p>
            </>
          ),
        },
        {
          id: "how-we-use-it",
          title: "How we use it",
          body: (
            <>
              <ul>
                <li>To reply to your enquiry and run the engagement.</li>
                <li>To send transactional emails and invoices.</li>
                <li>
                  To understand which pages are useful (aggregated analytics —
                  not individual tracking).
                </li>
                <li>To meet legal and tax obligations.</li>
              </ul>
              <p>
                We do not sell your personal data. We do not use it to train AI
                models.
              </p>
            </>
          ),
        },
        {
          id: "lawful-basis",
          title: "Lawful basis (UK/EU)",
          body: (
            <>
              <p>
                We rely on the following lawful bases under UK GDPR / EU GDPR:
              </p>
              <ul>
                <li>
                  <strong>Legitimate interest</strong> — for replying to
                  enquiries and running our business.
                </li>
                <li>
                  <strong>Contract</strong> — for delivering engagements.
                </li>
                <li>
                  <strong>Consent</strong> — for any optional marketing emails
                  or non-essential cookies.
                </li>
                <li>
                  <strong>Legal obligation</strong> — for tax, accounting, and
                  regulatory compliance.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "sharing",
          title: "Who we share it with",
          body: (
            <>
              <p>
                We share data only with sub-processors that help us run the
                business: cloud hosting (AWS / Vercel), email delivery, CRM,
                accounting, and analytics. Each is bound by a data processing
                agreement. A current list is available on request.
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          title: "Cookies",
          body: (
            <>
              <p>
                We use a small number of cookies. Essential cookies are needed
                for the site to function. Analytics cookies are loaded only
                with your consent and are aggregated, never used to identify
                individuals.
              </p>
            </>
          ),
        },
        {
          id: "your-rights",
          title: "Your rights",
          body: (
            <>
              <p>You can ask us to:</p>
              <ul>
                <li>Access the personal data we hold about you.</li>
                <li>Correct it if it&apos;s wrong.</li>
                <li>Delete it (subject to legal retention).</li>
                <li>Stop processing it for marketing.</li>
                <li>Export it in a portable format.</li>
              </ul>
              <p>
                Write to{" "}
                <a href="mailto:privacy@codlinx.com">privacy@codlinx.com</a>.
                We respond within 30 days. You also have the right to complain
                to the ICO (
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ico.org.uk
                </a>
                ).
              </p>
            </>
          ),
        },
        {
          id: "retention",
          title: "How long we keep it",
          body: (
            <p>
              We keep contact-form submissions for up to 24 months. Client
              records for as long as the engagement is active, plus 7 years
              after for tax. Analytics data is aggregated and not retained at
              the individual level.
            </p>
          ),
        },
        {
          id: "transfers",
          title: "International transfers",
          body: (
            <p>
              Some of our sub-processors are based outside the UK/EU. We rely
              on UK IDTA / EU SCCs and adequacy decisions where applicable.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: (
            <p>
              We may update this policy from time to time. Material changes
              will be communicated by email to existing clients. The
              &quot;Last updated&quot; date at the top reflects the most
              recent revision.
            </p>
          ),
        },
      ]}
    />
  );
}
