import { Button, Card, Flex, Pill, PillsInput, Select, Text, TextInput } from "@mantine/core";
import { IconMapPin, IconPlus } from '@tabler/icons-react';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    addSkill,
    removeSkill,
    selectArea,
    selectSkills,
    setArea,
} from '../store/vacanciesSlice';

export const FiltersPanel = () => {
    const dispatch = useAppDispatch();
    const skills = useAppSelector(selectSkills);
    const area = useAppSelector(selectArea);
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        const trimmedSkill = newSkill.trim();

        if (!trimmedSkill) {
            return;
        }

        dispatch(addSkill(trimmedSkill));
        setNewSkill('');
    };

    const handleRemoveSkill = (skill: string) => {
        dispatch(removeSkill(skill));
    };

    const handleAreaChange = (value: string | null) => {
        dispatch(setArea(value ?? ''));
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddSkill();
        }
    };

    return (
        <Flex direction="column" gap={16} w={264}>
            <Card
            radius="lg"
            p="lg"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(15, 15, 16, 0.1)',
            }}
            >
                <Text fw={600} size="sm" c="#0F0F10" mb={12}>
                    Ключевой навык
                </Text>

                <Flex gap={8} align='center' mb={12}>
                    <TextInput
                    value={newSkill}
                    onChange={(event) => setNewSkill(event.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Навык"
                    radius="md"
                    size="sm"
                    style={{ flex: 1 }}
                    styles={{
                        input: {
                            backgroundColor: '#FFFFFF',
                            borderColor: 'rgba(15, 15, 16, 0.1)',
                        },
                    }}
                    />
                        <Button
                        onClick={handleAddSkill}
                        radius="md"
                        size="sm"
                        p={0}
                        w={32}
                        h={32}
                        styles={{
                            root: {
                                backgroundColor: '#74C0FC',
                            },
                        }}
                        >
                            <IconPlus size={16} />
                        </Button>
                </Flex>

                <PillsInput>
                    <Flex wrap="wrap" gap={8}>
                        {skills.map((skill) => (
                            <Pill
                            key={skill}
                            withRemoveButton
                            onRemove={() => handleRemoveSkill(skill)}
                            radius="xl"
                            size="sm"
                            >
                                {skill}
                            </Pill>
                        ))}
                    </Flex>
                </PillsInput>
            </Card>

            <Card
            radius="lg"
            p="md"
            style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(15, 15, 16, 0.1)',
            }}
            >
                <Select 
                value={area}
                onChange={handleAreaChange}
                placeholder="Все города"
                leftSection={<IconMapPin size={16} color="#868E96" />}
                radius="md"
                size="sm"
                data={[
                    { value: '', label: 'Все города' },
                    { value: '1', label: 'Москва' },
                    { value: '2', label: 'Санкт-Петербург' },
                ]}
                styles={{
                    input: {
                        borderColor: 'rgba(15, 15, 16, 0.1)'
                    },
                }}
                />
            </Card>
        </Flex>
    )
}