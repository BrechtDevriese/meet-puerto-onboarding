import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageHeader from '@/app/components/PageHeader';
import StepCards from '@/app/components/StepCards';

export default async function GebruikOverview({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Gebruik'});
  const tCommon = await getTranslations({locale, namespace: 'Common'});
  const tDek = await getTranslations({locale, namespace: 'Gebruik.Dek'});
  const tEvent = await getTranslations({
    locale,
    namespace: 'Gebruik.Eventruimte'
  });
  const tKeu = await getTranslations({locale, namespace: 'Gebruik.Keuken'});

  const items = [
    {href: '/gebruik/dek', title: tDek('title'), summary: tDek('summary')},
    {
      href: '/gebruik/eventruimte',
      title: tEvent('title'),
      summary: tEvent('summary')
    },
    {href: '/gebruik/keuken', title: tKeu('title'), summary: tKeu('summary')}
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
            {t('roomsHeading')}
          </h2>
          <StepCards items={items} />
        </section>
      </div>
    </main>
  );
}
