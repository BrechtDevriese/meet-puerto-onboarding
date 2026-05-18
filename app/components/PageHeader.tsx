import {Link} from '@/i18n/navigation';

type Props = {
  backHref: string;
  backLabel: string;
  title: string;
  intro?: string;
};

export default function PageHeader({backHref, backLabel, title, intro}: Props) {
  return (
    <header className="flex flex-col gap-3">
      <Link
        href={backHref}
        className="self-start text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
      >
        ← {backLabel}
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {intro && (
        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      )}
    </header>
  );
}
