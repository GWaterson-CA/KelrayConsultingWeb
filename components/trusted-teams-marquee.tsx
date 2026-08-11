"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { TrustedTeam } from "@/lib/site-content";

type TrustedTeamsMarqueeProps = {
  teams: TrustedTeam[];
};

function TeamCard({ team }: { team: TrustedTeam }) {
  const content = (
    <div className="flex h-28 w-[240px] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-6 shadow-sm transition hover:border-emerald-400/40 hover:bg-white/[0.08] sm:w-[260px]">
      <div className="flex items-center justify-center gap-4 text-center">
        {team.logoUrl ? (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white p-2">
            <Image
              src={team.logoUrl}
              alt={`${team.name} logo`}
              width={56}
              height={56}
              className="max-h-12 max-w-12 object-contain"
              unoptimized
            />
          </div>
        ) : null}
        <p className="text-sm font-medium leading-snug text-slate-200 sm:text-base">{team.name}</p>
      </div>
    </div>
  );

  if (!team.website) return content;

  return (
    <a href={team.website} target="_blank" rel="noreferrer" aria-label={`${team.name} website`} className="block">
      {content}
    </a>
  );
}

export function TrustedTeamsMarquee({ teams }: TrustedTeamsMarqueeProps) {
  const marqueeTeams = [...teams, ...teams];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="relative"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0f1e] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0f1e] to-transparent" />

      <div className="overflow-hidden">
        <div className="trusted-marquee-track flex w-max gap-4 py-1">
          {marqueeTeams.map((team, index) => (
            <TeamCard key={`${team.name}-${index}`} team={team} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
