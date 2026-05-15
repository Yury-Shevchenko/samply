import { getT } from "@/lib/i18n.server";

export const metadata = { title: "Help — Samply" };

export default async function HelpPage() {
  const { t } = await getT();
  return (
    <div className="inner">
      <p />
      <div className="card">
        <div className="card-message">
          <h5>
            <div className="headerLink">{t("help.question")}</div>
          </h5>
          <form action="/faq" method="POST">
            <textarea name="question" placeholder={t("help.placeholder")} required />
            <input type="submit" value={t("help.send")} className="button" />
          </form>
        </div>
      </div>
    </div>
  );
}
