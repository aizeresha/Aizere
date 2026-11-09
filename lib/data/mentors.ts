import type { Mentor } from "../types";
import { l } from "./l";

/**
 * SAMPLE mentor profiles. Replace with real, confirmed mentors before launch.
 * Do not publish real people's details without their consent.
 */
export const mentors: Mentor[] = [
  {
    id: "aruzhan",
    name: "Aruzhan K.",
    initials: "AK",
    sample: true,
    role: l("Mechanical engineer · Robotics", "Механика инженері · Робототехника", "Инженер-механик · Робототехника"),
    bio: l(
      "Designs drive systems for industrial automation and has mentored school robotics teams for five years. Loves turning complicated mechanics into simple explanations.",
      "Өнеркәсіптік автоматтандыруға арналған жетек жүйелерін жобалайды және бес жыл бойы мектеп робототехника командаларына менторлық етеді. Күрделі механиканы қарапайым түсіндіруді жақсы көреді.",
      "Проектирует приводные системы для промышленной автоматизации и пять лет менторит школьные команды по робототехнике. Любит объяснять сложную механику простыми словами."
    ),
    experience: [
      l("7 years in mechanical engineering", "Механикалық инженерияда 7 жыл", "7 лет в машиностроении"),
      l("Mentor of school robotics teams since 2021", "2021 жылдан бері мектеп командаларының менторы", "Ментор школьных команд с 2021 года"),
    ],
  },
  {
    id: "daniyar",
    name: "Daniyar S.",
    initials: "DS",
    sample: true,
    role: l("CAD designer · Product engineering", "CAD-дизайнер · Өнім инженериясы", "CAD-дизайнер · Продуктовая инженерия"),
    bio: l(
      "Creates 3D models and prototypes for hardware startups. Believes anyone can learn CAD with the right first project.",
      "Аппараттық стартаптар үшін 3D модельдер мен прототиптер жасайды. Дұрыс алғашқы жобамен кез келген адам CAD үйрене алады деп сенеді.",
      "Создаёт 3D-модели и прототипы для hardware-стартапов. Уверен, что CAD может освоить каждый — нужен правильный первый проект."
    ),
    experience: [
      l("5 years of CAD and 3D printing", "CAD және 3D басып шығаруда 5 жыл", "5 лет в CAD и 3D-печати"),
      l("Onshape and Fusion 360 trainer", "Onshape және Fusion 360 тренері", "Тренер по Onshape и Fusion 360"),
    ],
  },
  {
    id: "timur",
    name: "Timur A.",
    initials: "TA",
    sample: true,
    role: l("Software engineer · Embedded systems", "Бағдарламалық инженер · Енгізілген жүйелер", "Программист · Встраиваемые системы"),
    bio: l(
      "Writes control software for sensors and microcontrollers. Former competition robotics programmer who now helps beginners write their first robot code.",
      "Датчиктер мен микроконтроллерлерге басқару бағдарламаларын жазады. Бұрын жарыс робототехникасында бағдарламашы болған, қазір жаңадан бастаушыларға алғашқы робот кодын жазуға көмектеседі.",
      "Пишет управляющий софт для датчиков и микроконтроллеров. Бывший программист соревновательной команды, теперь помогает новичкам написать первый код для робота."
    ),
    experience: [
      l("6 years in embedded software", "Енгізілген бағдарламалауда 6 жыл", "6 лет во встраиваемой разработке"),
      l("Java, Python, C++", "Java, Python, C++", "Java, Python, C++"),
    ],
  },
  {
    id: "madina",
    name: "Madina O.",
    initials: "MO",
    sample: true,
    role: l("FTC coach · Competition strategy", "FTC жаттықтырушысы · Жарыс стратегиясы", "Тренер FTC · Стратегия соревнований"),
    bio: l(
      "Former FIRST Tech Challenge team captain, now a coach and judge volunteer. Helps new teams understand the engineering portfolio and game strategy.",
      "FIRST Tech Challenge командасының бұрынғы капитаны, қазір жаттықтырушы және ерікті төреші. Жаңа командаларға инженерлік портфолио мен ойын стратегиясын түсінуге көмектеседі.",
      "Бывший капитан команды FIRST Tech Challenge, сейчас тренер и волонтёр-судья. Помогает новым командам разобраться в инженерном портфолио и стратегии игры."
    ),
    experience: [
      l("4 FTC seasons as a team member", "Команда мүшесі ретінде 4 FTC маусымы", "4 сезона FTC в составе команды"),
      l("Volunteer judge at regional events", "Өңірлік жарыстарда ерікті төреші", "Волонтёр-судья на региональных этапах"),
    ],
  },
];

export const getMentor = (id: string) => mentors.find((m) => m.id === id);
