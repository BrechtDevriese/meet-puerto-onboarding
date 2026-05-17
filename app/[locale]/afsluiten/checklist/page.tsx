import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageHeader from '@/app/components/PageHeader';
import Checklist from '@/app/components/Checklist';

const ITEM_KEYS = [
  'appliancesOff',
  'trash',
  'empties',
  'glass',
  'dishes',
  'towels',
  'leftovers',
  'ac',
  'projector',
  'sound',
  'lights',
  'windows',
  'doors',
  'key',
  'loungeCovers'
];

export default async function AfsluitenChecklistPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Afsluiten.Checklist'});
  const tParent = await getTranslations({locale, namespace: 'Afsluiten'});

  const items = ITEM_KEYS.map((key) => ({key, label: t(`items.${key}`)}));

  return (
    <main className="flex flex-1 flex-col px-6 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
        <PageHeader
          backHref="/afsluiten"
          backLabel={tParent('title')}
          title={t('title')}
          intro={t('intro')}
        />
        <Checklist
          items={items}
          completedMessage={t('completedMessage')}
          nextLabel={t('next')}
          nextHref="/afsluiten/handtekening"
        />
      </div>
    </main>
  );
}
