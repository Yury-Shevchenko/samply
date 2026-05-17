import type { Locale } from "@/lib/i18n";
import connectDB from '@/lib/db';
import ChangelogEntry, { type IChangelogEntry, type ChangeTag } from '@/lib/models/changelogEntry';

const TAG_LABEL_EN: Record<ChangeTag, string> = {
  new:         'New',
  fix:         'Fix',
  improvement: 'Improved',
};

const TAG_LABEL_DE: Record<ChangeTag, string> = {
  new:         'Hinzugefügt',
  fix:         'Behoben',
  improvement: 'Verbessert',
};

const TAG_LABEL_NL: Record<ChangeTag, string> = {
  new:         'Functie',
  fix:         'Oplossing',
  improvement: 'Verbetering',
};

const TAG_LABEL_RU: Record<ChangeTag, string> = {
  new:         'Новое',
  fix:         'Исправлено',
  improvement: 'Улучшено',
};

const TAG_LABEL_ZH: Record<ChangeTag, string> = {
  new:         '新功能',
  fix:         '修复',
  improvement: '改进',
};

const TAG_LABEL_AR: Record<ChangeTag, string> = {
  new:         'جديد',
  fix:         'إصلاح',
  improvement: 'تحسين',
};

const TAG_LABEL_PL: Record<ChangeTag, string> = {
  new:         'Nowe',
  fix:         'Poprawka',
  improvement: 'Ulepszenie',
};

const TAG_LABEL_TR: Record<ChangeTag, string> = {
  new:         'Yeni',
  fix:         'Düzeltme',
  improvement: 'İyileştirme',
};

const TAG_COLOR: Record<ChangeTag, string> = {
  new:         'var(--coral)',
  fix:         'var(--sage)',
  improvement: 'var(--ink-40)',
};

const TAG_BG: Record<ChangeTag, string> = {
  new:         'var(--coral-soft)',
  fix:         'var(--sage-soft)',
  improvement: 'var(--ink-10)',
};

function fmt(d: Date, locale: Locale) {
  const lang =
    locale === 'de' ? 'de-DE' :
    locale === 'nl' ? 'nl-NL' :
    locale === 'ru' ? 'ru-RU' :
    locale === 'zh' ? 'zh-CN' :
    locale === 'ar' ? 'ar-SA' :
    locale === 'pl' ? 'pl-PL' :
    locale === 'tr' ? 'tr-TR' :
    'en-US';
  return new Date(d).toLocaleDateString(lang, {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

function EntryCard({ entry, locale }: { entry: IChangelogEntry; locale: Locale }) {
  const TAG_LABEL =
    locale === 'de' ? TAG_LABEL_DE :
    locale === 'nl' ? TAG_LABEL_NL :
    locale === 'ru' ? TAG_LABEL_RU :
    locale === 'zh' ? TAG_LABEL_ZH :
    locale === 'ar' ? TAG_LABEL_AR :
    locale === 'pl' ? TAG_LABEL_PL :
    locale === 'tr' ? TAG_LABEL_TR :
    TAG_LABEL_EN;
  return (
    <div style={{ display: 'flex', gap: '4rem', paddingBottom: '3.6rem', borderBottom: '1px solid var(--ink-10)', marginBottom: '3.6rem' }}>
      {/* left — version + date */}
      <div style={{ flexShrink: 0, width: '14rem', paddingTop: '0.2rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{entry.version}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--ink-40)', marginTop: '0.3rem' }}>{fmt(entry.date, locale)}</div>
      </div>

      {/* right — title + changes */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {entry.title && (
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.9rem', letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1.2rem' }}>
            {entry.title}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {entry.changes.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'baseline' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: TAG_COLOR[c.tag],
                background: TAG_BG[c.tag],
                padding: '0.1rem 0.5rem',
                borderRadius: '0.35rem',
                flexShrink: 0,
              }}>
                {TAG_LABEL[c.tag]}
              </span>
              <span style={{ fontSize: '1.35rem', color: 'var(--ink-60)', lineHeight: 1.5 }}>{c.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ChangelogContent({ locale }: { locale: Locale }) {
  await connectDB();
  const entries = await ChangelogEntry.find({}).sort({ date: -1 }).lean<IChangelogEntry[]>();

  if (entries.length === 0) {
    return (
      <p style={{ fontSize: '1.4rem', color: 'var(--ink-40)' }}>
        {locale === 'de'
          ? 'Noch keine Versionen protokolliert. Schauen Sie bald wieder vorbei.'
          : locale === 'nl'
          ? 'Nog geen versies geregistreerd. Kom binnenkort terug.'
          : locale === 'ru'
          ? 'Записей о версиях пока нет. Загляните позже.'
          : locale === 'zh'
          ? '暂无版本记录。请稍后再来。'
          : locale === 'ar'
          ? 'لم تُسجَّل أي إصدارات بعد. عد قريبًا.'
          : locale === 'pl'
          ? 'Nie zarejestrowano jeszcze żadnych wydań. Zajrzyj wkrótce.'
          : locale === 'tr'
          ? 'Henüz kaydedilmiş bir sürüm yok. Yakında tekrar kontrol edin.'
          : 'No releases logged yet. Check back soon.'}
      </p>
    );
  }

  return (
    <div style={{ marginTop: '0.4rem' }}>
      {entries.map((e) => (
        <EntryCard key={String(e._id)} entry={e} locale={locale} />
      ))}
    </div>
  );
}
