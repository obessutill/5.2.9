import { Tabs } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

export const CityTabs = () => {
    const location = useLocation()

    const currentTab = location.pathname.includes('/vacancies/petersburg') ? 'petersburg' : 'moscow'

    return (
        <Tabs value={currentTab} mb="md">
            <Tabs.List>
                <Tabs.Tab value="moscow"
                renderRoot={(props) => <Link {...props} to="/vacancies/moscow"/>}>
                    Москва
                </Tabs.Tab>

                <Tabs.Tab value="petersburg"
                renderRoot={(props) => <Link {...props} to="/vacancies/petersburg" />}>
                    Санкт-Петербург
                </Tabs.Tab>
            </Tabs.List>
        </Tabs>
    )
}