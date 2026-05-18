import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageHeader from '@/app/components/PageHeader';
import Checklist from '@/app/components/Checklist';
import SignatureForm from '@/app/components/SignatureForm';

const ITEM_KEYS = [
  'read',
  'capacity',
  'noise',
  'smoking',
  'pets',
  'damage',
  'contact'
];

export default async function OnboardenPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Onboarden'});
  const tCommon = await getTranslations({locale, namespace: 'Common'});
  const tChe = await getTranslations({locale, namespace: 'Onboarden.Checklist'});
  const tHan = await getTranslations({
    locale,
    namespace: 'Onboarden.Handtekening'
  });

  const checklistItems = ITEM_KEYS.map((key) => ({
    key,
    label: tChe(`items.${key}`)
  }));

  return (
    <main className="flex flex-1 flex-col px-6 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12">
        <PageHeader
          backHref="/"
          backLabel={tCommon('backHome')}
          title={t('title')}
          intro={t('intro')}
        />

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{tChe('title')}</h2>
          <p className="text-zinc-600 dark:text-zinc-400">{tChe('intro')}</p>
          <Checklist
            items={checklistItems}
            completedMessage={tChe('completedMessage')}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{tHan('title')}</h2>
          <p className="text-zinc-600 dark:text-zinc-400">{tHan('intro')}</p>
          <SignatureForm
            locale={locale}
            nameLabel={tHan('nameLabel')}
            namePlaceholder={tHan('namePlaceholder')}
            agreeLabel={tHan('agreeLabel')}
            submitLabel={tHan('submitButton')}
            successTitle={tHan('successTitle')}
            successMessage={tHan('successMessage')}
            signedOnTemplate={tHan('signedOn')}
            nextLabel={tHan('next')}
            nextHref="/gebruik"
          />
        </section>
      </div>
    </main>
  );
}
