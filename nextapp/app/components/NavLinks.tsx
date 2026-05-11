"use client";

import { usePathname } from "next/navigation";

interface NavLinksProps {
  isLoggedIn: boolean;
  isAdmin?: boolean;
}

export default function NavLinks({ isLoggedIn, isAdmin }: NavLinksProps) {
  const path = usePathname();
  const a = (href: string) => path.startsWith(href) ? "nav__main_link--active" : "";

  if (!isLoggedIn) {
    return (
      <>
        <li className="nav__item">
          <a className={`nav__main_link ${a("/studies")}`} href="/studies">
            <h6>Studies</h6>
          </a>
        </li>
        <li className="nav__item">
          <a className={`nav__main_link ${a("/docs")}`} href="/docs/intro">
            <h6>Documentation</h6>
          </a>
        </li>
        <li className="nav__item">
          <a className={`nav__main_link ${a("/news")}`} href="/news/intro">
            <h6>News</h6>
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
              <li><a className={`nav__link ${a("/news")}`} href="/news/intro">News</a></li>
              <li><a className={`nav__link ${a("/docs")}`} href="/docs/intro">Documentation</a></li>
              <li><a className={`nav__link ${a("/help")}`} href="/help">Help</a></li>
              <li><a className={`nav__link ${a("/about")}`} href="/about">About</a></li>
            </ul>
          </li>
          <li>
            <a className={`nav__link ${a("/projects")}`} href="/projects">Studies</a>
            <ul>
              <li><a className={`nav__link ${a("/newproject")}`} href="/newproject">New study</a></li>
              <li><a className={`nav__link ${a("/projects")}`} href="/projects">My studies</a></li>
            </ul>
          </li>
          <li>
            <a className={`nav__link ${notifActive ? "nav__main_link--active" : ""}`} href="/notifications">
              Notifications
            </a>
            <ul>
              <li><a className={`nav__link ${a("/notifications")}`} href="/notifications">New</a></li>
              <li><a className={`nav__link ${a("/scheduled")}`} href="/scheduled">Scheduled</a></li>
              <li><a className={`nav__link ${a("/history")}`} href="/history">Sent</a></li>
            </ul>
          </li>
          <li>
            <a className={`nav__link ${participantsActive ? "nav__main_link--active" : ""}`} href="/participants">
              Participants
            </a>
            <ul>
              <li><a className={`nav__link ${a("/participants")}`} href="/participants">Overview</a></li>
              <li><a className={`nav__link ${a("/groups")}`} href="/groups">Groups</a></li>
              <li><a className={`nav__link ${a("/invitations")}`} href="/invitations">Invitations</a></li>
            </ul>
          </li>
          <li>
            <a className={`nav__link ${a("/account")}`} href="/account">Account</a>
            <ul>
              <li><a className={`nav__link ${a("/account")}`} href="/account">Edit</a></li>
              <li><a className="nav__link" href="/logout">Log out</a></li>
            </ul>
          </li>
          {isAdmin && (
            <li>
              <a className={`nav__link ${a("/admin")}`} href="/admin/studies">Admin</a>
              <ul>
                <li><a className={`nav__link ${a("/admin/studies")}`} href="/admin/studies">Studies</a></li>
                <li><a className={`nav__link ${a("/admin/users")}`} href="/admin/users">Users</a></li>
                <li><a className={`nav__link ${a("/admin/notifications")}`} href="/admin/notifications">Notifications</a></li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
