import { Button, Container, Flex, Text, TextInput } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    applySearch,
    selectSearchDraft,
    setSearchDraft,
} from '../store/vacanciesSlice';

export const SearchSection = () => {
    const dispatch = useAppDispatch();
    const searchDraft = useAppSelector(selectSearchDraft);

    const handleSearch = () => {
        dispatch(applySearch());
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <section
        style={{
            backgroundColor: '#F6F6F7',
            borderBottom: '1px solid rgba(15, 15, 16, 0.1)'
        }}
        >
            <Container size='lg' py={24}>
                <Flex justify="space-between" align="center" gap="md" wrap="wrap">
                    <div>
                        <Text fw={700} size="28px" lh="32px" c="#0F0F10">
                            Список Вакансий
                        </Text>
                        <Text size="28px" lh="32px" c="rgba(15, 15, 16, 0.5)">
                            по профессии Frontend-разработчик
                        </Text>
                    </div>

                    <Flex gap={12} align="center" wrap="wrap">
                        <TextInput 
                        value={searchDraft}
                        onChange={(event) => dispatch(setSearchDraft(event.currentTarget.value))}
                        onKeyDown={handleKeyDown}
                        placeholder="Должность или название компании"
                        leftSection={<IconSearch size={16} stroke={1.8} />}
                        radius="md"
                        size="md"
                        w={420}
                        styles={{
                            input: {
                                backgroundColor: '#FFFFFF',
                                borderColor: 'rgba(15, 15, 16, 0.1)',
                            },
                        }}
                        />

                        <Button
                        onClick={handleSearch}
                        radius="md"
                        size="md"
                        styles={{
                            root: {
                                backgroundColor: '#3B5BDB',
                                paddingInline: 22,
                            },
                        }}
                        >
                            Найти
                        </Button>
                    </Flex>
                </Flex>
            </Container>
        </section>
    )
}