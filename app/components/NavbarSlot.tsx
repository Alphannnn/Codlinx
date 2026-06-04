import Navbar from "./Navbar";
import { getCurrentUser } from "../lib/auth";

export default async function NavbarSlot() {
  const user = await getCurrentUser();
  return (
    <Navbar
      user={
        user
          ? {
              email: user.email,
              fullName: user.fullName,
              isAdmin: user.isAdmin,
            }
          : null
      }
    />
  );
}
