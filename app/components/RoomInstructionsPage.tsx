import {getTranslations} from 'next-intl/server';
import PageHeader from './PageHeader';

type RoomNamespace = 'Gebruik.Dek' | 'Gebruik.Eventruimte' | 'Gebruik.Keuken';

type Props = {
  locale: string;
  roomNamespace: RoomNamespace;
  itemKeys: string[];
};

export default async function RoomInstructionsPage({
  locale,
  roomNamespace,
  itemKeys
}: Props) {
  const t = await getTranslations({locale, namespace: roomNamespace});
  const tParent = await getTranslations({locale, namespace: 'Gebruik'});

  return (
    <main className="flex flex-1 flex-col px-6 py-10 sm:px-10 sm:py-16">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-10">
        <PageHeader
          backHref="/gebruik"
          backLabel={tParent('title')}
          title={t('title')}
          intro={t('intro')}
        />
        <ol className="flex flex-col gap-3">
          {itemKeys.map((key, i) => (
            <li
              key={key}
              className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {i + 1}
              </span>
              <p className="leading-relaxed text-zinc-800 dark:text-zinc-200">
                {t(`items.${key}`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
