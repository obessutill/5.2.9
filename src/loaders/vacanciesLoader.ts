import type { Params } from "react-router-dom";
import { getVacancies, getVacancyById } from "../api/vacancies";

const getSearchParamsData = (request: Request) => {
    const url = new URL(request.url)

    const search = url.searchParams.get('search') ?? ''
    const skillsParam = url.searchParams.get('skills') ?? ''
    const pageParam = Number(url.searchParams.get('page') ?? '1')

    const skills = skillsParam ? skillsParam.split(',').map((skill) => skill.trim()).filter(Boolean) : []

    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam

    return {
        search,
        skills,
        page,
    }
}

export const moscowVacanciesLoader = async ({ request }: { request: Request }) => {
    const { search, skills, page } = getSearchParamsData(request)

    return getVacancies({
        search,
        skills,
        area: '1',
        page,
        perPage: 10,
    })
}

export const petersburgVacanciesLoader = async ({ request }: { request: Request }) => {
    const { search, skills, page } = getSearchParamsData(request)

    return getVacancies({
        search,
        skills,
        area: '2',
        page,
        perPage: 10,
    })
}

export const vacancyDetailsLoader = async ({ params }: { params: Params<string> }) => {
    const id = params.id

    if (!id) {
        throw new Response('не указан id вакансии', {
            status: 400,
            statusText: 'Bad Request',
        })
    }

    try {
        return await getVacancyById(id)
    } catch {
        throw new Response('Вакансия не найдена', {
            status: 404,
            statusText: 'Not Found',
        })
    }
}