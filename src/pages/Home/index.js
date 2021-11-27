import './Home.css'

import UserTeamContextProvider from '../../context/userTeamContext'

import HeroesTeamArea from "../../components/HeroesTeamArea"
import TeamStatsArea from "../../components/TeamStatArea"
import SearchHeroArea from "../../components/SearchHeroArea"
import ErrorToast from "../../components/ErrorToast"
import Header from '../../components/Header'

export default function Home() {

    document.title = 'Home | React Challenge'

    return (
        <UserTeamContextProvider>
            <Header />

            <HeroesTeamArea />

            <TeamStatsArea />

            <SearchHeroArea />

            <ErrorToast />
        </UserTeamContextProvider>
    )
}


