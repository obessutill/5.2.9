import { Container, Group, Text, UnstyledButton } from "@mantine/core";
import hhIcon from '../assets/hh.svg';
import userIcon from '../assets/user-circle.svg';

export const Header = () => {
    return (
        <header
        style={{backgroundColor: '#ffffff',
            borderBottom: '1px solid rgba(15, 15, 16, 0.1)',
        }}
        >
            <Container
            size="lg"
            h={64}
            style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
            }}
            >
                <Group gap={8}>
                    <img src={hhIcon} alt="Логотип" width={24} height={24} />
                    <Text fw={700} size="sm" c="#0F0F10">
                        .FrontEnd
                    </Text>
                </Group>

                <Group
                gap={28}
                style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
                >
                    <UnstyledButton>
                        <Text size="xs" fw={600} c="#0F0F10">
                            Вакансии FE
                        </Text>
                    </UnstyledButton>

                    <UnstyledButton>
                        <Group gap={6}>
                            <img src={userIcon} alt="Пользователь" width={14} height={14} />
                            <Text size="xs" c="rgba(15, 15, 16, 0.5)">
                                Обо мне
                            </Text>
                        </Group>
                    </UnstyledButton>
                </Group>
            </Container>
        </header>
    );
};