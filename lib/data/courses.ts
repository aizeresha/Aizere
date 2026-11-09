import type { Course, Lesson, Module, L, LessonType, QuizQuestion } from "../types";
import { l } from "./l";

/**
 * SAMPLE course content.
 *
 * To publish a real video: set `videoUrl` on a lesson to an embed URL, e.g.
 *   videoUrl: "https://www.youtube-nocookie.com/embed/VIDEO_ID", videoLang: "ru"
 * Lessons without `videoUrl` show an honest "video not uploaded yet" placeholder.
 * When Supabase is connected, this file is replaced by `courses` / `modules` / `lessons` tables.
 */

type Spec = [LessonType, number, L, L, (L[] | QuizQuestion[])?];

function build(slug: string, mods: { title: L; lessons: Spec[] }[]): Module[] {
  return mods.map((m, mi) => ({
    id: `${slug}-m${mi + 1}`,
    title: m.title,
    lessons: m.lessons.map(([type, duration, title, description, extra], li): Lesson => ({
      id: `m${mi + 1}l${li + 1}`,
      type,
      duration,
      title,
      description,
      preview: mi === 0 && li === 0,
      videoLang: type === "video" ? "ru" : undefined,
      notes: type === "quiz" ? undefined : (extra as L[] | undefined),
      quiz: type === "quiz" ? (extra as QuizQuestion[]) : undefined,
    })),
  }));
}

const q = (question: L, options: L[], answer: number): QuizQuestion => ({ q: question, options, answer });

const finalModule = (task: L): { title: L; lessons: Spec[] } => ({
  title: l("Module 4: Final Project", "4-модуль: Қорытынды жоба", "Модуль 4: Финальный проект"),
  lessons: [
    ["video", 8, l("Final project brief", "Қорытынды жобаның тапсырмасы", "Задание финального проекта"), task],
    [
      "project",
      120,
      l("Submit your final project", "Қорытынды жобаны жіберу", "Отправка финального проекта"),
      l(
        "Submit your project with a short write-up. A mentor will review it and leave feedback. Once approved, you receive your certificate.",
        "Жобаңды қысқа сипаттамамен жібер. Ментор оны тексеріп, пікір қалдырады. Мақұлданғаннан кейін сертификат аласың.",
        "Отправь проект с кратким описанием. Ментор проверит его и оставит отзыв. После одобрения ты получишь сертификат."
      ),
    ],
  ],
});

