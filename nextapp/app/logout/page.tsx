import { signOut } from "@/lib/auth";

export default function LogoutPage() {
  return (
    <div className="inner">
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit" className="button">Log out</button>
      </form>
    </div>
  );
}
