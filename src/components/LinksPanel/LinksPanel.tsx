import React from 'react';

// ---- Types ----
type URLString = string;

interface CoinLinks {
  homepage: URLString[];
  blockchain_site: URLString[];
  official_forum_url: URLString[];
  chat_url: URLString[];
  announcement_url: URLString[];
  twitter_screen_name?: string | null;
  facebook_username?: string | null;
  bitcointalk_thread_identifier?: number | null;
  telegram_channel_identifier?: string | null;
  subreddit_url?: URLString | null;
  repos_url: {
    github: URLString[];
    bitbucket: URLString[];
  };
}

interface LinksPanelProps {
  links: CoinLinks;
  className?: string;
}

// ---- Helpers ----
const isNonEmpty = (s?: string | null): s is string =>
  !!s && s.trim().length > 0;

const ensureProtocol = (raw: string): string => {
  // Add https:// if missing; leave mailto: etc. intact
  if (/^(https?:)?\/\//i.test(raw) || /^[a-z]+:/i.test(raw)) return raw;
  return `https://${raw}`;
};

const validUrlList = (arr?: string[]): string[] =>
  (arr ?? [])
    .map((u) => u?.trim())
    .filter(isNonEmpty)
    .map(ensureProtocol);

const dedupe = (urls: string[]): string[] => {
  // Deduplicate by normalized URL (lowercased w/o trailing slash)
  const norm = (u: string) => u.replace(/\/+$/, '').toLowerCase();
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of urls) {
    const k = norm(u);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(u);
    }
  }
  return out;
};

const hostname = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const labelForSocial = (url: string): string => {
  const h = hostname(url);
  if (h.includes('x.com') || h.includes('twitter.com')) return 'X (Twitter)';
  if (h.includes('t.me')) return 'Telegram';
  if (h.includes('reddit.com')) return 'Reddit';
  if (h.includes('facebook.com')) return 'Facebook';
  return h;
};

const isDocsHost = (url: string) =>
  /(^|\.)docs\.|readthedocs|gitbook|notion|medium\./i.test(hostname(url));

/** Build social links from screen names / IDs when needed */
const buildSocialLinks = (links: CoinLinks) => {
  const out: { label: string; url: string }[] = [];

  if (isNonEmpty(links.twitter_screen_name)) {
    out.push({
      label: 'X (Twitter)',
      url: `https://x.com/${links.twitter_screen_name}`,
    });
  }
  if (isNonEmpty(links.telegram_channel_identifier)) {
    out.push({
      label: 'Telegram',
      url: `https://t.me/${links.telegram_channel_identifier}`,
    });
  }
  if (isNonEmpty(links.facebook_username)) {
    out.push({
      label: 'Facebook',
      url: `https://facebook.com/${links.facebook_username}`,
    });
  }
  if (isNonEmpty(links.subreddit_url)) {
    out.push({ label: 'Reddit', url: ensureProtocol(links.subreddit_url!) });
  }

  return out;
};

