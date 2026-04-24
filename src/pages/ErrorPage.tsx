import { Button, Container, Group, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import catIcon from '../assets/sad-cat 1.png'

export const ErrorPage = () => {
    return (
        <div style={{ backgroundColor: '#F1F3F5', minHeight: '100vh' }}>
            <Container size="sm" py="xl">
                <Paper shadow="sm" radius="lg" p="xl" withBorder>
                    <Stack align="center" gap="md">
                        <Group justify="space-between" w="100%">
                            <div>
                                <Title order={2}>
                                    Упс! Такой страницы
                                    <br />
                                    не существует
                                </Title>

                                <Text size="md" mt="5px">
                                    Давайте перейдём к началу.
                                </Text>
                            </div>

                            <Button component={Link} to="/vacancies/moscow" radius="md">
                                На главную
                            </Button>
                        </Group>

                        <Image 
                        src={catIcon}
                        alt="Ошибка 404"
                        radius="md"
                        mt="md"
                        w="100%"
                        fit="cover"
                        />
                    </Stack>
                </Paper>
            </Container>
        </div>
    )
}