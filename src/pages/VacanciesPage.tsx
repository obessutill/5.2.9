import { Container, Flex } from "@mantine/core";
import { SearchSection } from "../components/SearchSection";
import { FiltersPanel } from "../components/FiltersPanel";
import { VacancyList } from "../components/VacancyList";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchVacancies, hydrateFiltersFromUrl, selectArea, selectSearch, selectSkills } from '../store/vacanciesSlice'

export const VacanciesPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const search = useAppSelector(selectSearch);
    const area = useAppSelector(selectArea)
    const skills = useAppSelector(selectSkills)

    useEffect(() => {
        const searchFromUrl = searchParams.get('search') ?? ''
        const areaFromUrl = searchParams.get('area') ?? ''
        const skillsFromUrl = searchParams.get('skills') 
            ? searchParams
                .get('skills')!
                .split(',')
                .map((skill) => skill.trim())
                .filter(Boolean)
            : []
            
            dispatch(hydrateFiltersFromUrl({
                search: searchFromUrl,
                area: areaFromUrl,
                skills: skillsFromUrl,
            })
        )
    }, [dispatch, searchParams])

    useEffect(() => {
        const params = new URLSearchParams()

        if (search.trim()) {
            params.set('search', search.trim())
        }

        if (area) {
            params.set('area', area)
        }

        if (skills.length > 0) {
            params.set('skills', skills.join(','))
        }

        setSearchParams(params);
        dispatch(fetchVacancies())
    }, [dispatch, search, area, skills, setSearchParams])

    return (
        <div style={{ backgroundColor: '#F1F3F5', minHeight: '100vh' }}>
            <SearchSection />

            <Container size="lg" py={24}>
                <Flex align="flex-start" gap={24}>
                    <FiltersPanel />
                    <VacancyList />
                </Flex>
            </Container>
        </div>
    )
}