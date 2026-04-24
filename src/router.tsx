import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from './pages/Layout';
import { ErrorPage } from './pages/ErrorPage';
import { VacanciesPage } from "./pages/VacanciesPage";
import { VacancyDetailsPage } from "./pages/VacancyDetailsPage";
import { MoscowVacanciesPage } from './pages/MoscowVacanciesPage';
import { PetersburgVacanciesPage } from './pages/PetersburgVacanciesPage';
import { moscowVacanciesLoader, petersburgVacanciesLoader, vacancyDetailsLoader } from "./loaders/vacanciesLoader";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Navigate to="/vacancies/moscow" replace />,
            },
            {
                path: 'vacancies',
                children: [
                    {
                        element: <VacanciesPage />,
                        children: [
                            {
                                index: true,
                                element: <Navigate to="/vacancies/moscow" replace />,
                            },
                            {
                                path: 'moscow',
                                loader: moscowVacanciesLoader,
                                element: <MoscowVacanciesPage />,
                            },
                            {
                                path: 'petersburg',
                                loader: petersburgVacanciesLoader,
                                element: <PetersburgVacanciesPage />
                            }
                        ]
                    },
                    {
                        path: ':id',
                        loader: vacancyDetailsLoader,
                        element: <VacancyDetailsPage />,
                    }
                ]
            }
        ]
    }
])