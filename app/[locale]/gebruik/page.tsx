import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageHeader from '@/app/components/PageHeader';
import {Link} from '@/i18n/navigation';

type Hotspot = {
  href: string;
  label: string;
  number: number;
  top: string;
  left: string;
};

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
  const tEvent = await getTranslations({locale, namespace: 'Gebruik.Eventruimte'});
  const tKeu = await getTranslations({locale, namespace: 'Gebruik.Keuken'});

  const hotspots: Hotspot[] = [
    {href: '/gebruik/dek', label: tDek('title'), number: 1, top: '17%', left: '32%'},
    {
      href: '/gebruik/eventruimte',
      label: tEvent('title'),
      number: 2,
      top: '65%',
      left: '38%'
    },
    {href: '/gebruik/keuken', label: tKeu('title'), number: 3, top: '61%', left: '85%'}
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

        <div className="relative overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gebruikoverzicht.jpg"
            alt=""
            className="block h-auto w-full"
          />
          {hotspots.map((spot) => (
            <Link
              key={spot.href}
              href={spot.href}
              aria-label={spot.label}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              style={{top: spot.top, left: spot.left}}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#77A3A7] text-lg font-semibold text-white shadow-lg ring-2 ring-white transition-transform group-hover:scale-110 group-focus-visible:scale-110">
                {spot.number}
              </span>
              <span className="whitespace-nowrap rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-md">
                {spot.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
