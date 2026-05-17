import {Link} from '@/i18n/navigation';

export type StepCardItem = {
  href: string;
  title: string;
  summary: string;
  number?: number;
};

export default function StepCards({items}: {items: StepCardItem[]}) {
  return (
    <ol className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
          >
            {item.number !== undefined && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-base font-semibold text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
                {item.number}
              </span>
            )}
            <span className="flex flex-1 flex-col">
              <span className="text-lg font-semibold">{item.title}</span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.summary}
              </span>
            </span>
            <span
              aria-hidden
              className="text-zinc-400 transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
