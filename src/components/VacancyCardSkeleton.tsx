import { Card, Flex, Group, Skeleton } from "@mantine/core";

export const VacancyCardSkeleton = () => {
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
            <Skeleton height={30} width="70%" radius="sm" mb={14} />

            <Group gap={12} mb={14}>
                <Skeleton height={18} width={130} radius="sm" />
                <Skeleton height={18} width={90} radius="sm" />
            </Group>

            <Skeleton height={16} width={140} radius="sm" mb={10}/>
            <Skeleton height={22} width={110} radius="sm" mb={10}/>
            <Skeleton height={18} width={130} radius="sm" mb={10}/>

            <Flex gap={12}>
                <Skeleton height={36} width={140} radius="sm" />
                <Skeleton height={36} width={120} radius="sm" />
            </Flex>
        </Card>
    )
}