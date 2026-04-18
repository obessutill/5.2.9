import type { Vacancy } from "../types/vacancy";

export const getScheduleLabel = (schedule: Vacancy['schedule']) => {
    const name = schedule?.name?.toLowerCase() ?? '';

    if (!name) {
        return null;
    }

    if (name.includes('удален')) {
        return "Можно удаленно";
    }

    if (name.includes('гибк')) {
        return 'Гибрид';
    }

    return 'Офис';
}