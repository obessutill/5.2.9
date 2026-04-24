import type { Vacancy, VacanciesResponse } from "../types/vacancy";
import { mockVacancies } from "../mocks/vacancies";

interface GetVacanciesParams {
    search?: string,
    skills?: string[],
    area?: string,
    page?: number,
    perPage?: number,
}

const includesInsensitive = (value: string, search: string) => value.toLowerCase().includes(search.toLowerCase())

export const getVacancies = async ({
    search = '',
    skills = [],
    area = '',
    page = 1,
    perPage = 10,
}: GetVacanciesParams): Promise<VacanciesResponse> => {
    let filtered = [...mockVacancies]

    if (area) {
        filtered = filtered.filter((vacancy) => vacancy.area.id === area)
    }

    if (search.trim()) {
        const query = search.trim()

        filtered = filtered.filter((vacancy) => {
            const name = vacancy.name ?? ''
            const employer = vacancy.employer?.name ?? ''

            return (
                includesInsensitive(name, query) ||
                includesInsensitive(employer, query)
            )
        })
    }

    if (skills.length > 0) {
        filtered = filtered.filter((vacancy) => {
            const text = [
                vacancy.name,
                vacancy.snippet?.requirement ?? '',
                vacancy.snippet?.responsibility ?? '',
                vacancy.description ?? '',
            ]
            .join(' ')
            .toLowerCase()

            return skills.every((skill) => text.includes(skill.toLowerCase()))
        })
    }

    const total = filtered.length
    const pages = Math.max(1, Math.ceil(total / perPage))
    const safePage = Math.min(Math.max(page, 1), pages)
    const start = (safePage - 1) * perPage
    const items = filtered.slice(start, start + perPage)

    await new Promise((resolve) => setTimeout(resolve, 250))

    return {
        items, 
        found: total,
        page: safePage - 1,
        pages,
        per_page: perPage,
    }
}

export const getVacancyById = async (id: string): Promise<Vacancy> => {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const vacancy = mockVacancies.find((item) => item.id === id)

    if (!vacancy) {
        throw new Error('Вакансия не найдена')
    }

    return vacancy
}