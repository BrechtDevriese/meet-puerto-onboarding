'use client';

import {useState} from 'react';
import {Link} from '@/i18n/navigation';

type Props = {
  items: {key: string; label: string}[];
  completedMessage: string;
  nextLabel?: string;
  nextHref?: string;
};

export default function Checklist({
  items,
  completedMessage,
  nextLabel,
  nextHref
}: Props) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const allChecked = items.length > 0 && items.every((i) => checked[i.key]);

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-3">
        {items.map(({key, label}) => {
          const isOn = !!checked[key];
          return (
            <li key={key}>
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                  isOn
                    ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20'
                    : 'border-zinc-200 bg-white hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={(e) =>
                    setChecked({...checked, [key]: e.target.checked})
                  }
                  className="mt-1 h-5 w-5 shrink-0 accent-emerald-600"
                />
                <span className="leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {allChecked && (
        <div className="flex flex-col gap-3 rounded-2xl bg-emerald-50 p-5 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium">✓ {completedMessage}</p>
          {nextLabel && nextHref && (
            <Link
              href={nextHref}
              className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-700 px-5 text-sm font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              {nextLabel} →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
