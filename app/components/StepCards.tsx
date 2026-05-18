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
            className="group flex items-center gap-4 rounded-2xl bg-[#77A3A7] p-5 text-white shadow-sm transition-all hover:bg-[#658e91] hover:shadow"
          >
            {item.number !== undefined && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-base font-semibold text-white">
                {item.number}
              </span>
            )}
            <span className="flex flex-1 flex-col">
              <span className="text-lg font-semibold">{item.title}</span>
              <span className="text-sm text-white/85">{item.summary}</span>
            </span>
            <span
              aria-hidden
              className="text-white/80 transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
