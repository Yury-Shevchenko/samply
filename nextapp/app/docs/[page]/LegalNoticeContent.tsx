import type { Locale } from "@/lib/i18n";

export default function LegalNoticeContent({ locale }: { locale: Locale }) {
  if (locale === "de") return <LegalNoticeContentDe />;
  if (locale === "nl") return <LegalNoticeContentNl />;
  if (locale === "ru") return <LegalNoticeContentRu />;
  if (locale === "zh") return <LegalNoticeContentZh />;
  if (locale === "ko") return <LegalNoticeContentKo />;
  if (locale === "it") return <LegalNoticeContentIt />;
  if (locale === "fr") return <LegalNoticeContentFr />;
  if (locale === "es") return <LegalNoticeContentEs />;
  if (locale === "pt") return <LegalNoticeContentPt />;
  return <LegalNoticeContentEn />;
}

function LegalNoticeContentEn() {
  return (
    <>
      <h2>Provider</h2>
      <p>iScience research group</p>
      <p>University of Konstanz</p>
      <p>Universitätsstraße 10</p>
      <p>78464 Konstanz</p>
      <p>Germany</p>

      <h2>Contact</h2>
      <dl>
        <dt>E-Mail</dt>
        <dd><a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a></dd>
        <dt>Phone</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Website</dt>
        <dd><a href="https://iscience.uni-konstanz.de/" target="_blank" rel="noreferrer">https://iscience.uni-konstanz.de/</a></dd>
      </dl>

      <h2>Representatives</h2>
      <dl>
        <dt>Developer</dt>
        <dd>Yury Shevchenko</dd>
      </dl>
    </>
  );
}

function LegalNoticeContentNl() {
  return (
    <>
      <h2>Aanbieder</h2>
      <p>iScience Research Group</p>
      <p>University of Konstanz</p>
      <p>Universitätsstraße 10</p>
      <p>78464 Konstanz</p>
      <p>Duitsland</p>

      <h2>Contact</h2>
      <dl>
        <dt>E-Mail</dt>
        <dd><a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a></dd>
        <dt>Telefoon</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Website</dt>
        <dd><a href="https://iscience.uni-konstanz.de/" target="_blank" rel="noreferrer">https://iscience.uni-konstanz.de/</a></dd>
      </dl>

      <h2>Vertegenwoordigers</h2>
      <dl>
        <dt>Ontwikkelaar</dt>
        <dd>Yury Shevchenko</dd>
      </dl>
    </>
  );
}

function LegalNoticeContentDe() {
  return (
    <>
      <h2>Anbieter</h2>
      <p>iScience Forschungsgruppe</p>
      <p>Universität Konstanz</p>
      <p>Universitätsstraße 10</p>
      <p>78464 Konstanz</p>
      <p>Deutschland</p>

      <h2>Kontakt</h2>
      <dl>
        <dt>E-Mail</dt>
        <dd><a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a></dd>
        <dt>Telefon</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Website</dt>
        <dd><a href="https://iscience.uni-konstanz.de/" target="_blank" rel="noreferrer">https://iscience.uni-konstanz.de/</a></dd>
      </dl>

      <h2>Vertretungsberechtigte</h2>
      <dl>
        <dt>Entwickler</dt>
        <dd>Yury Shevchenko</dd>
      </dl>
    </>
  );
}

function LegalNoticeContentRu() {
  return (
    <>
      <h2>Поставщик</h2>
      <p>Исследовательская группа iScience</p>
      <p>Университет Констанца</p>
      <p>Universitätsstraße 10</p>
      <p>78464 Konstanz</p>
      <p>Германия</p>

      <h2>Контакт</h2>
      <dl>
        <dt>E-Mail</dt>
        <dd><a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a></dd>
        <dt>Телефон</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Веб-сайт</dt>
        <dd><a href="https://iscience.uni-konstanz.de/" target="_blank" rel="noreferrer">https://iscience.uni-konstanz.de/</a></dd>
      </dl>

      <h2>Представители</h2>
      <dl>
        <dt>Разработчик</dt>
        <dd>Yury Shevchenko</dd>
      </dl>
    </>
  );
}

function LegalNoticeContentZh() {
  return (
    <>
      <h2>提供方</h2>
      <p>iScience 研究组</p>
      <p>康斯坦茨大学</p>
      <p>Universitätsstraße 10</p>
      <p>78464 Konstanz</p>
      <p>德国</p>

      <h2>联系方式</h2>
      <dl>
        <dt>电子邮件</dt>
        <dd><a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a></dd>
        <dt>电话</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>网站</dt>
        <dd><a href="https://iscience.uni-konstanz.de/" target="_blank" rel="noreferrer">https://iscience.uni-konstanz.de/</a></dd>
      </dl>

      <h2>代表人</h2>
      <dl>
        <dt>开发者</dt>
        <dd>Yury Shevchenko</dd>
      </dl>
    </>
  );
}

