import { Badge, Button, Card, Flex, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Vacancy } from "../types/vacancy";
import { formatSalary } from "../utils/formatSalary";
import { getScheduleLabel } from "../utils/getScheduleLabel";

interface VacancyCardProps {
    vacancy: Vacancy,
}

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
    const salaryText = formatSalary(vacancy.salary);
    const scheduleLabel = getScheduleLabel(vacancy.schedule);

    return (
        <Card
        radius="lg"
        p="lg"
        mb="lg"
        style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(15, 15, 16, 0.1)',
        }}
        >
            <Text
            fw={600}
            size="28px"
            lh="32px"
            c="#4263EB"
            mb={10}
            style={{
                fontSize: '28px',
            }}
            >
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

            <Flex gap={12} wrap="wrap">
                <Button
                component={Link}
                to={`/vacancies/${vacancy.id}`}
                radius="md"
                size="sm"
                styles={{
                    root: {
                        backgroundColor: '#0F0F10',
                        color: '#FFFFFF',
                        paddingInline: 18,
                    },
                }}
                >
                    Смотреть вакансию
                </Button>

                <Button
                component="a"
                href={vacancy.alternate_url}
                target="_blank"
                rel="noreferrer"
                variant="filled"
                radius="md"
                size="sm"
                styles={{
                    root: {
                        backgroundColor: '#F1F3F5',
                        color: '#0F0F10',
                        paddingInline: 18,
                    },
                }}
                >
                    Откликнуться
                </Button>
            </Flex>
        </Card>
    )
}