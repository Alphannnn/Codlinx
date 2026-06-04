import { listAvailability } from "../../lib/data";
import AvailabilityAdminClient from "./AvailabilityAdminClient";

export const metadata = {
  title: "Admin · Availability",
  robots: { index: false, follow: false },
};

export default async function AdminAvailabilityPage() {
  const windows = await listAvailability();
  return <AvailabilityAdminClient initial={windows} />;
}
