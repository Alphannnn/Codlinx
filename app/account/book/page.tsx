import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";
import { listAllMeetings, listAvailability, listBlockedSlots } from "../../lib/data";
import { generateSlots } from "../../lib/slot-utils";
import BookingClient from "./BookingClient";

export default async function BookPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account/book");

  const [availability, blocked, allMeetings] = await Promise.all([
    listAvailability(),
    listBlockedSlots(),
    listAllMeetings(),
  ]);

  const slots = generateSlots({
    availability,
    blocked,
    meetings: allMeetings,
    days: 21,
  });

  return (
    <BookingClient
      user={{
        email: user.email,
        fullName: user.fullName,
      }}
      slots={slots}
    />
  );
}
