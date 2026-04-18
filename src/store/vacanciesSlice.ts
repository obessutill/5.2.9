import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Vacancy, VacanciesResponse } from "../types/vacancy";

export interface VacanciesState {
    items: Vacancy[],
    search: string,
    searchDraft: string,
    skills: string[],
    area: string,
    page: number,
    pages: number,
    loading: boolean,
    error: string | null,
    selectedVacancy: Vacancy | null,
    selectedVacancyLoading: boolean,
    selectedVacancyError: string | null,
}

const initialState: VacanciesState = {
    items: [],
    search: '',
    searchDraft: '',
    skills: ['TypeScript', 'React', 'Redux'],
    area: '',
    page: 1,
    pages: 1,
    loading: false,
    error: null,
    selectedVacancy: null,
    selectedVacancyLoading: false,
    selectedVacancyError: null,
}

export const fetchVacancies = createAsyncThunk<VacanciesResponse, void, { state: RootState; rejectValue: string }>(
    'vacancies/fetchVacancies',
    async (_, thunkAPI) => {
        try {
            const { search, skills, area, page } = thunkAPI.getState().vacancies;

            const params = new URLSearchParams();

            params.set('industry', '7');
            params.set('professional_role', '96');
            params.set('per_page', '10');
            params.set('page', String(page - 1));

            if (search.trim()) {
                params.set('text', search.trim());
                params.set('search_field', 'name');
            }

            if (area) {
                params.set('area', area);
            }

            skills.forEach((skill) => {
                const trimmedSkill = skill.trim();

                if (trimmedSkill) {
                    params.append('skill_set', trimmedSkill);
                }
            });

            const response = await fetch(`https://api.hh.ru/vacancies?${params.toString()}`);

            if (!response.ok) {
                return thunkAPI.rejectWithValue('Не удалось загрузить вакансии');
            }

            const data = (await response.json()) as VacanciesResponse;

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err instanceof Error ? err.message : 'Не удалось загрузить вакансии'
            );
        }
    }
);

export const fetchVacancyById = createAsyncThunk<Vacancy, string, { rejectValue: string }>('vacancies/fetchVacancyById', async (id, thunkAPI) => {
    try {
        const response = await fetch(`https://api.hh.ru/vacancies/${id}`);

        if (!response.ok) {
            return thunkAPI.rejectWithValue('Не удалось загрузить вакансию')
        }

        const data = await response.json() as Vacancy
        return data
    } catch (err) {
        return thunkAPI.rejectWithValue(
            err instanceof Error ? err.message: "Не удалось загрузить вакансию"
        )
    }
})

const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setSearchDraft(state, action: PayloadAction<string>) {
            state.searchDraft = action.payload;
        },
        applySearch(state) {
            state.search = state.searchDraft.trim();
            state.page = 1;
        },
        addSkill(state, action: PayloadAction<string>) {
            const newSkill = action.payload.trim();

            if (!newSkill) {
                return;
            }

            const alreadyExists = state.skills.some((skill) => skill.toLowerCase() === newSkill.toLowerCase());
            if (!alreadyExists) {
                state.skills.push(newSkill);
                state.page = 1;
            }
        },
        removeSkill(state, action: PayloadAction<string>) {
            state.skills = state.skills.filter((skill) => skill !== action.payload);
            state.page = 1;
        },
        setArea(state, action: PayloadAction<string>) {
            state.area = action.payload;
            state.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        hydrateFiltersFromUrl(
            state,
            action: PayloadAction<{
                search: string,
                area: string,
                skills: string[],
            }>
        ) {
            state.search = action.payload.search;
            state.searchDraft = action.payload.search;
            state.area = action.payload.area;
            state.skills = action.payload.skills.length ? action.payload.skills : ['TypeScript', 'React', 'Redux'];
            state.page = 1
        },
        clearSelectedVacancy(state) {
            state.selectedVacancy = null
            state.selectedVacancyError = null
            state.selectedVacancyLoading = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacancies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVacancies.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.pages = action.payload.pages > 0 ? action.payload.pages : 1;
                state.loading = false;
            })
            .addCase(fetchVacancies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Неизвестная ошибка';
            })
            
            .addCase(fetchVacancyById.pending, (state) => {
                state.selectedVacancyLoading = true;
                state.selectedVacancyError = null;
            })
            .addCase(fetchVacancyById.fulfilled, (state, action) => {
                state.selectedVacancy = action.payload;
                state.selectedVacancyLoading = false;
            })
            .addCase(fetchVacancyById.rejected, (state, action) => {
                state.selectedVacancyLoading = false;
                state.selectedVacancyError = action.payload ?? 'Неизвестная ошибка'
            })
    },
});

export const {
    setSearchDraft,
    applySearch,
    addSkill,
    removeSkill,
    setArea,
    setPage,
    hydrateFiltersFromUrl,
    clearSelectedVacancy,
} = vacanciesSlice.actions;

export const selectVacancies = (state: RootState) => state.vacancies.items;
export const selectLoading = (state: RootState) => state.vacancies.loading;
export const selectError = (state: RootState) => state.vacancies.error;
export const selectSearch = (state: RootState) => state.vacancies.search;
export const selectSearchDraft = (state: RootState) => state.vacancies.searchDraft;
export const selectSkills = (state: RootState) => state.vacancies.skills;
export const selectArea = (state: RootState) => state.vacancies.area;
export const selectPage = (state: RootState) => state.vacancies.page;
export const selectPages = (state: RootState) => state.vacancies.pages;

export const selectSelectedVacancy = (state: RootState) => state.vacancies.selectedVacancy;
export const selectSelectedVacancyLoading = (state: RootState) => state.vacancies.selectedVacancyLoading;
export const selectSelectedVacancyError = (state: RootState) => state.vacancies.selectedVacancyError;

export default vacanciesSlice.reducer;