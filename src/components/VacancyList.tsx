import { Group, Pagination, Stack, Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { VacancyCard } from "./VacancyCard";
import type { VacanciesResponse } from "../types/vacancy";

interface VacancyListProps {
    data: VacanciesResponse
}

export const VacancyList = ({ data }: VacancyListProps) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const items = data.items
    const currentPage = data.page + 1

    const handlePageChange = (nextPage: number) => {
        const params = new URLSearchParams(searchParams)

        params.set('page', String(nextPage))

        setSearchParams(params)
    }

    if (items.length === 0) {
        return (
            <Text size="lg" c="#0F0F10" mt="md">
                Вакансии не найдены
            </Text>
        )
    }

    return (
        <Stack gap={0} style={{ flex: 1 }}>
            {items.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}

            {data.pages > 1 && (
                <Group justify="center" mt="md">
                    <Pagination 
                    total={data.pages}
                    value={currentPage}
                    onChange={handlePageChange}
                    radius="md"
                    size="md"
                    />
                </Group>
            )}
        </Stack>
    )
}