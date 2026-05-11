import connectDB from '@/lib/db';
import ChangelogEntry, { type IChangelogEntry, type ChangeTag } from '@/lib/models/changelogEntry';

const TAG_LABEL: Record<ChangeTag, string> = {
  new:         'New',
  fix:         'Fix',
  improvement: 'Improved',
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

function fmt(d: Date) {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

function EntryCard({ entry }: { entry: IChangelogEntry }) {
  return (
    <div style={{ display: 'flex', gap: '4rem', paddingBottom: '3.6rem', borderBottom: '1px solid var(--ink-10)', marginBottom: '3.6rem' }}>
      {/* left — version + date */}
      <div style={{ flexShrink: 0, width: '14rem', paddingTop: '0.2rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{entry.version}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--ink-40)', marginTop: '0.3rem' }}>{fmt(entry.date)}</div>
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

export default async function ChangelogContent() {
  await connectDB();
  const entries = await ChangelogEntry.find({}).sort({ date: -1 }).lean<IChangelogEntry[]>();

  if (entries.length === 0) {
    return (
      <p style={{ fontSize: '1.4rem', color: 'var(--ink-40)' }}>
        No releases logged yet. Check back soon.
      </p>
    );
  }

  return (
    <div style={{ marginTop: '0.4rem' }}>
      {entries.map((e) => (
        <EntryCard key={String(e._id)} entry={e} />
      ))}
    </div>
  );
}
