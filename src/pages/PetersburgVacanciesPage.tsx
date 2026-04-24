import { useLoaderData } from "react-router-dom";
import { VacancyList } from "../components/VacancyList";
import type { VacanciesResponse } from "../types/vacancy";

export const PetersburgVacanciesPage = () => {
    const data = useLoaderData() as VacanciesResponse

    return <VacancyList data={data} />
}