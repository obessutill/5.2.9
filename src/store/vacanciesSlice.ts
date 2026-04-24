import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface VacanciesState {
    search: string,
    searchDraft: string,
    skills: string[],
}

const initialState: VacanciesState = {
    search: '',
    searchDraft: '',
    skills: ['TypeScript', 'React', 'Redux'],
}

const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setSearchDraft(state, action: PayloadAction<string>) {
            state.searchDraft = action.payload
        },

        applySearch(state) {
            state.search = state.searchDraft.trim()
        },

        addSkill(state, action: PayloadAction<string>) {
            const newSkill = action.payload.trim()

            if (!newSkill) {
                return;
            }

            const alreadyExists = state.skills.some((skill) => skill.toLowerCase() === newSkill.toLowerCase())

            if (!alreadyExists) {
                state.skills.push(newSkill)
            }
        },

        removeSkill(state, action: PayloadAction<string>) {
            state.skills = state.skills.filter((skill) => skill !== action.payload)
        },

        hydrateFiltersFromUrl(state, action: PayloadAction<{
            search: string,
            skills: string[]
        }>) {
            state.search = action.payload.search
            state.searchDraft = action.payload.search
            state.skills = action.payload.skills
        },
    },
})

export const {
    setSearchDraft,
    applySearch,
    addSkill,
    removeSkill,
    hydrateFiltersFromUrl,
} = vacanciesSlice.actions

export const selectSearch = (state: RootState) => state.vacancies.search;
export const selectSearchDraft = (state: RootState) => state.vacancies.searchDraft;
export const selectSkills = (state: RootState) => state.vacancies.skills;

export default vacanciesSlice.reducer