"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Suggestion = {
  id: number;
  title: string;
  body: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
};

type LogEntry = {
  id: string;
  date: string;
  time: string;
  observation: string;
};

const cardStyles: Record<
  number,
  {
    shell: string;
    icon: string;
    badge: string;
    border: string;
  }
> = {
  7: {
    shell: "from-[#EAF7FB] to-white",
    icon: "text-[#00749A]",
    badge: "bg-[#00749A] text-white",
    border: "border-[#8FC8D7]",
  },
  6: {
    shell: "from-[#FFF3ED] to-white",
    icon: "text-[#E17136]",
    badge: "bg-[#E17136] text-white",
    border: "border-[#F2BEA4]",
  },
  5: {
    shell: "from-[#F9EEF2] to-white",
    icon: "text-[#5C2F67]",
    badge: "bg-[#5C2F67] text-white",
    border: "border-[#C5AFCA]",
  },
  4: {
    shell: "from-[#EEF8F3] to-white",
    icon: "text-[#005341]",
    badge: "bg-[#005341] text-white",
    border: "border-[#9FD0BF]",
  },
  3: {
    shell: "from-[#FFF5F6] to-white",
    icon: "text-[#C81113]",
    badge: "bg-[#C81113] text-white",
    border: "border-[#E9A5A7]",
  },
  2: {
    shell: "from-[#FDF4EC] to-white",
    icon: "text-[#B28A73]",
    badge: "bg-[#B28A73] text-white",
    border: "border-[#D0B8AB]",
  },
  1: {
    shell: "from-[#F5F0EE] to-white",
    icon: "text-[#DB472F]",
    badge: "bg-[#DB472F] text-white",
    border: "border-[#EAB0A5]",
  },
};

const tileName = "Train Your Brain";
const storageKey = "omg-support-logbook";

const suggestions: Suggestion[] = [
  {
    id: 7,
    title: "Cleansing and clearing",
    body: "Grab your selenite or imagine it dissolving in your body cleansing and clearing",
  },
  {
    id: 6,
    title: "Child's pose",
    body: "Do the child's pose yoga or imagine doing it",
  },
  {
    id: 5,
    title: "Smell something",
    body: "Find a smell that feels good right now. Orange. Coffee. Rose",
  },
  {
    id: 4,
    title: "Notice your breath",
    body: "Notice what your breath is doing. Don't fix it or change it. Notice it.",
  },
  {
    id: 3,
    title: "Curiosity",
    body: "Ask - is Pure Love available even here? Don't assume it is, get curious.",
  },
  {
    id: 2,
    title: "Move your body",
    body: "Ask for help from the Divine how many minutes you should set your timer for and MOVE your body. Vacuum, wash dishes, dance, bounce.",
    links: [
      {
        label: "Lymph Release",
        href: "https://www.instagram.com/reel/DNohuOgx_38/?igsh=MW1hNDRmYnVtYWJ1ag==",
      },
      {
        label: "Power Up",
        href: "https://youtu.be/b_t-I-htbuE?si=NdeviOpRRNuUxG33",
      },
    ],
  },
  {
    id: 1,
    title: "Nymph energy",
    body: "Wiggle your butt. Seriously. You'll loosen it up.",
  },
];

const emptyForm = {
  date: "",
  time: "",
  observation: "",
};

function formatDateForInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatTimeForInput(date: Date) {
  return date.toTimeString().slice(0, 5);
}

function createInitialForm() {
  const now = new Date();

  return {
    ...emptyForm,
    date: formatDateForInput(now),
    time: formatTimeForInput(now),
  };
}

function getStoredEntries() {
  if (typeof window === "undefined") {
    return [];
  }

  const savedEntries = window.localStorage.getItem(storageKey);
  if (!savedEntries) {
    return [];
  }

  try {
    return JSON.parse(savedEntries) as LogEntry[];
  } catch {
    window.localStorage.removeItem(storageKey);
    return [];
  }
}

function randomSuggestionId() {
  return suggestions[Math.floor(Math.random() * suggestions.length)]?.id ?? 7;
}