function LegalNoticeContentKo() {
  return (
    <>
      <h2>제공자</h2>
      <p>iScience 연구 그룹</p>
      <p>University of Konstanz</p>
      <p>Universitätsstraße 10</p>
      <p>78464 Konstanz</p>
      <p>독일</p>

      <h2>연락처</h2>
      <dl>
        <dt>이메일</dt>
        <dd><a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a></dd>
        <dt>전화</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>웹사이트</dt>
        <dd><a href="https://iscience.uni-konstanz.de/" target="_blank" rel="noreferrer">https://iscience.uni-konstanz.de/</a></dd>
      </dl>

      <h2>대표자</h2>
      <dl>
        <dt>개발자</dt>
        <dd>Yury Shevchenko</dd>
      </dl>
    </>
  );
}

function LegalNoticeContentIt() {
  return (
    <>
      <h2>Fornitore</h2>
      <p>Gruppo di ricerca iScience</p>
      <p>University of Konstanz</p>
      <p>Universitätsstraße 10</p>
      <p>78464 Konstanz</p>
      <p>Germania</p>

      <h2>Contatti</h2>
      <dl>
        <dt>E-Mail</dt>
        <dd><a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a></dd>
        <dt>Telefono</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Sito web</dt>
        <dd><a href="https://iscience.uni-konstanz.de/" target="_blank" rel="noreferrer">https://iscience.uni-konstanz.de/</a></dd>
      </dl>

      <h2>Rappresentanti</h2>
      <dl>
        <dt>Sviluppatore</dt>
        <dd>Yury Shevchenko</dd>
      </dl>
    </>
  );
}

function LegalNoticeContentFr() {
  return (
    <>
      <h2>Fournisseur</h2>
      <p>Groupe de recherche iScience</p>
      <p>Université de Constance</p>
      <p>Universitätsstraße 10</p>
      <p>78464 Konstanz</p>
      <p>Allemagne</p>

      <h2>Contact</h2>
      <dl>
        <dt>E-Mail</dt>
        <dd><a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a></dd>
        <dt>Téléphone</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Site web</dt>
        <dd><a href="https://iscience.uni-konstanz.de/" target="_blank" rel="noreferrer">https://iscience.uni-konstanz.de/</a></dd>
      </dl>

      <h2>Représentants</h2>
      <dl>
        <dt>Développeur</dt>
        <dd>Yury Shevchenko</dd>
      </dl>
    </>
  );
}

function LegalNoticeContentEs() {
  return (
    <>
      <h2>Proveedor</h2>
      <p>Grupo de investigación iScience</p>
      <p>Universidad de Constanza</p>
      <p>Universitätsstraße 10</p>
      <p>78464 Konstanz</p>
      <p>Alemania</p>

      <h2>Contacto</h2>
      <dl>
        <dt>E-Mail</dt>
        <dd><a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a></dd>
        <dt>Teléfono</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Sitio web</dt>
        <dd><a href="https://iscience.uni-konstanz.de/" target="_blank" rel="noreferrer">https://iscience.uni-konstanz.de/</a></dd>
      </dl>

      <h2>Representantes</h2>
      <dl>
        <dt>Desarrollador</dt>
        <dd>Yury Shevchenko</dd>
      </dl>
    </>
  );
}

function LegalNoticeContentPt() {
  return (
    <>
      <h2>Provedor</h2>
      <p>Grupo de pesquisa iScience</p>
      <p>Universidade de Konstanz</p>
      <p>Universitätsstraße 10</p>
      <p>78464 Konstanz</p>
      <p>Alemanha</p>

      <h2>Contato</h2>
      <dl>
        <dt>E-Mail</dt>
        <dd><a href="mailto:yury.shevchenko@uni.kn">yury.shevchenko@uni.kn</a></dd>
        <dt>Telefone</dt>
        <dd>+49 178 418 81 54</dd>
        <dt>Site</dt>
        <dd><a href="https://iscience.uni-konstanz.de/" target="_blank" rel="noreferrer">https://iscience.uni-konstanz.de/</a></dd>
      </dl>

      <h2>Representantes</h2>
      <dl>
        <dt>Desenvolvedor</dt>
        <dd>Yury Shevchenko</dd>
      </dl>
    </>
  );
}
