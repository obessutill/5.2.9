import { Button, Badge, Card, Container, Group, Text } from '@mantine/core'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { VacancyCardSkeleton } from '../components/VacancyCardSkeleton'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  clearSelectedVacancy,
  fetchVacancyById,
  selectSelectedVacancy,
  selectSelectedVacancyError,
  selectSelectedVacancyLoading,
} from '../store/vacanciesSlice'
import { formatSalary } from '../utils/formatSalary'
import { getScheduleLabel } from '../utils/getScheduleLabel'

export const VacancyDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()

  const vacancy = useAppSelector(selectSelectedVacancy)
  const loading = useAppSelector(selectSelectedVacancyLoading)
  const error = useAppSelector(selectSelectedVacancyError)

  useEffect(() => {
    if (id) {
      dispatch(fetchVacancyById(id))
    }

    return () => {
      dispatch(clearSelectedVacancy())
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <Container size="lg" py={24}>
        <VacancyCardSkeleton />
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="lg" py={24}>
        <Text c="red">{error}</Text>
      </Container>
    )
  }

  if (!vacancy) {
    return (
      <Container size="lg" py={24}>
        <Text>Вакансия не найдена</Text>
      </Container>
    )
  }

  const salaryText = formatSalary(vacancy.salary)
  const scheduleLabel = getScheduleLabel(vacancy.schedule)

  const hasDescription =
    Boolean(vacancy.snippet?.requirement) ||
    Boolean(vacancy.snippet?.responsibility) ||
    Boolean(vacancy.description)

  return (
    <div style={{ backgroundColor: '#F1F3F5', minHeight: '100vh' }}>
      <Container size="md" py={24}>
        <Card
          radius="lg"
          p="lg"
          mb="lg"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(15, 15, 16, 0.1)',
          }}
        >
          <Text fw={600} size="28px" lh="32px" c="#4263EB" mb={10}>
            {vacancy.name}
          </Text>

          <Group gap={12} mb={12}>
            <Text fw={500} size="18px" c="#0F0F10">
              {salaryText}
            </Text>

            <Text size="16px" c="rgba(15, 15, 16, 0.5)">
              {vacancy.experience?.name ?? 'Без опыта'}
            </Text>
          </Group>

          <Text size="16px" c="rgba(15, 15, 16, 0.5)" mb={8}>
            {vacancy.employer?.name ?? 'Компания не указана'}
          </Text>

          {scheduleLabel && (
            <Badge
              radius="sm"
              mb={8}
              styles={{
                root: {
                  backgroundColor: '#4263EB',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                },
              }}
            >
              {scheduleLabel}
            </Badge>
          )}

          <Text size="18px" c="#0F0F10" mb={18}>
            {vacancy.area?.name ?? 'Город не указан'}
          </Text>

          <Button
            component="a"
            href={vacancy.url ?? vacancy.alternate_url}
            target="_blank"
            rel="noreferrer"
            radius="md"
            size="sm"
            styles={{
                root: {
                backgroundColor: '#0F0F10',
                color: '#FFFFFF',
                paddingInline: 18,
                width: 'fit-content',
                },
            }}
            >
            Откликнуться на hh.ru
          </Button>
        </Card>

        {hasDescription && (
          <Card
            radius="lg"
            p="lg"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(15, 15, 16, 0.1)',
            }}
          >
            <Text fw={600} size="20px" mb="md">
              Описание вакансии
            </Text>

            {vacancy.snippet?.requirement && (
              <>
                <Text fw={600} mb={6}>
                  Требования
                </Text>
                <div
                  dangerouslySetInnerHTML={{ __html: vacancy.snippet.requirement }}
                  style={{ marginBottom: 16, lineHeight: 1.6 }}
                />
              </>
            )}

            {vacancy.snippet?.responsibility && (
              <>
                <Text fw={600} mb={6}>
                  Обязанности
                </Text>
                <div
                  dangerouslySetInnerHTML={{ __html: vacancy.snippet.responsibility }}
                  style={{ marginBottom: 16, lineHeight: 1.6 }}
                />
              </>
            )}

            {vacancy.description && (
              <div
                dangerouslySetInnerHTML={{ __html: vacancy.description }}
                style={{ lineHeight: 1.6 }}
              />
            )}
          </Card>
        )}
      </Container>
    </div>
  )
}