import {getTranslations, setRequestLocale} from 'next-intl/server';
import PageHeader from '@/app/components/PageHeader';
import {Link} from '@/i18n/navigation';

type Room = {
  href: string;
  title: string;
  summary: string;
  photo: string;
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

  const rooms: Room[] = [
    {
      href: '/gebruik/dek',
      title: tDek('title'),
      summary: tDek('summary'),
      photo: '/dek.jpg'
    },
    {
      href: '/gebruik/eventruimte',
      title: tEvent('title'),
      summary: tEvent('summary'),
      photo: '/eventruimte.jpg'
    },
    {
      href: '/gebruik/keuken',
      title: tKeu('title'),
      summary: tKeu('summary'),
      photo: '/keuken.jpg'
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

        <ul className="flex flex-col gap-4">
          {rooms.map((room) => (
            <li key={room.href}>
              <Link
                href={room.href}
                className="group block overflow-hidden rounded-2xl bg-[#77A3A7] text-white shadow-sm transition-all hover:bg-[#658e91] hover:shadow"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={room.photo}
                  alt=""
                  className="aspect-[16/9] w-full bg-zinc-200 object-cover transition-transform group-hover:scale-[1.02] dark:bg-zinc-800"
                />
                <div className="flex items-center gap-4 p-5">
                  <span className="flex flex-1 flex-col">
                    <span className="text-lg font-semibold">{room.title}</span>
                    <span className="text-sm text-white/85">{room.summary}</span>
                  </span>
                  <span
                    aria-hidden
                    className="text-white/80 transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
