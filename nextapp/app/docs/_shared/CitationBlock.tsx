import { APP_VERSION, PLATFORM_VERSION } from "@/lib/version";
import type { Locale } from "@/lib/i18n";

/**
 * "How to cite Samply" — the single place the citation lives.
 *
 * The Summer 2026 cohort cited the platform five different ways across 31
 * reports: the peer-reviewed paper, "Shevchenko, 2020", "Samply GmbH (2025)",
 * "Shevchenko et al., 2026", and a bare URL. Nothing in the product had ever
 * stated the citation, so each group invented one. Publishing it here, once,
 * with the version alongside, is what makes the platform's use traceable.
 *
 * The reference itself and the DOI are never translated — they have to match
 * the reader's reference list verbatim. The framing sentence and the section
 * labels are; the translations were carried over from the citation block that
 * previously lived inside AboutContent, which this replaces.
 */

const DOI = "https://doi.org/10.3758/s13428-020-01527-9";

interface Strings {
  intro: string;
  publication: string;
  software: string;
  versionNote: string;
}

const S: Record<string, Strings> = {
  en: { intro: "If you use Samply in your research, please cite the original publication and the software version you ran:", publication: "Publication", software: "Software", versionNote: "The app version is shown on the About screen inside Samply Research; use the version your participants actually had installed if it differs." },
  de: { intro: "Wenn Sie Samply in Ihrer Forschung verwenden, zitieren Sie bitte die Originalpublikation und die von Ihnen eingesetzte Softwareversion:", publication: "Publikation", software: "Software", versionNote: "Die App-Version steht im Info-Bildschirm von Samply Research; verwenden Sie die Version, die Ihre Teilnehmenden tatsächlich installiert hatten, falls sie abweicht." },
  nl: { intro: "Als u Samply in uw onderzoek gebruikt, verzoeken wij u de originele publicatie en de gebruikte softwareversie te citeren:", publication: "Publicatie", software: "Software", versionNote: "De app-versie staat op het Over-scherm in Samply Research; gebruik de versie die uw deelnemers werkelijk hadden geïnstalleerd als die afwijkt." },
  fr: { intro: "Si vous utilisez Samply dans votre recherche, veuillez citer la publication originale ainsi que la version du logiciel utilisée :", publication: "Publication", software: "Logiciel", versionNote: "La version de l'application figure sur l'écran À propos dans Samply Research ; utilisez la version réellement installée par vos participants si elle diffère." },
  it: { intro: "Se si utilizza Samply nella propria ricerca, si prega di citare la pubblicazione originale e la versione del software utilizzata:", publication: "Pubblicazione", software: "Software", versionNote: "La versione dell'app è indicata nella schermata Informazioni di Samply Research; se differisce, usare la versione realmente installata dai partecipanti." },
  es: { intro: "Si utilizas Samply en tu investigación, cita la publicación original y la versión del software que ejecutaste:", publication: "Publicación", software: "Software", versionNote: "La versión de la aplicación aparece en la pantalla Acerca de dentro de Samply Research; si difiere, usa la versión que tus participantes tenían instalada." },
  pt: { intro: "Se você usar o Samply em sua pesquisa, cite a publicação original e a versão do software utilizada:", publication: "Publicação", software: "Software", versionNote: "A versão do aplicativo aparece na tela Sobre dentro do Samply Research; se for diferente, use a versão que seus participantes tinham instalada." },
  ru: { intro: "Если вы используете Samply в своих исследованиях, пожалуйста, цитируйте оригинальную публикацию и версию программы, которую вы использовали:", publication: "Публикация", software: "Программа", versionNote: "Версия приложения указана на экране «О программе» в Samply Research; если она отличается, используйте ту версию, которая была установлена у ваших участников." },
  pl: { intro: "Jeśli używasz Samply w swoich badaniach, prosimy o cytowanie oryginalnej publikacji oraz użytej wersji oprogramowania:", publication: "Publikacja", software: "Oprogramowanie", versionNote: "Wersja aplikacji jest widoczna na ekranie Informacje w Samply Research; jeśli się różni, podaj wersję faktycznie zainstalowaną przez uczestników." },
  tr: { intro: "Samply'ı araştırmanızda kullanıyorsanız, lütfen orijinal yayını ve kullandığınız yazılım sürümünü alıntılayın:", publication: "Yayın", software: "Yazılım", versionNote: "Uygulama sürümü Samply Research içindeki Hakkında ekranında görünür; farklıysa katılımcılarınızın gerçekten kurduğu sürümü kullanın." },
  zh: { intro: "如果您在研究中使用了 Samply，请引用原始发表文章以及您所使用的软件版本：", publication: "发表文章", software: "软件", versionNote: "应用版本显示在 Samply Research 的“关于”界面中；若与此处不同，请使用参与者实际安装的版本。" },
  ja: { intro: "Samply を研究で使用する場合は、元の出版物と実際に使用したソフトウェアのバージョンを引用してください：", publication: "出版物", software: "ソフトウェア", versionNote: "アプリのバージョンは Samply Research の「情報」画面に表示されます。異なる場合は、参加者が実際にインストールしていたバージョンを記載してください。" },
  ko: { intro: "연구에서 Samply를 사용하셨다면 원본 논문과 실제로 사용한 소프트웨어 버전을 함께 인용해 주시기 바랍니다:", publication: "논문", software: "소프트웨어", versionNote: "앱 버전은 Samply Research의 정보 화면에 표시됩니다. 다를 경우 참여자가 실제로 설치했던 버전을 사용하세요." },
  ar: { intro: "إذا كنت تستخدم Samply في بحثك، فيُرجى الاستشهاد بالمنشور الأصلي وبإصدار البرنامج الذي استخدمته:", publication: "منشور", software: "البرنامج", versionNote: "يظهر إصدار التطبيق في شاشة «حول» داخل Samply Research؛ وإن اختلف، فاستخدم الإصدار الذي كان مثبتًا فعليًا لدى المشاركين." },
};

