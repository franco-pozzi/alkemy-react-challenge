import { useState, useEffect } from "react"

export function useHeroStat(hero) {

    const [heroStat, setHeroStat] = useState([])

    useEffect(() => {

        const getHeroStat = (stat) => (parseInt(hero.powerstats[stat]) || 0)

        const heroCompleteStat = [
            {
                title: "INTELIGENCIA",
                stat: getHeroStat("intelligence"),
                color: 'bg-primary'
            },
            {
                title: "FUERZA",
                stat: getHeroStat("strength"),
                color: 'bg-secondary'
            },
            {
                title: "VELOCIDAD",
                stat: getHeroStat("speed"),
                color: 'bg-warning'
            },
            {
                title: "DURABILIDAD",
                stat: getHeroStat("durability"),
                color: 'bg-danger'
            },
            {
                title: "PODER",
                stat: getHeroStat("power"),
                color: 'bg-dark'
            },
            {
                title: "COMBATE",
                stat: getHeroStat("combat"),
                color: 'bg-success'
            },
        ]

        setHeroStat(heroCompleteStat)
    }, [hero])

    return { heroStat }
}

export function useHeroInfo(hero) {

    const [heroInfo, setHeroInfo] = useState([])

    useEffect(() => {

        const getHeroApparance = (info) => (hero.appearance[info])

        const heroCompleteInfo = [
            {
                title: "Nombre",
                info: hero.name
            },
            {
                title: "Alias",
                info: hero.biography.aliases[0]
            },
            {
                title: "Peso",
                info: getHeroApparance("weight")[1]
            },
            {
                title: "Altura",
                info: getHeroApparance("height")[1]
            },
            {
                title: "Color de ojos",
                info: getHeroApparance("eye-color")
            },
            {
                title: "Color de cabello",
                info: getHeroApparance("hair-color")
            },
            {
                title: "Lugar de trabajo",
                info: hero.work.base
            }
        ]

        setHeroInfo(heroCompleteInfo)
    }, [hero])

    return { heroInfo }
}