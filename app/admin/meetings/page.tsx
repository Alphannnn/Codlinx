import { listAllMeetings } from "../../lib/data";
import MeetingsAdminClient from "./MeetingsAdminClient";

export const metadata = {
  title: "Admin · Meetings",
  robots: { index: false, follow: false },
};

export default async function AdminMeetingsPage() {
  const meetings = await listAllMeetings();
  return <MeetingsAdminClient initial={meetings} />;
}
