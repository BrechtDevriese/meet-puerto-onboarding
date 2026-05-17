import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageHeader from '@/app/components/PageHeader';
import StepCards from '@/app/components/StepCards';

export default async function OnboardenOverview({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Onboarden'});
  const tCommon = await getTranslations({locale, namespace: 'Common'});
  const tInfo = await getTranslations({locale, namespace: 'Onboarden.Info'});
  const tChe = await getTranslations({locale, namespace: 'Onboarden.Checklist'});
  const tHan = await getTranslations({
    locale,
    namespace: 'Onboarden.Handtekening'
  });

  const items = [
    {
      number: 1,
      href: '/onboarden/info',
      title: tInfo('title'),
      summary: tInfo('summary')
    },
    {
      number: 2,
      href: '/onboarden/checklist',
      title: tChe('title'),
      summary: tChe('summary')
    },
    {
      number: 3,
      href: '/onboarden/handtekening',
      title: tHan('title'),
      summary: tHan('summary')
    }
  ];

  return (
    <main className="flex flex-1 flex-col px-6 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
        <PageHeader
          backHref="/"
          backLabel={tCommon('backHome')}
          title={t('title')}
          intro={t('intro')}
        />
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            {t('stepsHeading')}
          </h2>
          <StepCards items={items} />
        </section>
      </div>
    </main>
  );
}
