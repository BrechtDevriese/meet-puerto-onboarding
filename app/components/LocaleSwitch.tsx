'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {useTransition} from 'react';

export default function LocaleSwitch() {
  const t = useTranslations('LocaleSwitch');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-950"
      role="group"
      aria-label={t('label')}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            disabled={isPending || active}
            aria-pressed={active}
            onClick={() => {
              startTransition(() => {
                router.replace(pathname, {locale: l});
              });
            }}
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
              active
                ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
