import type { Vacancy } from "../types/vacancy";

export const mockVacancies: Vacancy[] = [
    {
        id: '1',
        name: 'Frontend Developer(React)',
        url: 'https://hh.ru/vacancy/1',
        alternate_url: 'https"//hh.ru/vacancy/1',
        salary: {
            from: 180000,
            to: 250000,
            currency: 'RUR',
            gross: false,
        },
        area: {
            id: '1',
            name: 'Москва',
        },
        experience: {
            id: 'between1And3',
            name: '1-3 года',
        },
        schedule: {
            id: 'remote',
            name: 'Удаленная работа',
        },
        employer: {
            id: '101',
            name: 'Yandex',
            logo_urls: {},
        },
        snippet: {
            requirement: 'Опыт работы с React, TypeScript, Redux.',
            responsibility: 'Разработка интерфейсов и поддержка SPA',
        },
        description: '<p>Команда ищет frontend-разработчика для развития внутренних сервисов</p>',
    },
    {
        id: '2',
        name: 'Middle Frontend Developer',
        url: 'https://hh.ru/vacancy/2',
        alternate_url: 'https"//hh.ru/vacancy/2',
        salary: {
            from: 200000,
            to: 280000,
            currency: 'RUR',
            gross: false,
        },
        area: {
            id: '1',
            name: 'Москва',
        },
        experience: {
            id: 'between3And6',
            name: '3-6 года',
        },
        schedule: {
            id: 'fullDay',
            name: 'Полный день',
        },
        employer: {
            id: '102',
            name: 'VK',
            logo_urls: {},
        },
        snippet: {
            requirement: 'Уверенное знание React, JavaScript, REST API.',
            responsibility: 'Разработка новых страниц и оптимизация UI',
        },
        description: '<p>Нужен разработчик для продуктовой команды.</p><p>Опыт работы с современным frontend-стеком</p>',
    },
    {
        id: '3',
        name: 'React/TypeScript Developer',
        url: 'https://hh.ru/vacancy/3',
        alternate_url: 'https"//hh.ru/vacancy/3',
        salary: {
            from: 160000,
            to: 220000,
            currency: 'RUR',
            gross: false,
        },
        area: {
            id: '1',
            name: 'Москва',
        },
        experience: {
            id: 'noExperience',
            name: 'Нет опыта',
        },
        schedule: {
            id: 'hybrid',
            name: 'Гибрид',
        },
        employer: {
            id: '103',
            name: 'T-Bank',
            logo_urls: {},
        },
        snippet: {
            requirement: 'Базовые знания React и TypeScript',
            responsibility: 'Поддержка существующих интерфейсов',
        },
        description: '<p>Ищем junior+/middle разработчика, будет много практики с реальными проектами.</p>',
    },
    {
        id: '4',
        name: 'Senior Frontend Developer',
        url: 'https://hh.ru/vacancy/4',
        alternate_url: 'https"//hh.ru/vacancy/4',
        salary: {
            from: 280000,
            to: 380000,
            currency: 'RUR',
            gross: false,
        },
        area: {
            id: '2',
            name: 'Санкт-Петербург',
        },
        experience: {
            id: 'moreThan6',
            name: 'Более 6 лет',
        },
        schedule: {
            id: 'remote',
            name: 'Удаленная работа',
        },
        employer: {
            id: '104',
            name: 'Ozon',
            logo_urls: {},
        },
        snippet: {
            requirement: 'Опыт работы с React, архитектурой SPA и performance',
            responsibility: 'Проектирование frontend-решений',
        },
        description: '<p>Команда ищет сильного senior frontend-разработчика для развития внутренних сервисов, важно уметь принимать архитектурные решения.</p>',
    },
    {
        id: '5',
        name: 'Frontend Developer Vue/React',
        url: 'https://hh.ru/vacancy/5',
        alternate_url: 'https"//hh.ru/vacancy/5',
        salary: {
            from: 170000,
            to: 230000,
            currency: 'RUR',
            gross: false,
        },
        area: {
            id: '2',
            name: 'Санкт-Петербург',
        },
        experience: {
            id: 'between1And3',
            name: '1-3 года',
        },
        schedule: {
            id: 'fullDay',
            name: 'Полный день',
        },
        employer: {
            id: '105',
            name: 'Avito',
            logo_urls: {},
        },
        snippet: {
            requirement: 'Знание JavaScript, TypeScript, React.',
            responsibility: 'Разработка пользовательских интерфейсов.',
        },
        description: '<p>Работа в продуктовой команде над крупным сервисом.</p>',
    },
    {
        id: '6',
        name: 'Junior Frontend Developer',
        url: 'https://hh.ru/vacancy/6',
        alternate_url: 'https"//hh.ru/vacancy/6',
        salary: {
            from: 90000,
            to: 130000,
            currency: 'RUR',
            gross: false,
        },
        area: {
            id: '2',
            name: 'Санкт-Петербург',
        },
        experience: {
            id: 'noExperience',
            name: 'Без опыта',
        },
        schedule: {
            id: 'hybrid',
            name: 'Гибрид',
        },
        employer: {
            id: '106',
            name: 'Sber',
            logo_urls: {},
        },
        snippet: {
            requirement: 'HTML, CSS, JavaScript, базовый React.',
            responsibility: 'Поддержка frontend-команды и вёрстка',
        },
        description: '<p>Ищем начинающего разработчика в команду</p>',
    },
    {
        id: '7',
        name: 'React Developer for Admin Panel',
        url: 'https://hh.ru/vacancy/7',
        alternate_url: 'https"//hh.ru/vacancy/7',
        salary: {
            from: 150000,
            to: 210000,
            currency: 'RUR',
            gross: false,
        },
        area: {
            id: '1',
            name: 'Москва',
        },
        experience: {
            id: 'between1And3',
            name: '1-3 года',
        },
        schedule: {
            id: 'remote',
            name: 'Удаленная работа',
        },
        employer: {
            id: '107',
            name: 'Wildberries',
            logo_urls: {},
        },
        snippet: {
            requirement: 'React, TypeScript, forms, tables',
            responsibility: 'Развивать административные панели большого приложения',
        },
        description: '<p>Команда ищет frontend-разработчика для решения большого обьема задач по внутренним интерфейсам</p>',
    },
    {
        id: '8',
        name: 'Frontend-разработчик',
        url: 'https://hh.ru/vacancy/8',
        alternate_url: 'https"//hh.ru/vacancy/8',
        salary: {
            from: 140000,
            to: 200000,
            currency: 'RUR',
            gross: false,
        },
        area: {
            id: '2',
            name: 'Санкт-Петербург',
        },
        experience: {
            id: 'between1And3',
            name: '1-3 года',
        },
        schedule: {
            id: 'fullDay',
            name: 'Полный день',
        },
        employer: {
            id: '108',
            name: 'Lamoda',
            logo_urls: {},
        },
        snippet: {
            requirement: 'TypeScript, React, Redux Toolkit.',
            responsibility: 'Поддержка и развитие клиентского SPA',
        },
        description: '<p>Работа над e-commerce продуктом.</p>',
    },
    {
        id: '9',
        name: 'Frontend Engineer',
        url: 'https://hh.ru/vacancy/9',
        alternate_url: 'https"//hh.ru/vacancy/9',
        salary: {
            from: 190000,
            to: 260000,
            currency: 'RUR',
            gross: false,
        },
        area: {
            id: '1',
            name: 'Москва',
        },
        experience: {
            id: 'between3And6',
            name: '3-6 лет',
        },
        schedule: {
            id: 'hybrid',
            name: 'Гибрид',
        },
        employer: {
            id: '109',
            name: 'Alfa Bank',
            logo_urls: {},
        },
        snippet: {
            requirement: 'Опыт построения SPA и React ecosystem.',
            responsibility: 'Разработка новых фич и code review',
        },
        description: '<p>Сильная команда frontend-разработки в финтехе.</p>',
    },
    {
        id: '10',
        name: 'React Frontend Developer',
        url: 'https://hh.ru/vacancy/10',
        alternate_url: 'https"//hh.ru/vacancy/10',
        salary: {
            from: 175000,
            to: 240000,
            currency: 'RUR',
            gross: false,
        },
        area: {
            id: '2',
            name: 'Санкт-Петербург',
        },
        experience: {
            id: 'between1And3',
            name: '1-3 года',
        },
        schedule: {
            id: 'remote',
            name: 'Удаленная работа',
        },
        employer: {
            id: '110',
            name: '2GIS',
            logo_urls: {},
        },
        snippet: {
            requirement: 'React, hooks, TypeScript, REST API.',
            responsibility: 'Создание новых интерфейсов и рефакторинг',
        },
        description: '<p>Удаленная работа в распределенной команде.</p>',
    },
    {
    id: '11',
    name: 'Frontend Intern',
    url: 'https://hh.ru/vacancy/11',
    alternate_url: 'https://hh.ru/vacancy/11',
    salary: {
      from: 60000,
      to: 80000,
      currency: 'RUR',
      gross: false,
    },
    area: {
      id: '1',
      name: 'Москва',
    },
    experience: {
      id: 'noExperience',
      name: 'Нет опыта',
    },
    schedule: {
      id: 'hybrid',
      name: 'Гибрид',
    },
    employer: {
      id: '111',
      name: 'MTS',
      logo_urls: {},
    },
    snippet: {
      requirement: 'Базовые знания HTML, CSS, JS.',
      responsibility: 'Помощь в задачах frontend-команды.',
    },
    description:
      '<p>Стажировка для начинающих разработчиков.</p>',
  },
  {
    id: '12',
    name: 'Frontend Team Lead',
    url: 'https://hh.ru/vacancy/12',
    alternate_url: 'https://hh.ru/vacancy/12',
    salary: {
      from: 320000,
      to: 420000,
      currency: 'RUR',
      gross: false,
    },
    area: {
      id: '2',
      name: 'Санкт-Петербург',
    },
    experience: {
      id: 'moreThan6',
      name: 'Более 6 лет',
    },
    schedule: {
      id: 'fullDay',
      name: 'Полный день',
    },
    employer: {
      id: '112',
      name: 'JetBrains',
      logo_urls: {},
    },
    snippet: {
      requirement: 'Лидерский опыт, React, TypeScript, архитектура.',
      responsibility: 'Руководство командой frontend-разработки.',
    },
    description:
      '<p>Нужен сильный технический лидер для продуктовой команды.</p>',
  },
]