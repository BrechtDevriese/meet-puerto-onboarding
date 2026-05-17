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
  const tInfo = await getTranslations({locale, namespace: 'Info'});
  const tOnb = await getTranslations({locale, namespace: 'Onboarden'});
  const tGeb = await getTranslations({locale, namespace: 'Gebruik'});
  const tAfs = await getTranslations({locale, namespace: 'Afsluiten'});

  const blocks = [
    {
      number: 1,
      href: '/info',
      title: tInfo('title'),
      summary: tInfo('summary')
    },
    {
      number: 2,
      href: '/onboarden',
      title: tOnb('title'),
      summary: tOnb('summary')
    },
    {
      number: 3,
      href: '/gebruik',
      title: tGeb('title'),
      summary: tGeb('summary')
    },
    {
      number: 4,
      href: '/afsluiten',
      title: tAfs('title'),
      summary: tAfs('summary')
    }
  ];

  return (
    <main className="flex flex-1 flex-col px-6 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12">
        <header className="flex items-center justify-between gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Meet Puerto"
            className="h-12 w-auto"
          />
          <LocaleSwitch />
        </header>

        <section>
          <h1 className="sr-only">{t('title')}</h1>
          <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            {t('subtitle')}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <StepCards items={blocks} />
        </section>
      </div>
    </main>
  );
}
