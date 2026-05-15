"use client";

import { usePathname } from "next/navigation";
import { useT } from "@/app/components/TranslationProvider";

interface NavLinksProps {
  isLoggedIn: boolean;
  isAdmin?: boolean;
}

export default function NavLinks({ isLoggedIn, isAdmin }: NavLinksProps) {
  const path = usePathname();
  const { t } = useT();
  const a = (href: string) => path.startsWith(href) ? "nav__main_link--active" : "";

  if (!isLoggedIn) {
    return (
      <>
        <li className="nav__item">
          <a className={`nav__main_link ${a("/studies")}`} href="/studies">
            <h6>{t("nav.studies")}</h6>
          </a>
        </li>
        <li className="nav__item">
          <a className={`nav__main_link ${a("/docs")}`} href="/docs/intro">
            <h6>{t("nav.documentation")}</h6>
          </a>
        </li>
        <li className="nav__item">
          <a className={`nav__main_link ${a("/news")}`} href="/news/intro">
            <h6>{t("nav.news")}</h6>
          </a>
        </li>
        <li className="nav__item">
          <a className={`nav__main_link ${path === "/" ? "nav__main_link--active" : ""}`} href="/">
            <h6>Samply</h6>
          </a>
        </li>
      </>
    );
  }

  const notifActive = path.startsWith("/notifications") || path.startsWith("/scheduled") || path.startsWith("/history") || path.startsWith("/createschedule");
  const participantsActive = path.startsWith("/participants") || path.startsWith("/groups") || path.startsWith("/invitations") || path.startsWith("/users");

  return (
    <div className="navigation">
      <nav>
        <ul>
          <li>
            <a className="nav__link" href="/">Samply</a>
            <ul>
              <li><a className={`nav__link ${a("/news")}`} href="/news/intro">{t("nav.news")}</a></li>
              <li><a className={`nav__link ${a("/docs")}`} href="/docs/intro">{t("nav.documentation")}</a></li>
              <li><a className={`nav__link ${a("/help")}`} href="/help">{t("nav.help")}</a></li>
              <li><a className={`nav__link ${a("/about")}`} href="/about">{t("nav.about")}</a></li>
            </ul>
          </li>
          <li>
            <a className={`nav__link ${a("/projects")}`} href="/projects">{t("nav.studies")}</a>
            <ul>
              <li><a className={`nav__link ${a("/newproject")}`} href="/newproject">{t("nav.newStudy")}</a></li>
              <li><a className={`nav__link ${a("/projects")}`} href="/projects">{t("nav.myStudies")}</a></li>
            </ul>
          </li>
          <li>
            <a className={`nav__link ${notifActive ? "nav__main_link--active" : ""}`} href="/notifications">
              {t("nav.notifications")}
            </a>
            <ul>
              <li><a className={`nav__link ${a("/notifications")}`} href="/notifications">{t("nav.new")}</a></li>
              <li><a className={`nav__link ${a("/scheduled")}`} href="/scheduled">{t("nav.scheduled")}</a></li>
              <li><a className={`nav__link ${a("/history")}`} href="/history">{t("nav.sent")}</a></li>
            </ul>
          </li>
          <li>
            <a className={`nav__link ${participantsActive ? "nav__main_link--active" : ""}`} href="/participants">
              {t("nav.participantsLink")}
            </a>
            <ul>
              <li><a className={`nav__link ${a("/participants")}`} href="/participants">{t("nav.overview")}</a></li>
              <li><a className={`nav__link ${a("/groups")}`} href="/groups">{t("nav.groupsLink")}</a></li>
              <li><a className={`nav__link ${a("/invitations")}`} href="/invitations">{t("nav.invitationsLink")}</a></li>
            </ul>
          </li>
          <li>
            <a className={`nav__link ${a("/account")}`} href="/account">{t("nav.account")}</a>
            <ul>
              <li><a className={`nav__link ${a("/account")}`} href="/account">{t("nav.edit")}</a></li>
              <li><a className="nav__link" href="/logout">{t("nav.logOut")}</a></li>
            </ul>
          </li>
          {isAdmin && (
            <li>
              <a className={`nav__link ${a("/admin")}`} href="/admin/studies">{t("nav.admin")}</a>
              <ul>
                <li><a className={`nav__link ${a("/admin/studies")}`} href="/admin/studies">{t("nav.studies")}</a></li>
                <li><a className={`nav__link ${a("/admin/users")}`} href="/admin/users">{t("nav.users")}</a></li>
                <li><a className={`nav__link ${a("/admin/notifications")}`} href="/admin/notifications">{t("nav.notifications")}</a></li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
