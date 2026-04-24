import { Container, Flex } from '@mantine/core'
import { Outlet, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

import { SearchSection } from '../components/SearchSection'
import { FiltersPanel } from '../components/FiltersPanel'
import { CityTabs } from '../components/CityTabs'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  hydrateFiltersFromUrl,
  selectSearch,
  selectSkills,
} from '../store/vacanciesSlice'

export const VacanciesPage = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = useAppSelector(selectSearch)
  const skills = useAppSelector(selectSkills)

  useEffect(() => {
    const searchFromUrl = searchParams.get('search') ?? ''

    const skillsFromUrl = searchParams.get('skills')
      ? searchParams
          .get('skills')!
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean)
      : []

    dispatch(
      hydrateFiltersFromUrl({
        search: searchFromUrl,
        skills: skillsFromUrl,
      })
    )
  }, [dispatch])

  useEffect(() => {
    const params = new URLSearchParams()

    if (search.trim()) {
      params.set('search', search.trim())
    }

    if (skills.length > 0) {
      params.set('skills', skills.join(','))
    }

    setSearchParams(params, { replace: true })
  }, [search, skills, setSearchParams])

  return (
    <div style={{ backgroundColor: '#F1F3F5', minHeight: '100vh' }}>
      <SearchSection />

      <Container size="lg" py={24}>
        <Flex align="flex-start" gap={24}>
          <FiltersPanel />

          <div style={{ flex: 1 }}>
            <CityTabs />
            <Outlet />
          </div>
        </Flex>
      </Container>
    </div>
  )
}