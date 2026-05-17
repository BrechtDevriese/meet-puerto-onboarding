import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import PageHeader from '@/app/components/PageHeader';

const SECTION_KEYS = ['location', 'parking', 'access', 'rules'] as const;

export default async function OnboardenInfoPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Onboarden.Info'});
  const tParent = await getTranslations({locale, namespace: 'Onboarden'});
  const tChe = await getTranslations({locale, namespace: 'Onboarden.Checklist'});

  return (
    <main className="flex flex-1 flex-col px-6 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
        <PageHeader
          backHref="/onboarden"
          backLabel={tParent('title')}
          title={t('title')}
          intro={t('intro')}
        />

        <div className="flex flex-col gap-4">
          {SECTION_KEYS.map((key) => (
            <article
              key={key}
              className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <h2 className="text-lg font-semibold">
                {t(`sections.${key}.title`)}
              </h2>
              <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                {t(`sections.${key}.body`)}
              </p>
            </article>
          ))}
        </div>

        <Link
          href="/onboarden/checklist"
          className="inline-flex h-12 items-center justify-center self-start rounded-full bg-zinc-900 px-6 font-medium text-zinc-50 transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {tChe('title')} →
        </Link>
      </div>
    </main>
  );
}
