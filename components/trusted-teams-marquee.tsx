"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { TrustedTeam } from "@/lib/site-content";

type TrustedTeamsMarqueeProps = {
  teams: TrustedTeam[];
};

function TeamCard({ team }: { team: TrustedTeam }) {
  const content = (
    <div className="team-card group relative h-32 w-[250px] shrink-0 [perspective:1100px] sm:w-[280px]">
      <div className="team-card-inner relative h-full w-full rounded-2xl border border-white/10 bg-white/5 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm leading-snug text-slate-200 [backface-visibility:hidden] sm:text-base">
          {team.name}
        </div>

        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-100 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {team.logoUrl ? (
            <Image
              src={team.logoUrl}
              alt={`${team.name} logo`}
              width={220}
              height={90}
              className="max-h-16 w-full object-contain"
              unoptimized
            />
          ) : (
            <div className="text-center">
              <p className="text-sm text-slate-200">{team.name}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">Logo coming soon</p>
            </div>
          )}
        </div>
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
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#031321] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a1f1a] to-transparent" />

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
