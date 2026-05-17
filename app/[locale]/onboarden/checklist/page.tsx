import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageHeader from '@/app/components/PageHeader';
import Checklist from '@/app/components/Checklist';

const ITEM_KEYS = ['read', 'capacity', 'noise', 'smoking', 'pets', 'damage', 'contact'];

export default async function OnboardenChecklistPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Onboarden.Checklist'});
  const tParent = await getTranslations({locale, namespace: 'Onboarden'});

  const items = ITEM_KEYS.map((key) => ({key, label: t(`items.${key}`)}));

  return (
    <main className="flex flex-1 flex-col px-6 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
        <PageHeader
          backHref="/onboarden"
          backLabel={tParent('title')}
          title={t('title')}
          intro={t('intro')}
        />
        <Checklist
          items={items}
          completedMessage={t('completedMessage')}
          nextLabel={t('next')}
          nextHref="/onboarden/handtekening"
        />
      </div>
    </main>
  );
}