function SoftIcon({ type }: { type: Suggestion["id"] }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-7 w-7",
  };

  switch (type) {
    case 7:
      return (
        <svg {...commonProps}>
          <path d="m12 2.5 3.8 6.2L12 21.2 8.2 8.7 12 2.5Z" />
          <path d="M9.8 8.8h4.4" />
          <path d="M10.2 12.2h3.6" />
          <path d="M10.8 15.8h2.4" />
        </svg>
      );
    case 6:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="6.8" r="1.4" />
          <path d="M12 8.5v4.4" />
          <path d="M12 10.8 8.6 9.8" />
          <path d="M12 10.8 15.4 9.8" />
          <path d="M12 12.9c-1.4 0-2.7 1.1-3.9 3.3" />
          <path d="M12 12.9c1.4 0 2.7 1.1 3.9 3.3" />
          <path d="M6.7 18.1h10.6" />
        </svg>
      );
    case 5:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="5.4" />
          <path d="M12 6.6v10.8" />
          <path d="M6.6 12h10.8" />
          <path d="M8.2 8.2c1.2 1.1 2.4 1.7 3.8 1.7s2.6-.6 3.8-1.7" />
          <path d="M8.2 15.8c1.2-1.1 2.4-1.7 3.8-1.7s2.6.6 3.8 1.7" />
        </svg>
      );
    case 4:
      return (
        <svg {...commonProps}>
          <path d="M6.5 9.8c1.1-1.2 2.2-1.8 3.4-1.8 1.4 0 2.2.8 2.2 2.2 0 1.7-1.3 2.5-1.3 4.2" />
          <path d="M17.5 9.8c-1.1-1.2-2.2-1.8-3.4-1.8-1.4 0-2.2.8-2.2 2.2 0 1.7 1.3 2.5 1.3 4.2" />
          <path d="M8.4 17.2c1 .7 2.2 1.1 3.6 1.1s2.6-.4 3.6-1.1" />
        </svg>
      );
    case 3:
      return (
        <svg {...commonProps}>
          <path d="m12 4.2 1.2 3.1 3.2.2-2.5 2 1 3-2.9-1.8-2.9 1.8 1-3-2.5-2 3.2-.2L12 4.2Z" />
          <path d="M12 13.8v1.9" />
          <path d="M12 18h.01" />
        </svg>
      );
    case 2:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="5.8" r="1.4" />
          <path d="M12 7.4v5.1" />
          <path d="M12 9.4 8.6 11" />
          <path d="M12 9.2 15.8 7.8" />
          <path d="M12 12.5 9.5 18" />
          <path d="M12 12.5 15.8 16.8" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <path d="M11.8 11.7c-1.4-3-4.2-4.3-6.4-2.8-1.6 1.2-1.8 3.7-.1 5.1 1.8 1.6 4.8 1.2 6.5-.8Z" />
          <path d="M12.2 11.7c1.4-3 4.2-4.3 6.4-2.8 1.6 1.2 1.8 3.7.1 5.1-1.8 1.6-4.8 1.2-6.5-.8Z" />
          <path d="M11.9 11.8c-1.6 1-2.2 2.5-1.8 4.7" />
          <path d="M12.1 11.8c1.6 1 2.2 2.5 1.8 4.7" />
          <path d="M12 10.5V8.8" />
        </svg>
      );
  }
}

function FieldIcon({ type }: { type: "date" | "time" }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
  };

  if (type === "date") {
    return (
      <svg {...commonProps}>
        <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
        <path d="M7.5 3.5v4" />
        <path d="M16.5 3.5v4" />
        <path d="M3.5 9.5h17" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3 1.8" />
    </svg>
  );
}

