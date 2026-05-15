import { signOut } from "@/lib/auth";
import { getT } from "@/lib/i18n.server";

export default async function LogoutPage() {
  const { t } = await getT();
  return (
    <div className="inner">
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit" className="button">{t("logout.button")}</button>
      </form>
    </div>
  );
}
