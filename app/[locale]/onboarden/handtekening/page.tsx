import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageHeader from '@/app/components/PageHeader';
import SignatureForm from '@/app/components/SignatureForm';

export default async function OnboardenHandtekeningPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: 'Onboarden.Handtekening'
  });
  const tParent = await getTranslations({locale, namespace: 'Onboarden'});

  return (
    <main className="flex flex-1 flex-col px-6 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
        <PageHeader
          backHref="/onboarden"
          backLabel={tParent('title')}
          title={t('title')}
          intro={t('intro')}
        />
        <SignatureForm
          locale={locale}
          nameLabel={t('nameLabel')}
          namePlaceholder={t('namePlaceholder')}
          agreeLabel={t('agreeLabel')}
          submitLabel={t('submitButton')}
          successTitle={t('successTitle')}
          successMessage={t('successMessage')}
          signedOnTemplate={t('signedOn')}
          nextLabel={t('next')}
          nextHref="/gebruik"
        />
      </div>
    </main>
  );
}