export const courses: Course[] = [
  {
    slug: "intro-to-robotics",
    category: "robotics",
    levels: ["beginner"],
    hours: 6,
    languages: ["ru", "kz", "en"],
    mentorId: "aruzhan",
    motif: "gear",
    sample: true,
    title: l("Introduction to Robotics", "Робототехникаға кіріспе", "Введение в робототехнику"),
    short: l(
      "Robotics fundamentals: motors, sensors and the basic engineering ideas behind every robot.",
      "Робототехника негіздері: моторлар, датчиктер және әр роботтың артындағы инженерлік идеялар.",
      "Основы робототехники: моторы, датчики и базовые инженерные идеи, на которых строится любой робот."
    ),
    description: l(
      "Your first step into robotics. You'll learn what a robot is made of, how motors create motion, how sensors let a robot understand the world, and how engineers design a robot step by step. No previous experience or equipment needed — assignments use paper, cardboard and free online tools.",
      "Робототехникаға алғашқы қадамың. Робот неден тұратынын, моторлар қозғалысты қалай жасайтынын, датчиктер роботқа әлемді қалай түсінуге көмектесетінін және инженерлер роботты кезең-кезеңімен қалай жобалайтынын үйренесің. Тәжірибе мен жабдық қажет емес — тапсырмаларда қағаз, картон және тегін онлайн құралдар қолданылады.",
      "Твой первый шаг в робототехнику. Ты узнаешь, из чего состоит робот, как моторы создают движение, как датчики помогают роботу понимать мир и как инженеры проектируют робота шаг за шагом. Опыт и оборудование не нужны — в заданиях используются бумага, картон и бесплатные онлайн-инструменты."
    ),
    outcomes: [
      l("Explain the main parts of a robot", "Роботтың негізгі бөліктерін түсіндіру", "Объяснять основные части робота"),
      l("Understand how DC motors and servos work", "Тұрақты ток моторлары мен сервоприводтардың жұмысын түсіну", "Понимать, как работают моторы и сервоприводы"),
      l("Choose the right sensor for a task", "Тапсырмаға сай датчикті таңдау", "Выбирать подходящий датчик для задачи"),
      l("Follow the engineering design process", "Инженерлік жобалау процесін қолдану", "Применять инженерный процесс проектирования"),
    ],
    modules: build("intro-to-robotics", [
      {
        title: l("Module 1: Introduction", "1-модуль: Кіріспе", "Модуль 1: Введение"),
        lessons: [
          [
            "video",
            9,
            l("What is a robot?", "Робот деген не?", "Что такое робот?"),
            l(
              "We define what makes a machine a robot and look at robots in factories, hospitals and space.",
              "Машинаны робот ететін не екенін анықтап, зауыттардағы, ауруханалардағы және ғарыштағы роботтарды қарастырамыз.",
              "Разбираемся, что делает машину роботом, и смотрим на роботов на заводах, в больницах и в космосе."
            ),
            [
              l("A robot senses, thinks and acts: sensors → controller → actuators.", "Робот сезеді, ойлайды және әрекет етеді: датчиктер → контроллер → жетектер.", "Робот чувствует, думает и действует: датчики → контроллер → приводы."),
              l("Not every automatic machine is a robot — a robot can react to its environment.", "Әр автоматты машина робот емес — робот қоршаған ортаға әрекет ете алады.", "Не каждая автоматическая машина — робот: робот реагирует на окружающую среду."),
              l("Main subsystems: structure, drive, power, sensors, control.", "Негізгі жүйелер: құрылым, жетек, қуат, датчиктер, басқару.", "Основные подсистемы: конструкция, привод, питание, датчики, управление."),
            ],
          ],
          [
            "video",
            12,
            l("Parts of a robot", "Роботтың бөліктері", "Из чего состоит робот"),
            l(
              "A tour of a real competition robot: chassis, motors, battery, controller and wiring.",
              "Нағыз жарыс роботына шолу: шасси, моторлар, батарея, контроллер және сымдар.",
              "Разбираем настоящего соревновательного робота: шасси, моторы, батарея, контроллер и проводка."
            ),
            [
              l("The chassis is the robot's skeleton — it holds everything together.", "Шасси — роботтың қаңқасы, ол бәрін біріктіреді.", "Шасси — скелет робота, оно держит всё вместе."),
              l("The controller is the brain; the battery is the heart.", "Контроллер — ми, батарея — жүрек.", "Контроллер — мозг, батарея — сердце."),
            ],
          ],
          [
            "quiz",
            5,
            l("Knowledge check", "Білімді тексеру", "Проверка знаний"),
            l("Three quick questions about module 1.", "1-модуль бойынша үш қысқа сұрақ.", "Три коротких вопроса по модулю 1."),
            [
              q(
                l("Which chain describes how a robot works?", "Робот қалай жұмыс істейтінін қай тізбек сипаттайды?", "Какая цепочка описывает работу робота?"),
                [
                  l("Sense → Think → Act", "Сезу → Ойлау → Әрекет", "Чувствовать → Думать → Действовать"),
                  l("Build → Paint → Sell", "Құрастыру → Бояу → Сату", "Собрать → Покрасить → Продать"),
                  l("Charge → Wait → Stop", "Зарядтау → Күту → Тоқтау", "Зарядить → Ждать → Остановиться"),
                ],
                0
              ),
              q(
                l("Which part is the robot's 'brain'?", "Қай бөлік роботтың «миы»?", "Какая часть — «мозг» робота?"),
                [l("Battery", "Батарея", "Батарея"), l("Controller", "Контроллер", "Контроллер"), l("Wheel", "Дөңгелек", "Колесо")],
                1
              ),
              q(
                l("What makes a robot different from a simple automatic machine?", "Роботтың қарапайым автоматты машинадан айырмашылығы неде?", "Чем робот отличается от простой автоматической машины?"),
                [
                  l("It is always humanoid", "Ол әрқашан адамға ұқсайды", "Он всегда похож на человека"),
                  l("It reacts to its environment", "Ол қоршаған ортаға әрекет етеді", "Он реагирует на окружающую среду"),
                  l("It is made of metal", "Ол металдан жасалған", "Он сделан из металла"),
                ],
                1
              ),
            ],
          ],
        ],
      },
      {
        title: l("Module 2: Core Concepts", "2-модуль: Негізгі ұғымдар", "Модуль 2: Основные понятия"),
        lessons: [
          [
            "video",
            14,
            l("Motors and motion", "Моторлар және қозғалыс", "Моторы и движение"),
            l("DC motors, servos, gears and why torque matters.", "Тұрақты ток моторлары, сервоприводтар, тісті доңғалақтар және айналу моментінің маңызы.", "Моторы постоянного тока, сервоприводы, шестерни и почему важен крутящий момент."),
            [
              l("Speed and torque trade off: gears let you choose between them.", "Жылдамдық пен момент бір-біріне әсер етеді: тісті доңғалақтар арасынан таңдауға мүмкіндік береді.", "Скорость и момент связаны: шестерни позволяют выбрать баланс."),
              l("Servos rotate to a precise angle; DC motors spin continuously.", "Серво нақты бұрышқа бұрылады; тұрақты ток моторы үздіксіз айналады.", "Серво поворачивается на точный угол; мотор постоянного тока крутится непрерывно."),
            ],
          ],
          [
            "video",
            11,
            l("Sensors: how robots perceive", "Датчиктер: роботтар қалай қабылдайды", "Датчики: как робот воспринимает мир"),
            l("Touch, distance, colour and IMU sensors with real examples.", "Жанасу, қашықтық, түс және IMU датчиктері нақты мысалдармен.", "Датчики касания, расстояния, цвета и IMU на реальных примерах."),
            [
              l("Distance sensors use light or sound to measure how far an object is.", "Қашықтық датчиктері нысанға дейінгі қашықтықты жарық немесе дыбыс арқылы өлшейді.", "Датчики расстояния измеряют дистанцию светом или звуком."),
              l("An IMU measures rotation and acceleration — useful for driving straight.", "IMU айналу мен үдеуді өлшейді — түзу жүру үшін пайдалы.", "IMU измеряет поворот и ускорение — полезно для езды по прямой."),
            ],
          ],
          [
            "assignment",
            30,
            l("Assignment: design a sensor robot", "Тапсырма: датчикті робот жобалау", "Задание: робот с датчиками"),
            l(
              "Pick a real problem at home or school. Sketch a robot that solves it and explain which motors and sensors it needs and why.",
              "Үйдегі немесе мектептегі нақты мәселені таңда. Оны шешетін роботтың эскизін салып, қандай моторлар мен датчиктер керек екенін және неге керек екенін түсіндір.",
              "Выбери реальную проблему дома или в школе. Нарисуй робота, который её решает, и объясни, какие моторы и датчики ему нужны и почему."
            ),
          ],
        ],
      },
      {
        title: l("Module 3: Application", "3-модуль: Қолдану", "Модуль 3: Применение"),
        lessons: [
          [
            "video",
            13,
            l("The engineering design process", "Инженерлік жобалау процесі", "Инженерный процесс проектирования"),
            l("Define, brainstorm, prototype, test, improve — the loop every engineer uses.", "Анықтау, идеялар, прототип, сынақ, жетілдіру — әр инженер қолданатын цикл.", "Определить, придумать, сделать прототип, протестировать, улучшить — цикл каждого инженера."),
            [l("Prototypes should be fast and cheap — cardboard is a real engineering material!", "Прототиптер жылдам әрі арзан болуы керек — картон да инженерлік материал!", "Прототипы должны быть быстрыми и дешёвыми — картон тоже инженерный материал!")],
          ],
          [
            "assignment",
            45,
            l("Project task: cardboard gripper", "Жоба тапсырмасы: картон қармауыш", "Проектное задание: захват из картона"),
            l(
              "Build a simple gripper from cardboard and string that can pick up a pencil. Document two design iterations with photos.",
              "Қарындашты көтере алатын картон мен жіптен қарапайым қармауыш жаса. Екі нұсқасын фотомен құжатта.",
              "Собери простой захват из картона и нитки, который может поднять карандаш. Задокументируй две итерации с фото."
            ),
          ],
        ],
      },
      finalModule(
        l(
          "Design a robot concept for your community: a sketch, a list of subsystems and a short video or slide explaining how it works.",
          "Өз қауымдастығыңа арналған робот концепциясын жобала: эскиз, жүйелер тізімі және оның қалай жұмыс істейтінін түсіндіретін қысқа бейне немесе слайд.",
          "Придумай концепт робота для своего района: эскиз, список подсистем и короткое видео или слайд о том, как он работает."
        )
      ),
    ]),
  },
  {
    slug: "cad-3d-design",
    category: "cad",
    levels: ["beginner"],
    hours: 8,
    languages: ["ru", "en"],
    mentorId: "daniyar",
    motif: "cube",
    sample: true,
    title: l("CAD & 3D Design", "CAD және 3D жобалау", "CAD и 3D-проектирование"),
    short: l(
      "Learn 3D modelling in free browser-based CAD and design simple mechanical parts.",
      "Тегін браузерлік CAD-та 3D модельдеуді үйреніп, қарапайым механикалық бөлшектерді жобала.",
      "Освой 3D-моделирование в бесплатном браузерном CAD и спроектируй простые механические детали."
    ),
    description: l(
      "Every robot starts as a 3D model. In this course you'll use Onshape — free and running in your browser, even on a school laptop — to sketch, extrude and assemble real robot parts.",
      "Әр робот 3D модельден басталады. Бұл курста Onshape-ті — тегін және браузерде, тіпті мектеп ноутбугында да жұмыс істейтін — қолданып, нағыз робот бөлшектерін сызасың, созасың және құрастырасың.",
      "Каждый робот начинается с 3D-модели. В этом курсе ты будешь работать в Onshape — бесплатно и прямо в браузере, даже на школьном ноутбуке — рисовать эскизы, выдавливать и собирать настоящие детали робота."
    ),
    outcomes: [
      l("Create 2D sketches with constraints", "Шектеулері бар 2D эскиздер жасау", "Создавать 2D-эскизы со связями"),
      l("Turn sketches into 3D parts", "Эскиздерді 3D бөлшектерге айналдыру", "Превращать эскизы в 3D-детали"),
      l("Build a simple assembly", "Қарапайым жинақ құрастыру", "Собирать простую сборку"),
      l("Prepare a part for 3D printing", "Бөлшекті 3D басып шығаруға дайындау", "Готовить деталь к 3D-печати"),
    ],
    modules: build("cad-3d-design", [
      {
        title: l("Module 1: Introduction", "1-модуль: Кіріспе", "Модуль 1: Введение"),
        lessons: [
          ["video", 8, l("What is CAD?", "CAD деген не?", "Что такое CAD?"), l("Why engineers model before they build, and a first look at Onshape.", "Неліктен инженерлер құрастырмас бұрын модельдейді және Onshape-пен алғашқы танысу.", "Зачем инженеры моделируют до сборки, и первое знакомство с Onshape."), [l("Create a free Onshape education account.", "Тегін Onshape білім беру аккаунтын аш.", "Создай бесплатный учебный аккаунт Onshape.")]],
          ["quiz", 4, l("Knowledge check", "Білімді тексеру", "Проверка знаний"), l("Two quick questions.", "Екі қысқа сұрақ.", "Два коротких вопроса."), [
            q(l("What does CAD stand for?", "CAD нені білдіреді?", "Что означает CAD?"), [l("Computer-Aided Design", "Компьютерлік жобалау", "Компьютерное проектирование"), l("Cardboard And Duct tape", "Картон және скотч", "Картон и скотч"), l("Central Automatic Drive", "Орталық автоматты жетек", "Центральный автоматический привод")], 0),
            q(l("Where does Onshape run?", "Onshape қайда жұмыс істейді?", "Где работает Onshape?"), [l("Only on gaming PCs", "Тек ойын компьютерлерінде", "Только на игровых ПК"), l("In a web browser", "Веб-браузерде", "В браузере"), l("Only on phones", "Тек телефонда", "Только на телефоне")], 1),
          ]],
        ],
      },
      {
        title: l("Module 2: Core Concepts", "2-модуль: Негізгі ұғымдар", "Модуль 2: Основные понятия"),
        lessons: [
          ["video", 15, l("Sketches and constraints", "Эскиздер және шектеулер", "Эскизы и связи"), l("Lines, circles, dimensions and constraints.", "Сызықтар, шеңберлер, өлшемдер және шектеулер.", "Линии, окружности, размеры и связи."), [l("A fully constrained sketch turns black — nothing can move by accident.", "Толық шектелген эскиз қара түске боялады.", "Полностью определённый эскиз становится чёрным — ничего не сдвинется случайно.")]],
          ["video", 12, l("Extrude, revolve, fillet", "Созу, айналдыру, дөңгелектеу", "Выдавливание, вращение, скругление"), l("Turning 2D sketches into solid parts.", "2D эскиздерді қатты бөлшектерге айналдыру.", "Превращаем 2D-эскизы в твёрдые детали."), [l("Fillets make parts stronger and safer to hold.", "Дөңгелектеу бөлшектерді берік әрі қауіпсіз етеді.", "Скругления делают детали прочнее и безопаснее.")]],
          ["assignment", 40, l("Assignment: motor mount", "Тапсырма: мотор бекіткіші", "Задание: крепление мотора"), l("Model a bracket that holds a small motor. Share a public Onshape link.", "Шағын моторды ұстайтын кронштейнді модельде. Onshape жария сілтемесін бөліс.", "Смоделируй кронштейн для небольшого мотора. Поделись публичной ссылкой Onshape.")],
        ],
      },
      {
        title: l("Module 3: Application", "3-модуль: Қолдану", "Модуль 3: Применение"),
        lessons: [
          ["video", 14, l("Assemblies and mates", "Жинақтар және байланыстар", "Сборки и сопряжения"), l("Combine parts and make them move together.", "Бөлшектерді біріктіріп, бірге қозғалту.", "Соединяем детали и заставляем их двигаться вместе."), [l("Use revolute mates for wheels and arms.", "Дөңгелектер мен иінтіректер үшін айналмалы байланысты қолдан.", "Для колёс и рычагов используй вращательные сопряжения.")]],
          ["assignment", 45, l("Project task: a simple wheel assembly", "Жоба тапсырмасы: дөңгелек жинағы", "Проектное задание: сборка колеса"), l("Assemble a wheel, axle and your motor mount.", "Дөңгелекті, білікті және мотор бекіткішін құрастыр.", "Собери колесо, ось и своё крепление мотора.")],
        ],
      },
      finalModule(l("Design a small robot arm with at least three parts and one moving joint.", "Кемінде үш бөлшегі және бір қозғалмалы буыны бар шағын робот қолын жобала.", "Спроектируй небольшую роботизированную руку минимум из трёх деталей с одним подвижным шарниром.")),
    ]),
  },
  {
    slug: "programming-for-robotics",
    category: "programming",
    levels: ["beginner", "intermediate"],
    hours: 10,
    languages: ["ru", "kz"],
    mentorId: "timur",
    motif: "code",
    sample: true,
    title: l("Programming for Robotics", "Робототехникаға арналған бағдарламалау", "Программирование для робототехники"),
    short: l(
      "Programming logic, algorithms and robot control — from first variable to autonomous driving.",
      "Бағдарламалау логикасы, алгоритмдер және роботты басқару — алғашқы айнымалыдан автономды жүруге дейін.",
      "Логика программирования, алгоритмы и управление роботом — от первой переменной до автономной езды."
    ),
    description: l(
      "Learn to think like a programmer. We start with logic and simple algorithms in a free online simulator, then write code that reads sensors and controls motors.",
      "Бағдарламашы сияқты ойлауды үйрен. Тегін онлайн симуляторда логика мен қарапайым алгоритмдерден бастап, датчиктерді оқитын және моторларды басқаратын код жазамыз.",
      "Научись думать как программист. Начнём с логики и простых алгоритмов в бесплатном онлайн-симуляторе, а затем напишем код, который читает датчики и управляет моторами."
    ),
    outcomes: [
      l("Use variables, conditions and loops", "Айнымалыларды, шарттарды және циклдерді қолдану", "Использовать переменные, условия и циклы"),
      l("Write an algorithm as steps and code", "Алгоритмді қадамдар мен код түрінде жазу", "Записывать алгоритм шагами и кодом"),
      l("Read sensor values in code", "Кодта датчик мәндерін оқу", "Читать значения датчиков в коде"),
      l("Program a simple autonomous routine", "Қарапайым автономды бағдарлама жазу", "Программировать простой автономный режим"),
    ],
    modules: build("programming-for-robotics", [
      {
        title: l("Module 1: Introduction", "1-модуль: Кіріспе", "Модуль 1: Введение"),
        lessons: [
          ["video", 10, l("Thinking in algorithms", "Алгоритмдермен ойлау", "Мыслить алгоритмами"), l("Break a task into precise steps a robot can follow.", "Тапсырманы робот орындай алатын нақты қадамдарға бөл.", "Разбиваем задачу на точные шаги, которые может выполнить робот."), [l("Computers do exactly what you say — not what you mean.", "Компьютер сен ойлағанды емес, айтқаныңды дәл орындайды.", "Компьютер делает ровно то, что ты сказал, а не то, что имел в виду.")]],
          ["quiz", 4, l("Knowledge check", "Білімді тексеру", "Проверка знаний"), l("Two quick questions.", "Екі қысқа сұрақ.", "Два коротких вопроса."), [
            q(l("Which structure repeats an action?", "Қай құрылым әрекетті қайталайды?", "Какая конструкция повторяет действие?"), [l("Loop", "Цикл", "Цикл"), l("Variable", "Айнымалы", "Переменная"), l("Comment", "Түсініктеме", "Комментарий")], 0),
            q(l("Which structure makes a decision?", "Қай құрылым шешім қабылдайды?", "Какая конструкция принимает решение?"), [l("Loop", "Цикл", "Цикл"), l("If / else", "If / else", "If / else"), l("Print", "Print", "Print")], 1),
          ]],
        ],
      },
      {
        title: l("Module 2: Core Concepts", "2-модуль: Негізгі ұғымдар", "Модуль 2: Основные понятия"),
        lessons: [
          ["video", 13, l("Variables, conditions, loops", "Айнымалылар, шарттар, циклдер", "Переменные, условия, циклы"), l("The three building blocks of every program.", "Әр бағдарламаның үш негізгі блогы.", "Три кирпичика любой программы."), [l("Name variables so a teammate understands them: leftMotorPower, not x.", "Айнымалыларға командалас түсінетін ат бер: x емес, leftMotorPower.", "Называй переменные понятно: leftMotorPower, а не x.")]],
          ["video", 12, l("Reading sensors", "Датчиктерді оқу", "Чтение датчиков"), l("Get values from distance and colour sensors and react to them.", "Қашықтық және түс датчиктерінен мән алып, оларға әрекет ету.", "Получаем значения с датчиков расстояния и цвета и реагируем на них."), [l("Sensor values are noisy — compare to a threshold, not to an exact number.", "Датчик мәндері шуылды — нақты санмен емес, шекті мәнмен салыстыр.", "Показания датчиков шумят — сравнивай с порогом, а не с точным числом.")]],
          ["assignment", 40, l("Assignment: obstacle stop", "Тапсырма: кедергіде тоқтау", "Задание: остановка перед препятствием"), l("In the simulator, program a robot that drives forward and stops 20 cm before a wall.", "Симуляторда алға жүріп, қабырғаға 20 см қалғанда тоқтайтын роботты бағдарламала.", "В симуляторе запрограммируй робота, который едет вперёд и останавливается за 20 см до стены.")],
        ],
      },
      {
        title: l("Module 3: Application", "3-модуль: Қолдану", "Модуль 3: Применение"),
        lessons: [
          ["video", 15, l("Line following", "Сызық бойымен жүру", "Езда по линии"), l("A classic algorithm using a colour sensor.", "Түс датчигін қолданатын классикалық алгоритм.", "Классический алгоритм с датчиком цвета."), [l("Smaller corrections = smoother driving.", "Түзетулер кішірек болса, жүріс тегіс болады.", "Меньше поправки — плавнее езда.")]],
          ["assignment", 45, l("Project task: line follower", "Жоба тапсырмасы: сызық бойымен жүретін робот", "Проектное задание: робот на линии"), l("Make the simulated robot complete the oval track.", "Симуляциядағы робот сопақ трассаны толық жүріп өтсін.", "Пусть робот в симуляторе проедет овальную трассу.")],
        ],
      },
      finalModule(l("Program an autonomous routine that visits three targets and returns to start.", "Үш нысанға барып, бастапқы нүктеге оралатын автономды бағдарлама жаз.", "Напиши автономную программу: посетить три цели и вернуться на старт.")),
    ]),
  },
  {
    slug: "ftc-fundamentals",
    category: "ftc",
    levels: ["intermediate"],
    hours: 14,
    languages: ["en", "ru"],
    mentorId: "madina",
    motif: "trophy",
    sample: true,
    title: l("FTC Fundamentals", "FTC негіздері", "Основы FTC"),
    short: l(
      "FIRST Tech Challenge: robot design, engineering, programming and competition strategy.",
      "FIRST Tech Challenge: робот жобалау, инженерия, бағдарламалау және жарыс стратегиясы.",
      "FIRST Tech Challenge: конструкция робота, инженерия, программирование и стратегия соревнований."
    ),
    description: l(
      "Everything a new team needs to understand FIRST Tech Challenge: how a season works, how to analyse the game, design a drivetrain, write TeleOp and Autonomous code and build an engineering portfolio judges remember.",
      "Жаңа командаға FIRST Tech Challenge-ті түсіну үшін қажеттінің бәрі: маусым қалай өтеді, ойынды қалай талдау керек, жетек жүйесін жобалау, TeleOp және Autonomous кодын жазу және төрешілер есте сақтайтын инженерлік портфолио жасау.",
      "Всё, что нужно новой команде для понимания FIRST Tech Challenge: как устроен сезон, как анализировать игру, проектировать шасси, писать код TeleOp и Autonomous и собрать инженерное портфолио, которое запомнят судьи."
    ),
    outcomes: [
      l("Understand FTC season structure and awards", "FTC маусымының құрылымы мен марапаттарын түсіну", "Понимать структуру сезона и награды FTC"),
      l("Analyse a game and plan strategy", "Ойынды талдап, стратегия жоспарлау", "Анализировать игру и планировать стратегию"),
      l("Compare drivetrain types", "Жетек түрлерін салыстыру", "Сравнивать типы шасси"),
      l("Write an engineering portfolio", "Инженерлік портфолио жазу", "Составлять инженерное портфолио"),
    ],
    modules: build("ftc-fundamentals", [
      {
        title: l("Module 1: Introduction", "1-модуль: Кіріспе", "Модуль 1: Введение"),
        lessons: [
          ["video", 11, l("What is FIRST Tech Challenge?", "FIRST Tech Challenge деген не?", "Что такое FIRST Tech Challenge?"), l("Season timeline, match format, alliances and Gracious Professionalism.", "Маусым кестесі, матч форматы, альянстар және Gracious Professionalism.", "Календарь сезона, формат матчей, альянсы и Gracious Professionalism."), [l("A match has a 30-second Autonomous period and a 2-minute Driver-Controlled period.", "Матчта 30 секундтық автономды кезең және 2 минуттық басқарылатын кезең бар.", "Матч состоит из 30-секундного автономного периода и 2-минутного управляемого.")]],
          ["quiz", 4, l("Knowledge check", "Білімді тексеру", "Проверка знаний"), l("Two quick questions.", "Екі қысқа сұрақ.", "Два коротких вопроса."), [
            q(l("How long is the Autonomous period?", "Автономды кезең қанша уақыт?", "Сколько длится автономный период?"), [l("30 seconds", "30 секунд", "30 секунд"), l("5 minutes", "5 минут", "5 минут"), l("10 seconds", "10 секунд", "10 секунд")], 0),
            q(l("Teams in a match play in…", "Матчта командалар… ойнайды", "В матче команды играют…"), [l("Alone", "Жалғыз", "В одиночку"), l("Alliances", "Альянстарда", "В альянсах"), l("Groups of ten", "Онадамдық топта", "Группами по десять")], 1),
          ]],
        ],
      },
      {
        title: l("Module 2: Core Concepts", "2-модуль: Негізгі ұғымдар", "Модуль 2: Основные понятия"),
        lessons: [
          ["video", 15, l("Game analysis and strategy", "Ойынды талдау және стратегия", "Анализ игры и стратегия"), l("Read the game manual like an engineer and rank scoring options.", "Ойын нұсқаулығын инженер сияқты оқып, ұпай жинау жолдарын саралау.", "Читаем регламент как инженер и ранжируем способы набора очков."), [l("Points per second is more useful than points per action.", "Әрекетке шаққандағы ұпайдан гөрі секундтағы ұпай пайдалырақ.", "Очки в секунду полезнее, чем очки за действие.")]],
          ["video", 14, l("Drivetrains: tank vs mecanum", "Жетектер: tank және mecanum", "Шасси: tank и mecanum"), l("Pros and cons of common FTC drivetrains.", "Кең таралған FTC жетектерінің артықшылықтары мен кемшіліктері.", "Плюсы и минусы популярных шасси FTC."), [l("Mecanum wheels let the robot strafe sideways.", "Mecanum дөңгелектері роботқа бүйірге жүруге мүмкіндік береді.", "Колёса mecanum позволяют роботу ехать боком.")]],
          ["assignment", 50, l("Assignment: strategy sheet", "Тапсырма: стратегия парағы", "Задание: лист стратегии"), l("Analyse the current season's game and propose a strategy for a rookie team.", "Ағымдағы маусым ойынын талдап, жаңа команда үшін стратегия ұсын.", "Проанализируй игру текущего сезона и предложи стратегию для команды-новичка.")],
        ],
      },
      {
        title: l("Module 3: Application", "3-модуль: Қолдану", "Модуль 3: Применение"),
        lessons: [
          ["video", 15, l("TeleOp and Autonomous code", "TeleOp және Autonomous коды", "Код TeleOp и Autonomous"), l("Structure of an FTC OpMode in Java.", "Java тіліндегі FTC OpMode құрылымы.", "Структура OpMode FTC на Java."), [l("Keep hardware names identical in code and in the robot configuration.", "Код пен робот конфигурациясындағы құрылғы атаулары бірдей болсын.", "Имена устройств в коде и конфигурации робота должны совпадать.")]],
          ["video", 12, l("The engineering portfolio", "Инженерлік портфолио", "Инженерное портфолио"), l("What judges look for and how to document your season.", "Төрешілер нені іздейді және маусымды қалай құжаттау керек.", "Что ищут судьи и как документировать сезон."), [l("Show your process, failures included — not only the final robot.", "Тек соңғы роботты емес, процесті, сәтсіздіктерді де көрсет.", "Показывай процесс, включая неудачи, а не только финального робота.")]],
          ["assignment", 50, l("Project task: portfolio page", "Жоба тапсырмасы: портфолио беті", "Проектное задание: страница портфолио"), l("Write one portfolio page about a design decision.", "Бір жобалау шешімі туралы портфолио бетін жаз.", "Напиши одну страницу портфолио об инженерном решении.")],
        ],
      },
      finalModule(l("Present a full robot concept for this season: strategy, drivetrain choice, mechanism sketch and Autonomous plan.", "Осы маусымға арналған толық робот концепциясын ұсын: стратегия, жетек таңдауы, механизм эскизі және автономды жоспар.", "Представь полный концепт робота на сезон: стратегия, выбор шасси, эскиз механизма и план автономки.")),
    ]),
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const allLessons = (c: Course) => c.modules.flatMap((m) => m.lessons);
export const lessonCount = (c: Course) => allLessons(c).length;
