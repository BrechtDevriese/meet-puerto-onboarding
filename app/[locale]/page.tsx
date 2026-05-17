import {getTranslations, setRequestLocale} from 'next-intl/server';
import LocaleSwitch from '@/app/components/LocaleSwitch';
import StepCards from '@/app/components/StepCards';

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Home'});
  const tOnb = await getTranslations({locale, namespace: 'Onboarden'});
  const tGeb = await getTranslations({locale, namespace: 'Gebruik'});
  const tAfs = await getTranslations({locale, namespace: 'Afsluiten'});

  const blocks = [
    {
      number: 1,
      href: '/onboarden',
      title: tOnb('title'),
      summary: tOnb('summary')
    },
    {
      number: 2,
      href: '/gebruik',
      title: tGeb('title'),
      summary: tGeb('summary')
    },
    {
      number: 3,
      href: '/afsluiten',
      title: tAfs('title'),
      summary: tAfs('summary')
    }
  ];

  return (
    <main className="flex flex-1 flex-col px-6 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12">
        <header className="flex items-center justify-between">
          <span className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Meet Puerto
          </span>
          <LocaleSwitch />
        </header>

        <section className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            {t('eyebrow')}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            {t('blocksHeading')}
          </h2>
          <StepCards items={blocks} />
        </section>
      </div>
    </main>
  );
}