const BOX: React.CSSProperties = {
  background: "var(--coral-soft)",
  borderLeft: "3px solid var(--coral)",
  borderRadius: "0 0.8rem 0.8rem 0",
  padding: "1.4rem 1.6rem",
  margin: "0.4rem 0 0",
};

const EYEBROW: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.95rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--coral)",
  marginBottom: "0.7rem",
};

const REFERENCE: React.CSSProperties = {
  margin: "0 0 0.8rem",
  fontSize: "1.3rem",
  lineHeight: 1.6,
  color: "var(--ink)",
  fontWeight: 500,
};

const MONO_LINK: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "1.15rem",
  color: "var(--coral)",
  wordBreak: "break-all",
};

export default function CitationBlock({ locale }: { locale: Locale }) {
  const t = S[locale] ?? S.en;

  return (
    <section style={{ marginTop: "4.8rem" }}>
      <h2>How to cite Samply</h2>
      <p>{t.intro}</p>

      <div style={BOX}>
        <div style={EYEBROW}>{t.publication}</div>
        <p style={REFERENCE}>
          Shevchenko, Y., Kuhlmann, T., &amp; Reips, U.-D. (2021). Samply: A user-friendly smartphone
          app and web-based means of scheduling and sending mobile notifications for
          experience-sampling research. <em>Behavior Research Methods</em>, 53, 1710–1730.
        </p>
        <a href={DOI} target="_blank" rel="noopener noreferrer" style={MONO_LINK}>{DOI}</a>
      </div>

      <div style={{ ...BOX, margin: "1.2rem 0 0" }}>
        <div style={EYEBROW}>{t.software}</div>
        <p style={{ ...REFERENCE, marginBottom: "0.6rem" }}>
          Samply Research (Version {APP_VERSION}) [Mobile application software]. Samply platform
          version {PLATFORM_VERSION}. https://samply.uni-konstanz.de
        </p>
        <p style={{ margin: 0, fontSize: "1.15rem", lineHeight: 1.55, color: "var(--ink-60)" }}>
          {t.versionNote}
        </p>
      </div>
    </section>
  );
}
