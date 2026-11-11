import { ART, roomBackground } from "./art";
import type { Room } from "./rooms";

/** Height of an object in room units. */
export const objHeight = (ob: Room["objects"][number]) => (ob.w * ART[ob.kind].h) / ART[ob.kind].w;

/** Whole room as one SVG string (used for small thumbnails on the station map). */
export function roomSvg(room: Room, built: boolean[]): string {
  const order = room.objects.map((ob, i) => ({ ob, i })).sort((a, b) => a.ob.y + objHeight(a.ob) - (b.ob.y + objHeight(b.ob)));
  const parts = order
    .map(({ ob, i }) => {
      const a = ART[ob.kind];
      return `<svg x="${ob.x}" y="${ob.y}" width="${ob.w}" height="${objHeight(ob)}" viewBox="0 0 ${a.w} ${a.h}"${built[i] ? "" : ' class="bp"'}>${a.svg}</svg>`;
    })
    .join("");
  return roomBackground(room.theme) + parts;
}