// ---- UI atoms ----
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <h3 className="mb-2 text-sm font-semibold text-[#A1A7BB]">{title}</h3>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const LinkPill: React.FC<{ href: string; label?: string }> = ({
  href,
  label,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-white shadow-sm transition hover:border-gray-300 "
    title={hostname(href)}
  >
    {/* Simple icon (globe) */}
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 text-white transition group-hover:text-gray-700"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16Zm3.657-4.243a6 6 0 10-8.486-8.486 6 6 0 008.486 8.486ZM7.5 10a8.5 8.5 0 013.5-7.07A8.5 8.5 0 0114.5 10a8.5 8.5 0 01-3.5 7.07A8.5 8.5 0 017.5 10Z"
        clipRule="evenodd"
      />
    </svg>
    <span className="truncate max-w-[16rem]">{label ?? hostname(href)}</span>
  </a>
);

// ---- Main component ----
export const LinksPanel: React.FC<LinksPanelProps> = ({
  links,
  className = '',
}) => {
  // Primary: website(s)
  const websites = dedupe(validUrlList(links.homepage));

  // Explorers (blockchain_site)
  const explorers = dedupe(validUrlList(links.blockchain_site));

  // Social (built from IDs + explicit URLs if present)
  const social = dedupe([...buildSocialLinks(links).map((x) => x.url)]);

  // Forums / chat / announcements
  const forums = dedupe(validUrlList(links.official_forum_url));
  const chats = dedupe(validUrlList(links.chat_url));
  const announcements = dedupe(validUrlList(links.announcement_url));

  // Developer repos
  const github = dedupe(validUrlList(links.repos_url?.github));
  const bitbucket = dedupe(validUrlList(links.repos_url?.bitbucket));

  // Optional: docs surfaced from website/external
  const docsCandidates = [...websites, ...explorers].filter(isDocsHost);

  return (
    <div className={`grid gap-6 grid-cols-1 text-white mt-4 ${className}`}>
      {/* Primary */}
      {(websites.length > 0 ||
        docsCandidates.length > 0 ||
        explorers.length > 0) && (
        <div className="rounded-xl border border-gray-200 p-4 shadow-sm">
          <h2 className="mb-3 text-base font-semibold text-[#A1A7BB]">
            Primary
          </h2>
          {websites.length > 0 && (
            <Section title="Website">
              {websites.map((u, i) => (
                <LinkPill key={`site-${i}`} href={u} label={hostname(u)} />
              ))}
            </Section>
          )}

          {explorers.length > 0 && (
            <div className="mt-3">
              <Section title="Explorers">
                {explorers.map((u, i) => (
                  <LinkPill key={`exp-${i}`} href={u} label={hostname(u)} />
                ))}
              </Section>
            </div>
          )}

          {docsCandidates.length > 0 && (
            <div className="mt-3">
              <Section title="Docs">
                {docsCandidates.slice(0, 3).map((u, i) => (
                  <LinkPill key={`doc-${i}`} href={u} label={hostname(u)} />
                ))}
              </Section>
            </div>
          )}
        </div>
      )}

      {/* Social */}
      {social.length > 0 && (
        <div className="rounded-xl border border-gray-200 p-4 shadow-sm">
          <h2 className="mb-3 text-base font-semibold text-[#A1A7BB]">
            Social
          </h2>
          <Section title="Networks">
            {social.map((u, i) => (
              <LinkPill
                key={`social-${i}`}
                href={u}
                label={labelForSocial(u)}
              />
            ))}
          </Section>
        </div>
      )}

      {/* Developer */}
      {(github.length > 0 || bitbucket.length > 0) && (
        <div className="rounded-xl border border-gray-200 p-4 shadow-sm">
          <h2 className="mb-3 text-base font-semibold text-[#A1A7BB]">
            Developer
          </h2>

          {github.length > 0 && (
            <Section title={`GitHub ${github.length > 3 ? `(top 3)` : ''}`}>
              {github.map((u, i) => (
                <LinkPill key={`gh-${i}`} href={u} label={hostname(u)} />
              ))}
            </Section>
          )}

          {bitbucket.length > 0 && (
            <div className="mt-3">
              <Section
                title={`Bitbucket ${bitbucket.length > 3 ? `(top 3)` : ''}`}
              >
                {bitbucket.map((u, i) => (
                  <LinkPill key={`bb-${i}`} href={u} label={hostname(u)} />
                ))}
              </Section>
            </div>
          )}
        </div>
      )}

      {/* Other */}
      {(forums.length > 0 || chats.length > 0 || announcements.length > 0) && (
        <div className="rounded-xl border border-gray-200 p-4 shadow-sm">
          <h2 className="mb-3 text-base font-semibold text-[#A1A7BB]">Other</h2>

          {forums.length > 0 && (
            <Section title="Forum">
              {forums.map((u, i) => (
                <LinkPill key={`forum-${i}`} href={u} />
              ))}
            </Section>
          )}

          {chats.length > 0 && (
            <div className="mt-3">
              <Section title="Chat">
                {chats.map((u, i) => (
                  <LinkPill key={`chat-${i}`} href={u} />
                ))}
              </Section>
            </div>
          )}

          {announcements.length > 0 && (
            <div className="mt-3">
              <Section title="Announcements">
                {announcements.map((u, i) => (
                  <LinkPill key={`ann-${i}`} href={u} />
                ))}
              </Section>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
