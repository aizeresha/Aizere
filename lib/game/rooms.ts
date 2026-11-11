import type { L, LessonType } from "../types";
import { l } from "../data/l";
import type { ObjectKind, RoomTheme } from "./art";

/**
 * GAME MAP: every course is a room of the RoboSpark station, every lesson is an object in that room.
 * Objects are listed in lesson order (first object = first lesson of the course).
 * Coordinates are in room units: the room is 1000 × 560, `x`,`y` = top-left corner, `w` = width.
 */
export interface RoomObject {
  kind: ObjectKind;
  x: number;
  y: number;
  w: number;
  name: L;
}

export interface Room {
  name: L;
  theme: RoomTheme;
  objects: RoomObject[];
  /** Position of the room on the station map, in map units (1000 × 620). */
  map: { x: number; y: number; w: number; h: number };
}

const o = (kind: ObjectKind, x: number, y: number, w: number, name: L): RoomObject => ({ kind, x, y, w, name });

const N = {
  poster: l("Poster", "Плакат", "Плакат"),
  whiteboard: l("Whiteboard", "Тақта", "Доска"),
  shelf: l("Parts shelf", "Бөлшектер сөресі", "Полка с деталями"),
  flag: l("Team banner", "Команда туы", "Флаг команды"),
  monitor: l("Big screen", "Үлкен экран", "Большой экран"),
  desk: l("Desk", "Үстел", "Стол"),
  workbench: l("Workbench", "Жұмыс үстелі", "Верстак"),
  robot: l("Robot", "Робот", "Робот"),
  computer: l("Computer", "Компьютер", "Компьютер"),
  controller: l("Driver station", "Басқару пульті", "Пульт управления"),
  trophy: l("Trophy", "Кубок", "Кубок"),
  toolbox: l("Toolbox", "Құрал жәшігі", "Ящик с инструментами"),
  gearMachine: l("Gear machine", "Тісті доңғалақ қондырғысы", "Станок с шестернями"),
  lamp: l("Sensor lamp", "Датчик шамы", "Лампа-датчик"),
  robotArm: l("Robot arm", "Робот қол", "Роборука"),
  printer3d: l("3D printer", "3D принтер", "3D-принтер"),
  plant: l("Plant", "Өсімдік", "Растение"),
  chair: l("Chair", "Орындық", "Кресло"),
  serverRack: l("Server rack", "Сервер шкафы", "Серверная стойка"),
  field: l("Game field", "Ойын алаңы", "Игровое поле"),
} satisfies Record<ObjectKind, L>;

const obj = (kind: ObjectKind, x: number, y: number, w: number) => o(kind, x, y, w, N[kind]);

export const ROOMS: Record<string, Room> = {
  "ftc-starter-bot": {
    name: l("Robot Garage", "Робот гаражы", "Гараж роботов"),
    theme: { wall: "#E9DCCB", wallDark: "#D8C4AC", floor: "#9AA3AE", floorLine: "#8A939E" },
    map: { x: 380, y: 60, w: 260, h: 190 },
    objects: [
      obj("poster", 60, 60, 90),
      obj("monitor", 200, 70, 170),
      obj("shelf", 630, 60, 170),
      obj("whiteboard", 830, 80, 150),
      obj("workbench", 40, 300, 250),
      obj("robot", 420, 290, 170),
      obj("computer", 680, 300, 210),
      obj("controller", 300, 380, 120),
      obj("trophy", 900, 360, 90),
    ],
  },
  "intro-to-robotics": {
    name: l("Workshop", "Шеберхана", "Мастерская"),
    theme: { wall: "#F1DDE5", wallDark: "#E3C3D0", floor: "#C9A57E", floorLine: "#B8946D" },
    map: { x: 80, y: 60, w: 260, h: 190 },
    objects: [
      obj("poster", 60, 60, 90),
      obj("shelf", 190, 60, 170),
      obj("whiteboard", 630, 80, 170),
      obj("gearMachine", 40, 330, 180),
      obj("lamp", 240, 250, 60),
      obj("desk", 320, 330, 220),
      obj("flag", 840, 60, 90),
      obj("robotArm", 580, 300, 170),
      obj("toolbox", 440, 450, 130),
      obj("robot", 790, 300, 160),
    ],
  },
  "cad-3d-design": {
    name: l("Design Studio", "Дизайн студиясы", "Дизайн-студия"),
    theme: { wall: "#DDE6EE", wallDark: "#C6D3DF", floor: "#D9C7A7", floorLine: "#C8B695" },
    map: { x: 680, y: 60, w: 260, h: 190 },
    objects: [
      obj("monitor", 180, 70, 190),
      obj("whiteboard", 630, 80, 170),
      obj("poster", 60, 60, 90),
      obj("computer", 40, 310, 230),
      obj("printer3d", 300, 330, 140),
      obj("shelf", 830, 60, 150),
      obj("gearMachine", 480, 330, 170),
      obj("lamp", 680, 250, 60),
      obj("robotArm", 770, 300, 180),
    ],
  },
  "programming-for-robotics": {
    name: l("Code Lab", "Код зертханасы", "Лаборатория кода"),
    theme: { wall: "#E4E0EE", wallDark: "#CFC8E0", floor: "#8E8A9E", floorLine: "#7F7B90" },
    map: { x: 180, y: 355, w: 260, h: 190 },
    objects: [
      obj("computer", 40, 310, 230),
      obj("whiteboard", 630, 80, 170),
      obj("poster", 60, 60, 90),
      obj("monitor", 180, 70, 190),
      obj("serverRack", 300, 260, 95),
      obj("flag", 840, 60, 90),
      obj("field", 420, 440, 300),
      obj("chair", 740, 360, 80),
      obj("robot", 830, 300, 150),
    ],
  },
  "ftc-fundamentals": {
    name: l("FTC Arena", "FTC аренасы", "FTC-арена"),
    theme: { wall: "#F3E6D3", wallDark: "#E6D0B1", floor: "#7E8794", floorLine: "#6F7885" },
    map: { x: 580, y: 355, w: 260, h: 190 },
    objects: [
      obj("flag", 60, 50, 90),
      obj("whiteboard", 180, 80, 180),
      obj("poster", 630, 60, 90),
      obj("field", 330, 400, 340),
      obj("desk", 40, 330, 220),
      obj("computer", 700, 310, 200),
      obj("monitor", 760, 70, 180),
      obj("controller", 260, 390, 110),
      obj("robot", 430, 300, 140),
      obj("trophy", 905, 360, 85),
    ],
  },
};

export const getRoom = (slug: string): Room | undefined => ROOMS[slug];

/* ---------------------------- rewards ---------------------------- */

/** Sparks ⚡ earned for finishing a lesson of each type. */
export const SPARKS: Record<LessonType, number> = { video: 10, quiz: 20, assignment: 40, project: 80 };

/** Sparks needed per level. */
export const SPARKS_PER_LEVEL = 100;

export function levelOf(sparks: number) {
  const level = Math.floor(sparks / SPARKS_PER_LEVEL) + 1;
  const into = sparks % SPARKS_PER_LEVEL;
  return { level, into, pct: Math.round((into / SPARKS_PER_LEVEL) * 100) };
}
