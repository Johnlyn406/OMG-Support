import Link from "next/link";

const tiles = [
  {
    title: "Spiritual Practice",
    subtitle: "Consistent",
    description:
      "Connect body, mind, and spirit. Track how often you reconnect with source power.",
    accent: "from-[#00749A] to-[#005341]",
    available: false,
  },
  {
    title: "Train your Brain",
    subtitle: "Compassion not judgment",
    description:
      "Choose a nurturing suggestion, do something different, and record what shifted.",
    accent: "from-[#E17136] to-[#DB472F]",
    available: true,
    href: "/train-your-brain",
  },
  {
    title: "Time + Energy Tracker",
    subtitle: "Awareness of your capacity",
    description:
      "Notice habits, energy, and alignment so daily rhythms become more visible.",
    accent: "from-[#5C2F67] to-[#001E4B]",
    available: false,
  },
  {
    title: "Immersion Therapy",
    subtitle: "Gentle + loving",
    description:
      "Strengthen your inner muscles in a way that feels supportive rather than harsh.",
    accent: "from-[#B28A73] to-[#D0B8AB]",
    available: false,
  },
];

function TileIcon({ title }: { title: string }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
  };

  switch (title) {
    case "Spiritual Practice":
      return (
        <svg {...commonProps}>
          <path d="M12 3v18" />
          <path d="M8 7c1.1 1.7 2.4 2.8 4 3.4 1.6-.6 2.9-1.7 4-3.4" />
          <path d="M7 14c1.4 1.2 3.1 2 5 2.4 1.9-.4 3.6-1.2 5-2.4" />
        </svg>
      );
    case "Train your Brain":
      return (
        <svg {...commonProps}>
          <path d="M9 6.5A3.5 3.5 0 0 1 15 4a3.5 3.5 0 0 1 4 5.2A4.5 4.5 0 0 1 17.5 18H9.8A4.8 4.8 0 0 1 5 13.2c0-2 1.2-3.8 3-4.5A3.6 3.6 0 0 1 9 6.5Z" />
          <path d="M10 12c.8.7 1.6 1 2.4 1s1.6-.3 2.6-1" />
          <path d="M12.2 9.5h.1" />
          <path d="M15.2 10.2h.1" />
        </svg>
      );
    case "Time + Energy Tracker":
      return (
        <svg {...commonProps}>
          <path d="M12 4v8l4 2" />
          <circle cx="12" cy="12" r="8" />
          <path d="M7 19l-1.5 1.5" />
          <path d="M17 19l1.5 1.5" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <path d="M12 20s-6-3.7-6-9a3.5 3.5 0 0 1 6-2.3A3.5 3.5 0 0 1 18 11c0 5.3-6 9-6 9Z" />
        </svg>
      );
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7f2_0%,#f5f0ee_45%,#f0ece8_100%)] px-5 py-8 text-[#001E4B] sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-[0_20px_80px_rgba(0,30,75,0.12)] backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-['Lato',sans-serif] text-sm uppercase tracking-[0.3em] text-[#00749A]">
                OMG! Support
              </p>
              <h1 className="mt-3 font-['Oxygen',sans-serif] text-4xl leading-tight text-[#001E4B] sm:text-5xl">
                Choose the support that meets you where you are.
              </h1>
              <p className="mt-4 max-w-xl font-['Quicksand',sans-serif] text-lg leading-8 text-[#26435e]">
                Designed for those moments when something feels slightly off and
                you want a gentle next step on your phone.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {tiles.map((tile) => {
            return tile.available && tile.href ? (
              <Link
                key={tile.title}
                href={tile.href}
                className="group block h-full rounded-[2rem] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E17136]/35"
              >
                <article className="flex h-full flex-col rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_18px_50px_rgba(0,30,75,0.1)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_60px_rgba(0,30,75,0.14)]">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br ${tile.accent} text-white shadow-lg`}
                  >
                    <TileIcon title={tile.title} />
                  </div>
                  <p className="mt-5 font-['Lato',sans-serif] text-xs uppercase tracking-[0.25em] text-[#00749A]">
                    {tile.subtitle}
                  </p>
                  <h2 className="mt-2 font-['Oxygen',sans-serif] text-2xl text-[#001E4B]">
                    {tile.title}
                  </h2>
                  <p className="mt-4 flex-1 font-['Quicksand',sans-serif] text-base leading-7 text-[#42556d]">
                    {tile.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-[#FFF0E8] px-4 py-2 font-['Lato',sans-serif] text-sm font-semibold text-[#DB472F]">
                      Open tile
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-['Oxygen',sans-serif] text-2xl text-[#DB472F]"
                    >
                      &gt;
                    </span>
                  </div>
                </article>
              </Link>
            ) : (
              <div key={tile.title} className="cursor-not-allowed opacity-95">
                <article className="flex h-full flex-col rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_18px_50px_rgba(0,30,75,0.1)]">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br ${tile.accent} text-white shadow-lg`}
                  >
                    <TileIcon title={tile.title} />
                  </div>
                  <p className="mt-5 font-['Lato',sans-serif] text-xs uppercase tracking-[0.25em] text-[#00749A]">
                    {tile.subtitle}
                  </p>
                  <h2 className="mt-2 font-['Oxygen',sans-serif] text-2xl text-[#001E4B]">
                    {tile.title}
                  </h2>
                  <p className="mt-4 flex-1 font-['Quicksand',sans-serif] text-base leading-7 text-[#42556d]">
                    {tile.description}
                  </p>
                  <div className="mt-6">
                    <span className="inline-flex items-center rounded-full bg-[#F5F0EE] px-4 py-2 font-['Lato',sans-serif] text-sm font-semibold text-[#5C2F67]">
                      Coming soon
                    </span>
                  </div>
                </article>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
