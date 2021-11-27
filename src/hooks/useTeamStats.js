import { useState, useEffect } from "react"


export default function useTeamStats(heroesTeam) {

    const [teamTotalStats, setTeamTotalStats] = useState([])

    const [teamTotalAverage, setTeamTotalAverage] = useState([])

    useEffect(() => {

        const getTeamStats = (stat) => {
            return heroesTeam
                .map((hero) => parseInt(hero.powerstats[stat]) || 0)
                .reduce((a, b) => a + b, 0)
        }

        const getTeamAverageWeight = () => {
            return heroesTeam
                .map((hero) => parseInt(hero.appearance.weight[1]) || 0)
                .reduce((a, b) => a + b, 0) / (heroesTeam.length)
        }
        const getTeamAverageHeight = () => {
            return heroesTeam
                .map((hero) => parseInt(hero.appearance.height[1]) || 0)
                .reduce((a, b) => a + b, 0) / (heroesTeam.length)
        }

        const statTeamArray = [
            {
                title: "INTELIGENCIA TOTAL",
                stat: getTeamStats("intelligence"),
                info: "Equipo de inteligencia"
            },
            {
                title: "FUERZA TOTAL",
                stat: getTeamStats("strength"),
                info: "Equipo de fuerza"
            },
            {
                title: "VELOCIDAD TOTAL",
                stat: getTeamStats("speed"),
                info: "Equipo de velocidad"
            },
            {
                title: "DURABILIDAD TOTAL",
                stat: getTeamStats("durability"),
                info: "Equipo de durabilidad"
            },
            {
                title: "PODER TOTAL",
                stat: getTeamStats("power"),
                info: "Equipo de poder"
            },
            {
                title: "COMBATE TOTAL",
                stat: getTeamStats("combat"),
                info: "Equipo de combate"
            },
        ]

        const sumStatTotal = statTeamArray.sort((a, b) => b.stat - a.stat)

        setTeamTotalStats(sumStatTotal)

        const averageTeamArray = [
            {
                title: "PESO PROMEDIO",
                value: getTeamAverageWeight().toFixed(2) + ' kg'
            },
            {
                title: "ALTURA PROMEDIO",
                value: getTeamAverageHeight().toFixed(2) + ' cm'
            }
        ]

        setTeamTotalAverage(averageTeamArray)

    }, [heroesTeam])



    return { teamTotalStats, teamTotalAverage }
}
