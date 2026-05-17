import {setRequestLocale} from 'next-intl/server';
import RoomInstructionsPage from '@/app/components/RoomInstructionsPage';

export default async function EventruimtePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <RoomInstructionsPage
      locale={locale}
      roomNamespace="Gebruik.Eventruimte"
      itemKeys={['lights', 'climate', 'av', 'bar', 'wifi', 'windows']}
    />
  );
}
