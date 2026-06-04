import LegalLayout from "../components/LegalLayout";

export const metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Codlinx website and our engagements.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of"
      highlight="Service."
      description="These terms govern your use of codlinx.com. Engagement-specific terms are agreed in a separate Statement of Work."
      lastUpdated="May 1, 2026"
      sections={[
        {
          id: "agreement",
          title: "Agreement",
          body: (
            <p>
              By using codlinx.com (the &quot;Site&quot;) you agree to these
              terms. If you do not agree, please do not use the Site. Engaging
              Codlinx for services creates a separate written agreement; these
              terms govern only your use of this Site.
            </p>
          ),
        },
        {
          id: "use-of-site",
          title: "Use of the Site",
          body: (
            <>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Site in a way that breaches any law.</li>
                <li>
                  Attempt to gain unauthorised access to any part of the Site
                  or related infrastructure.
                </li>
                <li>Scrape or republish content without permission.</li>
                <li>
                  Submit content that is unlawful, defamatory, or infringes
                  third-party rights.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "ip",
          title: "Intellectual property",
          body: (
            <p>
              All content on the Site — text, design, code, marks, and
              imagery — is owned by Codlinx Studio Ltd or its licensors. You
              may view and share content for non-commercial use with
              attribution; all other use requires our written permission.
              Engagement deliverables are owned by clients per the relevant
              Statement of Work.
            </p>
          ),
        },
        {
          id: "third-party-links",
          title: "Third-party links",
          body: (
            <p>
              The Site may link to third-party websites. We do not control
              and are not responsible for the content or practices of those
              sites.
            </p>
          ),
        },
        {
          id: "no-advice",
          title: "No advice",
          body: (
            <p>
              Information on the Site is for general purposes only. Nothing
              on the Site constitutes legal, financial, or professional
              advice. Engagement deliverables are advice; the Site is not.
            </p>
          ),
        },
        {
          id: "warranty",
          title: "Warranty disclaimer",
          body: (
            <p>
              The Site is provided &quot;as is&quot; without warranty of any
              kind. We do not warrant that the Site will be uninterrupted or
              error-free.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Limitation of liability",
          body: (
            <p>
              To the maximum extent permitted by law, Codlinx is not liable
              for any indirect, incidental, special, or consequential damages
              arising from your use of the Site. Nothing in these terms
              excludes our liability for death or personal injury caused by
              negligence, or for fraud.
            </p>
          ),
        },
        {
          id: "indemnity",
          title: "Indemnity",
          body: (
            <p>
              You agree to indemnify Codlinx against any losses arising from
              your breach of these terms or your misuse of the Site.
            </p>
          ),
        },
        {
          id: "governing-law",
          title: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of England &amp; Wales.
              The courts of England &amp; Wales have exclusive jurisdiction
              for any dispute arising out of or in connection with them.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes",
          body: (
            <p>
              We may update these terms from time to time. Material changes
              will be highlighted at the top of this page. Continued use of
              the Site after a change constitutes acceptance.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about these terms? Write to{" "}
              <a href="mailto:legal@codlinx.com">legal@codlinx.com</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
