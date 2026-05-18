import {getTranslations, setRequestLocale} from 'next-intl/server';
import {MapPin, Ship, SquareParking, type LucideIcon} from 'lucide-react';
import PageHeader from '@/app/components/PageHeader';
import {renderBody} from '@/lib/renderBody';

const SECTIONS: {key: string; icon: LucideIcon}[] = [
  {key: 'location', icon: MapPin},
  {key: 'parking', icon: SquareParking},
  {key: 'access', icon: Ship}
];

export default async function InfoPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: 'Info'});
  const tCommon = await getTranslations({locale, namespace: 'Common'});

  return (
    <main className="flex flex-1 flex-col px-6 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
        <PageHeader
          backHref="/"
          backLabel={tCommon('backHome')}
          title={t('title')}
          intro={t('intro')}
        />

        <div className="flex flex-col gap-4">
          {SECTIONS.map(({key, icon: Icon}) => (
            <article
              key={key}
              className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <h2 className="flex items-center gap-3 text-lg font-semibold">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#77A3A7]/15">
                  <Icon
                    className="h-5 w-5 text-[#77A3A7]"
                    aria-hidden
                    strokeWidth={2}
                  />
                </span>
                {t(`sections.${key}.title`)}
              </h2>
              <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                {renderBody(t(`sections.${key}.body`))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
