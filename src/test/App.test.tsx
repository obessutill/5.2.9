import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import vacanciesReducer, { addSkill, applySearch, removeSkill, setArea, setSearchDraft, setPage } from '../store/vacanciesSlice';
import { FiltersPanel } from '../components/FiltersPanel';
import { VacancyCard } from '../components/VacancyCard';
import { VacancyList } from '../components/VacancyList';

const renderWithProviders = (ui: React.ReactElement, preloadedState?: any) => {
    const store = configureStore({
        reducer: { vacancies: vacanciesReducer },
        preloadedState: preloadedState ? { vacancies: { ...vacanciesReducer(undefined, { type: '' }), ...preloadedState } } : undefined,
    })

    return render(
        <Provider store={store}>
            <MantineProvider>{ui}</MantineProvider>
        </Provider>
    )
}

const mockVacancy = {
    id: '1',
    name: 'Frontend Developer',
    alternate_url: 'https://example.com',
    salary: { from: 100000, to: 150000, currency: 'RUR', gross: false },
    experience: { id: 'between1And3', name: '1-3 года' },
    employer: { id: '1', name: 'Test Company' },
    schedule: { id: 'remote', name: 'Удаленная работа' },
    area: { id: '1', name: 'Москва' },
}

const mockFetchSuccess = (items: any[]) => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
            items,
            found: items.length,
            page: 0,
            pages: 1,
            per_page: 10,
        }),
    } as Response)
}

beforeEach(() => {
    vi.restoreAllMocks()
})

afterEach(() => {
    vi.resetAllMocks()
})

//FiltersPanel
describe('FiltersPanel', () => {
    test('добавление нового скилла через Enter', async () => {
        mockFetchSuccess([])

        renderWithProviders(<FiltersPanel />)

        const input = screen.getByPlaceholderText('Навык')

        fireEvent.change(input, { target: { value: 'Next.js' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(screen.getByText('Next.js')).toBeInTheDocument()
    })

    test('рендерит стартовые скиллы', () => {
        renderWithProviders(<FiltersPanel />, {
            skills: ['TypeScript', 'React', 'Redux'],
        })

        expect(screen.getByText('TypeScript')).toBeInTheDocument()
        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('Redux')).toBeInTheDocument()
    })
})
//VacancyCard

describe('VacancyCard', () => {
    test('рендерит данные вакансии', () => {
        render(
            <MantineProvider>
                <VacancyCard vacancy={mockVacancy as any} />
            </MantineProvider>
        )

        expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
        expect(screen.getByText('Test Company')).toBeInTheDocument()
        expect(screen.getByText('Москва')).toBeInTheDocument()
    })

    test('рендерит зарплатную вилку', () => {
        render(
            <MantineProvider>
                <VacancyCard vacancy={mockVacancy}/>
            </MantineProvider>
        )

        expect(screen.getByText(/100 000/i)).toBeInTheDocument();
        expect(screen.getByText(/150 000/i)).toBeInTheDocument();
    })

    test('рендерит кнопку "Смотреть вакансию"', () => {
        render(
            <MantineProvider>
                <VacancyCard vacancy={mockVacancy}/>
            </MantineProvider>
        )

        expect(screen.getByRole('button', { name: /смотреть вакансию/i })).toBeInTheDocument();
    })

    test('кнопка "Откликнуться" содержит ссылку', () => {
        render(
            <MantineProvider>
                <VacancyCard vacancy={mockVacancy as any}/>
            </MantineProvider>
        )

        const link = screen.getByRole('link', { name: /откликнуться/i })
        expect(link).toHaveAttribute('href', 'https://example.com')
    })
})
//VacancyList

describe('VacancyList', () => {
    test('показывает вакансии после запроса', async () => {
        mockFetchSuccess([mockVacancy])

        renderWithProviders(<VacancyList />)

        expect(await screen.findByText('Frontend Developer')).toBeInTheDocument();
        expect(screen.getByText('Test Company')).toBeInTheDocument()
    })

    test('показывает "Вакансии не найдены", если API вернул пустой массив', async () => {
        mockFetchSuccess([]);

        renderWithProviders(<VacancyList />)

        expect(await screen.findByText(/вакансии не найдены/i)).toBeInTheDocument();
    })
})
//VacanciesSlice

describe('VacanciesSlice', () => {
    test('добавляет скилл', () => {
        const state = vacanciesReducer(undefined, addSkill('React'))
        expect(state.skills).toContain('React')
    })

    test('удаляет скилл', () => {
        const state = vacanciesReducer({ ...vacanciesReducer(undefined, { type: '' }), skills: ['React'] }, removeSkill('React'))
        expect(state.skills).not.toContain('React')
    })

    test('не добавляет пустой скилл', () => {
        const state = vacanciesReducer(undefined, addSkill(' '))
        expect(state.skills).toEqual(['TypeScript', 'React', 'Redux']) 
    })

    test('не добавляет дубликат скилла', () => {
        const state = vacanciesReducer({ ...vacanciesReducer(undefined, { type: 'unknown' }), skills: ['React'] }, addSkill('React'))
    expect(state.skills).toEqual(['React'])
    })

    test('applySearch переносит searchDraft в search и сбрасывает страницу', () => {
        const draftState = vacanciesReducer(undefined, setSearchDraft('frontend'))
        const resultState = vacanciesReducer(
            { ...draftState, page: 4 },
            applySearch()
        )

        expect(resultState.search).toBe('frontend')
        expect(resultState.page).toBe(1)
    })

    test('setPage меняет текущую страницу', () => {
        const state = vacanciesReducer(undefined, setPage(3))
        expect(state.page).toBe(3)
    })

    test('меняет город', () => {
        const state = vacanciesReducer(undefined, setArea('1'))
        expect(state.area).toBe('1')
    })
})