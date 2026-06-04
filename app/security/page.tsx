import LegalLayout from "../components/LegalLayout";

export const metadata = {
  title: "Security",
  description:
    "How Codlinx protects client data and code — encryption, access control, audits, and incident response.",
};

export default function SecurityPage() {
  return (
    <LegalLayout
      eyebrow="Trust"
      title="Security at"
      highlight="Codlinx."
      description="How we protect client code and data. The short version: encryption everywhere, least-privilege access, written runbooks, and a security review on every release."
      lastUpdated="May 1, 2026"
      sections={[
        {
          id: "program",
          title: "Our security program",
          body: (
            <p>
              Security at Codlinx is owned by our Director of Cloud &amp;
              Platform. We follow a written information security policy
              reviewed quarterly, with controls aligned to ISO 27001 and SOC
              2. Mapping evidence is available on request under NDA.
            </p>
          ),
        },
        {
          id: "data-protection",
          title: "Data protection",
          body: (
            <>
              <ul>
                <li>
                  <strong>In transit:</strong> TLS 1.2+ on every endpoint.
                  HSTS preloaded.
                </li>
                <li>
                  <strong>At rest:</strong> AES-256 across managed databases,
                  object storage, and backups.
                </li>
                <li>
                  <strong>Secrets:</strong> never in source. Managed via cloud
                  KMS, rotated quarterly.
                </li>
                <li>
                  <strong>Backups:</strong> point-in-time recovery on
                  production data, restored quarterly as a fire-drill.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "access",
          title: "Access control",
          body: (
            <>
              <ul>
                <li>SSO with mandatory MFA across every internal system.</li>
                <li>
                  Least-privilege role-based access. Production access is
                  break-glass, logged, and time-bound.
                </li>
                <li>
                  Hardware-bound device certificates and full-disk
                  encryption on every laptop.
                </li>
                <li>
                  Quarterly access reviews. Off-boarding revokes access on
                  the same day.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "engineering",
          title: "Secure engineering",
          body: (
            <>
              <ul>
                <li>
                  Mandatory code review with a second senior engineer before
                  merge to main.
                </li>
                <li>
                  Static analysis (CodeQL / Semgrep) and dependency scanning
                  (Dependabot / Snyk) on every PR.
                </li>
                <li>Secrets scanning blocks merges with leaked credentials.</li>
                <li>
                  Container images scanned and signed; only signed images
                  reach production.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "infrastructure",
          title: "Infrastructure",
          body: (
            <p>
              We deploy on AWS, GCP, or Vercel — whichever fits the
              engagement. Network segmentation, private VPCs, WAFs, and
              managed DDoS protection are the default. All infrastructure is
              defined as code (Terraform / Pulumi); manual changes are
              audited.
            </p>
          ),
        },
        {
          id: "monitoring",
          title: "Logging &amp; monitoring",
          body: (
            <p>
              Centralised log aggregation with 90-day retention by default
              (extended on request). Alerting for authentication failures,
              privilege escalation, and anomalous activity. On-call rotations
              respond to security alerts within 15 minutes.
            </p>
          ),
        },
        {
          id: "incident-response",
          title: "Incident response",
          body: (
            <p>
              We maintain a written incident response plan. Severity 1
              incidents trigger immediate notification to affected clients
              and a post-incident review within 5 working days. Tabletop
              exercises are run twice a year.
            </p>
          ),
        },
        {
          id: "people",
          title: "People",
          body: (
            <p>
              Every employee and contractor signs an NDA and completes
              security training on day one, with annual refreshers.
              Background checks are run for roles with production access.
            </p>
          ),
        },
        {
          id: "compliance",
          title: "Compliance",
          body: (
            <p>
              We align with ISO 27001 and SOC 2 Type II. We support
              engagements with HIPAA, PCI-DSS, and GDPR requirements; the
              specific controls applied are documented in the Statement of
              Work and DPA.
            </p>
          ),
        },
        {
          id: "report",
          title: "Reporting a vulnerability",
          body: (
            <p>
              Found something? Email{" "}
              <a href="mailto:security@codlinx.com">security@codlinx.com</a>{" "}
              with details and proof-of-concept. We acknowledge within 24
              hours and aim to triage within 3 working days. We do not
              pursue researchers who act in good faith and follow
              responsible disclosure.
            </p>
          ),
        },
      ]}
    />
  );
}
