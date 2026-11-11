"use client";

import Link from "next/link";
import type { Course } from "@/lib/types";
import { courses, allLessons } from "@/lib/data/courses";
import { ROOMS, type Room } from "@/lib/game/rooms";
import { roomSvg } from "@/lib/game/render";
import { useApp } from "@/lib/state";
import { Logo } from "@/components/art";

const START_HERE = "ftc-starter-bot";
const HUB = { x: 510, y: 305 };

function useRoomState(c: Course) {
  const { user, isEnrolled, isComplete } = useApp();
  const lessons = allLessons(c);
  const enrolled = !!user && isEnrolled(c.slug);
  const built = lessons.map((ls) => enrolled && isComplete(c.slug, ls.id));
  return { built, done: built.filter(Boolean).length, total: lessons.length };
}

function RoomTile({ course, room, className = "", style }: { course: Course; room: Room; className?: string; style?: React.CSSProperties }) {
  const { t, lang } = useApp();
  const { built, done, total } = useRoomState(course);
  const complete = done === total && total > 0;
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={`group block overflow-hidden rounded-2xl bg-white ring-1 ring-burgundy/15 shadow-[0_12px_30px_-18px_rgba(74,14,37,.5)] transition-transform hover:-translate-y-1 ${className}`}
      style={style}
    >
      <div className="relative">
        <svg viewBox="0 0 1000 560" className="block h-auto w-full" aria-hidden="true" dangerouslySetInnerHTML={{ __html: roomSvg(room, built) }} />
        {course.slug === START_HERE && done === 0 && (
          <span className="tile-bounce absolute right-2 top-2 rounded-full bg-gold px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-burgundy-deep shadow ring-2 ring-white lg:text-xs">{t.game.startHere}</span>
        )}
        {complete && <span className="absolute right-2 top-2 rounded-full bg-raspberry px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white lg:text-xs">{t.game.built}</span>}
      </div>
      <div className="px-3 py-2.5 lg:px-4">
        <p className="flex items-center justify-between gap-2">
          <span className="truncate font-display text-xs font-semibold text-burgundy lg:text-sm">{room.name[lang]}</span>
          <span className="shrink-0 text-[11px] font-medium text-ink-muted lg:text-xs">{done}/{total}</span>
        </p>
        <p className="truncate text-[11px] text-ink-soft lg:text-xs">{course.title[lang]}{course.sample ? ` · ${t.common.sample}` : ""}</p>
        <div className="mt-1.5 h-1.5 rounded-full bg-blush"><div className="h-full rounded-full bg-raspberry" style={{ width: `${total ? (done / total) * 100 : 0}%` }} /></div>
      </div>
    </Link>
  );
}

/** The whole academy as a space station: every room is a course. */
export default function StationMap() {
  const { t } = useApp();
  const items = courses.filter((c) => ROOMS[c.slug]).map((c) => ({ course: c, room: ROOMS[c.slug] }));

  return (
    <div>
      {/* Map (tablet and up) */}
      <div className="relative hidden aspect-[1000/620] w-full overflow-hidden rounded-[2rem] bg-[#1B2440] sm:block" role="list" aria-label={t.game.mapTitle}>
        <svg viewBox="0 0 1000 620" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {Array.from({ length: 40 }, (_, i) => (
            <circle key={i} cx={(i * 263) % 1000} cy={(i * 151) % 620} r={i % 5 === 0 ? 1.8 : 1} fill="#F8F5F0" opacity={0.25 + (i % 4) * 0.15} />
          ))}
          <ellipse cx={HUB.x} cy={HUB.y} rx="470" ry="270" fill="none" stroke="#C39A60" strokeOpacity=".35" strokeDasharray="3 8" />
          {items.map(({ room, course }) => (
            <path key={course.slug} d={`M${HUB.x} ${HUB.y} L${room.map.x + room.map.w / 2} ${room.map.y + room.map.h / 2}`} stroke="#9AA3AE" strokeWidth="14" strokeLinecap="round" opacity=".55" />
          ))}
          <circle cx={HUB.x} cy={HUB.y} r="40" fill="#701637" stroke="#C39A60" strokeWidth="4" />
        </svg>
        <div className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center" style={{ left: `${HUB.x / 10}%`, top: `${(HUB.y / 620) * 100}%` }} aria-hidden="true">
          <span className="scale-75 rounded-full bg-cream/95 px-2 py-1 lg:scale-90"><Logo /></span>
        </div>
        {items.map(({ course, room }) => (
          <div key={course.slug} role="listitem" className="absolute" style={{ left: `${room.map.x / 10}%`, top: `${(room.map.y / 620) * 100}%`, width: `${room.map.w / 10}%` }}>
            <RoomTile course={course} room={room} />
          </div>
        ))}
      </div>

      {/* Phones: the same rooms as a list */}
      <ul className="grid gap-4 sm:hidden" aria-label={t.game.mapTitle}>
        {items.map(({ course, room }) => (
          <li key={course.slug}><RoomTile course={course} room={room} /></li>
        ))}
      </ul>
    </div>
  );
}