export default function TrainYourBrainPage() {
  const [selectedId, setSelectedId] = useState<number>(randomSuggestionId());
  const [form, setForm] = useState(createInitialForm);
  const [logEntries, setLogEntries] = useState<LogEntry[]>(getStoredEntries);

  const selectedSuggestion = useMemo(
    () => suggestions.find((suggestion) => suggestion.id === selectedId) ?? suggestions[0],
    [selectedId],
  );
  const orderedSuggestions = useMemo(() => suggestions, []);

  const handleChooseForMe = () => {
    setSelectedId(randomSuggestionId());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const entry: LogEntry = {
      id: `${Date.now()}`,
      date: form.date,
      time: form.time,
      observation: form.observation.trim(),
    };

    const nextEntries = [entry, ...logEntries];
    setLogEntries(nextEntries);
    window.localStorage.setItem(storageKey, JSON.stringify(nextEntries));
    setForm(createInitialForm());
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff8f4_0%,#f5f0ee_38%,#eef7f4_100%)] px-5 py-6 text-[#001E4B] sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 font-['Lato',sans-serif] text-sm font-semibold text-[#001E4B] shadow-[0_10px_30px_rgba(0,30,75,0.08)]"
          >
            <span aria-hidden="true">&lt;-</span>
            Home
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/80 bg-white/78 p-6 shadow-[0_22px_70px_rgba(0,30,75,0.12)] backdrop-blur">
            <p className="font-['Lato',sans-serif] text-xs uppercase tracking-[0.3em] text-[#DB472F]">
              Tile 2
            </p>
            <h1 className="mt-3 font-['Oxygen',sans-serif] text-4xl leading-tight text-[#001E4B]">
              {tileName}
            </h1>
            <p className="mt-4 max-w-2xl font-['Quicksand',sans-serif] text-lg leading-8 text-[#314d67]">
              No need to think. Pick one and do it. Or let the Universe pick for you.
            </p>

            <div className="mt-6 rounded-[1.75rem] bg-[linear-gradient(135deg,#FFF0E8_0%,#FFFFFF_100%)] p-5 shadow-[inset_0_0_0_1px_rgba(225,113,54,0.08)]">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="font-['Lato',sans-serif] text-xs uppercase tracking-[0.25em] text-[#E17136]">
                    Choose one for me
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleChooseForMe}
                  className="inline-flex w-fit items-center justify-center rounded-full bg-[#00749A] px-4 py-2 font-['Lato',sans-serif] text-sm font-semibold text-white shadow-[0_12px_22px_rgba(0,116,154,0.22)] transition hover:bg-[#005f7e]"
                >
                  Choose one for me
                </button>
              </div>

              <div className="mt-5 flex items-center gap-4 rounded-[1.5rem] bg-white p-4 shadow-[0_16px_40px_rgba(0,30,75,0.08)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-[#00749A] font-['Oxygen',sans-serif] text-3xl text-white">
                  {selectedSuggestion.id}
                </div>
                <div>
                  <p className="font-['Lato',sans-serif] text-xs uppercase tracking-[0.22em] text-[#00749A]">
                    Suggested now
                  </p>
                  <h2 className="mt-1 font-['Oxygen',sans-serif] text-2xl text-[#001E4B]">
                    {selectedSuggestion.title}
                  </h2>
                  <p className="mt-1 font-['Quicksand',sans-serif] text-base leading-7 text-[#42556d]">
                    {selectedSuggestion.body}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {orderedSuggestions.map((suggestion) => {
                const isActive = suggestion.id === selectedId;
                const style = cardStyles[suggestion.id];

                return (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => setSelectedId(suggestion.id)}
                    className={`rounded-[1.7rem] border bg-gradient-to-br p-4 text-left shadow-[0_14px_36px_rgba(0,30,75,0.08)] transition ${
                      isActive
                        ? "border-[#00749A] bg-[linear-gradient(135deg,#eaf7fb_0%,#ffffff_100%)] ring-2 ring-[#00749A]/15"
                        : `${style.border} ${style.shell} hover:-translate-y-0.5`
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center ${
                              isActive ? "text-[#00749A]" : style.icon
                            }`}
                          >
                            <SoftIcon type={suggestion.id} />
                          </div>
                          <span
                            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full px-3 font-['Lato',sans-serif] text-sm font-bold shadow-[0_8px_16px_rgba(0,30,75,0.08)] ${
                              isActive ? "bg-[#00749A] text-white" : style.badge
                            }`}
                          >
                            {suggestion.id}
                          </span>
                          <h3 className="pt-1 font-['Oxygen',sans-serif] text-lg leading-6 text-[#001E4B]">
                            {suggestion.title}
                          </h3>
                        </div>
                        <p className="mt-3 font-['Quicksand',sans-serif] text-[0.98rem] leading-7 text-[#42556d]">
                          {suggestion.body}
                        </p>
                        {suggestion.links?.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {suggestion.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-full bg-[#FFF0E8] px-3 py-2 font-['Lato',sans-serif] text-sm font-semibold text-[#DB472F] transition hover:bg-[#ffe6d8]"
                                onClick={(event) => event.stopPropagation()}
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <section className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_22px_70px_rgba(0,30,75,0.12)]">
              <p className="font-['Lato',sans-serif] text-xs uppercase tracking-[0.3em] text-[#00749A]">
                Neutral observation helps things shift FOR you
              </p>
              <h2 className="mt-3 font-['Oxygen',sans-serif] text-3xl text-[#001E4B]">
                NOTICE
              </h2>
              <p className="mt-3 font-['Quicksand',sans-serif] text-base leading-7 text-[#42556d]">
                What do you notice? Notice it don&apos;t fix it.
              </p>
              <p className="mt-2 font-['Quicksand',sans-serif] text-base leading-7 text-[#42556d]">
                Better. Worse. Same. It&apos;s all information.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-['Lato',sans-serif] text-xs uppercase tracking-[0.22em] text-[#5C2F67]">
                      Date
                    </span>
                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#00749A]">
                        <FieldIcon type="date" />
                      </div>
                      <input
                        required
                        type="date"
                        value={form.date}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, date: event.target.value }))
                        }
                        className="w-full rounded-[1.1rem] border border-[#E7DBD5] bg-[#FDF9F7] px-12 py-3 font-['Quicksand',sans-serif] outline-none transition focus:border-[#DB472F]"
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="font-['Lato',sans-serif] text-xs uppercase tracking-[0.22em] text-[#5C2F67]">
                      Time
                    </span>
                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#00749A]">
                        <FieldIcon type="time" />
                      </div>
                      <input
                        required
                        type="time"
                        value={form.time}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, time: event.target.value }))
                        }
                        className="w-full rounded-[1.1rem] border border-[#E7DBD5] bg-[#FDF9F7] px-12 py-3 font-['Quicksand',sans-serif] outline-none transition focus:border-[#DB472F]"
                      />
                    </div>
                  </label>
                </div>

                <label className="block">
                  <span className="font-['Lato',sans-serif] text-xs uppercase tracking-[0.22em] text-[#5C2F67]">
                    Notice
                  </span>
                  <textarea
                    required
                    rows={6}
                    value={form.observation}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        observation: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-[1.1rem] border border-[#E7DBD5] bg-[#FDF9F7] px-4 py-3 font-['Quicksand',sans-serif] outline-none transition focus:border-[#DB472F]"
                    placeholder="Write what you notice here..."
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#001E4B] px-5 py-3 font-['Lato',sans-serif] text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,30,75,0.28)] transition hover:bg-[#092d63]"
                >
                  Save observation
                </button>
              </form>
            </section>

            <section className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_22px_70px_rgba(0,30,75,0.12)]">
              <p className="font-['Lato',sans-serif] text-xs uppercase tracking-[0.3em] text-[#00749A]">
                Recent Observation
              </p>
              <h2 className="mt-3 font-['Oxygen',sans-serif] text-3xl text-[#001E4B]">
                Take a screenshot and send it to Johnlyn
              </h2>

              <p className="mt-3 font-['Quicksand',sans-serif] text-base leading-7 text-[#42556d]">
                What patterns are you noticing? Bring that information to your next session.
              </p>

              <div className="mt-5 space-y-3">
                {logEntries.length ? (
                  logEntries.slice(0, 5).map((entry) => (
                    <article
                      key={entry.id}
                      className="rounded-[1.4rem] bg-[#FDF9F7] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(231,219,213,0.8)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-['Oxygen',sans-serif] text-lg text-[#001E4B]">Notice</p>
                        <span className="rounded-full bg-white px-3 py-1 font-['Lato',sans-serif] text-xs uppercase tracking-[0.16em] text-[#00749A]">
                          {entry.date} {entry.time}
                        </span>
                      </div>
                      <p className="mt-3 font-['Quicksand',sans-serif] text-base leading-7 text-[#42556d]">
                        {entry.observation}
                      </p>
                    </article>
                  ))
                ) : (
                  <p className="rounded-[1.4rem] bg-[#F5F0EE] px-4 py-4 font-['Quicksand',sans-serif] text-[#5d6d81]">
                    No observations yet. Save the first one and it will appear here.
                  </p>
                )}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
