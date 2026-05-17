import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageHeader from '@/app/components/PageHeader';
import StepCards from '@/app/components/StepCards';

export default async function AfsluitenOverview({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Afsluiten'});
  const tCommon = await getTranslations({locale, namespace: 'Common'});
  const tChe = await getTranslations({locale, namespace: 'Afsluiten.Checklist'});
  const tHan = await getTranslations({
    locale,
    namespace: 'Afsluiten.Handtekening'
  });

  const items = [
    {
      number: 1,
      href: '/afsluiten/checklist',
      title: tChe('title'),
      summary: tChe('summary')
    },
    {
      number: 2,
      href: '/afsluiten/handtekening',
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
