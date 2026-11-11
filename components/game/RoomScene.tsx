"use client";

import Link from "next/link";
import type { Course } from "@/lib/types";
import { allLessons } from "@/lib/data/courses";
import { ART, roomBackground } from "@/lib/game/art";
import { getRoom, SPARKS } from "@/lib/game/rooms";
import { objHeight } from "@/lib/game/render";
import { useApp, fmt } from "@/lib/state";
import { IconBolt } from "@/components/icons";

const FLOOR_Y = 330;

/**
 * A course as a room. Each lesson is an object: a blueprint until the lesson is finished,
 * then it is "built". Objects are real links, so the room works with keyboard and screen readers.
 */
export default function RoomScene({ course, justBuilt }: { course: Course; justBuilt?: string }) {
  const { t, lang, user, isEnrolled, isComplete } = useApp();
  const room = getRoom(course.slug);
  if (!room) return null;

  const lessons = allLessons(course);
  const enrolled = !!user && isEnrolled(course.slug);
  const built = lessons.map((ls) => enrolled && isComplete(course.slug, ls.id));
  const nextIdx = built.findIndex((b) => !b);
  const done = built.filter(Boolean).length;

  return (
    <div className="relative">
      <div className="relative aspect-[1000/560] w-full overflow-hidden rounded-3xl ring-1 ring-burgundy/15 shadow-[0_20px_50px_-25px_rgba(74,14,37,.45)]">
        <svg viewBox="0 0 1000 560" className="absolute inset-0 h-full w-full" aria-hidden="true" dangerouslySetInnerHTML={{ __html: roomBackground(room.theme) }} />

        {room.objects.map((ob, i) => {
          const ls = lessons[i];
          if (!ls) return null;
          const h = objHeight(ob);
          const isBuilt = built[i];
          const isNext = i === nextIdx;
          const onFloor = ob.y + h > FLOOR_Y + 40;
          const a = ART[ob.kind];
          const status = isBuilt ? t.game.built : t.game.blueprint;
          return (
            <Link
              key={ls.id}
              href={`/courses/${course.slug}/learn/${ls.id}`}
              aria-label={`${ls.title[lang]} — ${ob.name[lang]}. ${status}`}
              className="group absolute block outline-none hover:!z-[700] focus-visible:!z-[700]"
              style={{ left: `${ob.x / 10}%`, top: `${(ob.y / 560) * 100}%`, width: `${ob.w / 10}%`, zIndex: Math.round(ob.y + h) }}
            >
              {onFloor && <span aria-hidden="true" className="absolute -bottom-[3%] left-[8%] right-[8%] h-[10%] rounded-[50%] bg-black/20 blur-[3px]" />}
              <svg
                viewBox={`0 0 ${a.w} ${a.h}`}
                className={`relative block h-auto w-full transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-[1.04] group-focus-visible:scale-[1.04] ${isBuilt ? "" : "bp"} ${justBuilt === ls.id ? "build-pop" : ""}`}
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: a.svg }}
              />
              {justBuilt === ls.id && <Sparkles />}
              {isNext && (
                <span aria-hidden="true" className="next-bounce absolute -top-[14%] left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-burgundy-deep shadow-md ring-2 ring-white sm:h-9 sm:w-9 sm:text-base">
                  !
                </span>
              )}
              <span className={`pointer-events-none absolute left-1/2 z-10 hidden ${ob.y < 200 ? "top-full mt-2" : "bottom-full mb-2"} w-max max-w-[220px] -translate-x-1/2 rounded-2xl bg-burgundy-deep px-3 py-2 text-left text-xs text-cream shadow-lg group-hover:block group-focus-visible:block`}>
                <span className="block font-semibold">{ls.title[lang]}</span>
                <span className="mt-0.5 flex items-center gap-1 text-cream/75">
                  {t.common.lessonTypes[ls.type]} · {isBuilt ? t.game.built : <><IconBolt className="h-3 w-3 text-gold" />{fmt(t.game.reward, { n: SPARKS[ls.type] })}</>}
                </span>
              </span>
            </Link>
          );
        })}

        <div className="pointer-events-none absolute left-3 top-3 z-[600] rounded-2xl bg-white/90 px-3 py-2 shadow-sm backdrop-blur sm:left-4 sm:top-4 sm:px-4">
          <p className="font-display text-xs font-semibold text-burgundy sm:text-sm">{room.name[lang]}</p>
          <p className="text-[11px] text-ink-soft sm:text-xs">{fmt(t.game.restored, { d: done, t: lessons.length })}</p>
          <div className="mt-1 h-1.5 w-24 rounded-full bg-blush sm:w-32"><div className="h-full rounded-full bg-raspberry transition-all" style={{ width: `${(done / lessons.length) * 100}%` }} /></div>
        </div>
      </div>
      {done === lessons.length && lessons.length > 0 && (
        <p className="mt-3 text-center font-display text-sm font-semibold text-burgundy" role="status">{t.game.roomDone}</p>
      )}
    </div>
  );
}

function Sparkles() {
  const pts = [
    [10, 5], [85, 0], [50, -12], [0, 55], [95, 50], [30, 90], [75, 85],
  ];
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      {pts.map(([x, y], i) => (
        <svg key={i} viewBox="0 0 24 24" className="sparkle absolute h-[18%] w-[18%] text-gold" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 90}ms` }}>
          <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}
