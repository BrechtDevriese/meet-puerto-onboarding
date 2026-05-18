import {setRequestLocale} from 'next-intl/server';
import RoomInstructionsPage from '@/app/components/RoomInstructionsPage';

export default async function KeukenPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return (
    <RoomInstructionsPage
      locale={locale}
      roomNamespace="Gebruik.Keuken"
      itemKeys={['tableware', 'cuttingBoards', 'fridge', 'drinksFridge', 'freezer', 'microwave', 'rationalOven', 'plateWarmer', 'griddle', 'dishwasher']}
    />
  );
}
