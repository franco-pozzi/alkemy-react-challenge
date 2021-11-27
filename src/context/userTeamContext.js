import { createContext, useState, useEffect } from "react"
import { randomTeam } from "../services/randomTeams"



export const userTeamContext = createContext('no-provider')


export default function UserTeamContextProvider({ children }) {

    const initializeTeam = () => (localStorage.getItem('team') ? JSON.parse(localStorage.getItem('team')) : randomTeam[Math.floor(Math.random() * randomTeam.length)])

    const [heroesGod, setHeroesGod] = useState(3)

    const [heroesBad, setHeroesBad] = useState(3)

    const [heroBlank, setHeroesBlank] = useState(0)

    const [teamError, setTeamError] = useState([])

    const [finalTeam, setFinalTeam] = useState(initializeTeam())


    useEffect(() => {
        setHeroesBlank(6 - finalTeam.length)

        setHeroesGod(finalTeam.filter(i => i.biography.alignment === 'good').length)
        setHeroesBad(finalTeam.filter(i => i.biography.alignment === 'bad').length)

        localStorage.setItem("team", JSON.stringify(finalTeam))
    }, [finalTeam])



    function deleteHero(hero) {
        if (finalTeam.length > 1) {
            const newTeam = finalTeam.filter(i => i.id !== hero.id)

            setFinalTeam(newTeam)
            setTeamError('hero-deleted')
        }
        else {
            setTeamError('La cantidad mínima de héroes en tu equipo es 1')
        }
    }

    function addNewHero(hero) {
        const checkHero = finalTeam.filter(i => i.id === hero.id)

        if (checkHero.length > 0) {
            return setTeamError('El héroe ya pertenece al equipo')
        }

        if (finalTeam.length === 6) {
            return setTeamError('La cantidad máxima de héroes en tu equipo es 6')
        }

        if (hero.biography.alignment === 'good') {
            if (heroesGod === 3) {
                setTeamError('La cantidad máxima de héroes de orientación buena en tu equipo es 3')
            }
            else {
                setTeamError('hero-added')
                setFinalTeam([...finalTeam, hero])
            }
        }

        if (hero.biography.alignment === 'bad') {
            if (heroesBad === 3) {
                setTeamError('La cantidad máxima de héroes de orientación mala en tu equipo es 3')
            }
            else {
                setTeamError('hero-added')
                setFinalTeam([...finalTeam, hero])
            }
        }
    }

    return (
        <userTeamContext.Provider value={{ heroBlank, finalTeam, deleteHero, addNewHero, setTeamError, teamError }}>
            {children}
        </userTeamContext.Provider>
    )
}