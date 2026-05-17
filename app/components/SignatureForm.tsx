'use client';

import {useState} from 'react';
import {Link} from '@/i18n/navigation';

type Props = {
  locale: string;
  nameLabel: string;
  namePlaceholder: string;
  agreeLabel: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  signedOnTemplate: string;
  nextLabel?: string;
  nextHref?: string;
};

const dateLocaleMap: Record<string, string> = {
  nl: 'nl-BE',
  en: 'en-GB',
  fr: 'fr-BE'
};

export default function SignatureForm({
  locale,
  nameLabel,
  namePlaceholder,
  agreeLabel,
  submitLabel,
  successTitle,
  successMessage,
  signedOnTemplate,
  nextLabel,
  nextHref
}: Props) {
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [signedAt, setSignedAt] = useState<string | null>(null);

  const canSubmit = name.trim().length >= 2 && agreed;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const dateStr = new Date().toLocaleString(
      dateLocaleMap[locale] ?? 'nl-BE',
      {dateStyle: 'medium', timeStyle: 'short'}
    );
    setSignedAt(dateStr);
  }

  if (signedAt) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl bg-emerald-50 p-6 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200">
        <div>
          <p className="text-lg font-semibold">✓ {successTitle}</p>
          <p className="mt-1 leading-relaxed">{successMessage}</p>
        </div>
        <div className="rounded-xl bg-white/60 p-4 text-sm dark:bg-black/30">
          <p className="font-medium">{name.trim()}</p>
          <p className="text-emerald-700 dark:text-emerald-300">
            {signedOnTemplate.replace('{date}', signedAt)}
          </p>
        </div>
        {nextLabel && nextHref && (
          <Link
            href={nextHref}
            className="inline-flex h-11 items-center justify-center self-start rounded-full bg-emerald-700 px-5 font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            {nextLabel} →
          </Link>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {nameLabel}
        </span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={namePlaceholder}
          autoComplete="name"
          required
          minLength={2}
          className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-50"
        />
      </label>

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-emerald-600"
        />
        <span className="leading-relaxed text-zinc-800 dark:text-zinc-200">
          {agreeLabel}
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex h-12 items-center justify-center self-start rounded-full bg-zinc-900 px-6 font-medium text-zinc-50 transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {submitLabel}
      </button>
    </form>
  );
}
