import type { Vacancy } from "../types/vacancy";

const currencyMap: Record<string, string> = {
    RUR: '₽',
    RUB: '₽',
    USD: '$',
    EUR: '€',
    KZT: '₸',
    BYR: 'Br',
    BYN: 'Br',
};
const formatAmount = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value);
};

export const formatSalary = (salary: Vacancy['salary']) => {
    if (!salary) {
        return 'Зарплата не указана';
    }

    const { from, to, currency } = salary;
    const currencySymbol = currency ? (currencyMap[currency] ?? currency) : '';

    if (from && to) {
        return `${formatAmount(from)} - ${formatAmount(to)} ${currencySymbol}`.trim();
    }

    if (from) {
        return `от ${formatAmount(from)} ${currencySymbol}`.trim();
    }

    if (to) {
        return `до ${formatAmount(to)} ${currencySymbol}`.trim();
    }

    return 'Зарплата не указана';
}