import { useHeroInfo, useHeroStat } from "../hooks/useHero"
import { userTeamContext } from "../context/userTeamContext"

import { useContext } from "react"

import EmptyCard from "./EmptyCard"


export default function HeroesTeamArea() {

    const { finalTeam, deleteHero, heroBlank } = useContext(userTeamContext)

    const EmptyCards = [...Array(heroBlank)].map((e, i) => <EmptyCard key={i} />)

    return (
        <div className="container heroes-container" id='my-team'>
            <h2 className='text-center'>MI EQUIPO</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                <HeroesCard finalTeam={finalTeam} deleteHero={deleteHero} />

                {heroBlank > 0 && EmptyCards}
            </div>
        </div>
    )
}

const HeroesCard = ({ finalTeam, deleteHero }) => {
    return finalTeam.map((hero) => (
        <div className="col heroe-col p-4" key={hero.id}>
            <div className="card">
                <HeroCardTop hero={hero} />

                <HeroCardBody hero={hero} deleteHero={deleteHero} />
            </div>
        </div>
    ))
}

const HeroCardTop = ({ hero }) => {

    const { heroInfo } = useHeroInfo(hero)

    return (
        <div className='card-top' >
            <div className='front' >
                <img src={hero.image.url} className="card-img-top" alt="..." />
            </div>
            <div className='back'>
                <ul className="list-group list-group-flush">

                    {heroInfo.map(({ title, info }, i) => (
                        <HeroInfo key={i} title={title} info={info} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

const HeroInfo = ({ title, info }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className='fw-bolder detail-info'> {title} </span>
            <span className='text-end'> {info} </span>
        </li>
    )
}


const HeroCardBody = ({ hero, deleteHero }) => {

    const { heroStat } = useHeroStat(hero)

    return (
        <div className="card-body">
            <h6 className="card-title text-center m-0 fs-2">{hero.name}</h6>
            <div className='stats-info'>

                {heroStat.map(({ title, stat, color }, i) => (
                    <HeroStat key={i} title={title} stat={stat} color={color} />
                ))}

            </div>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-outline-info quit-btn' onClick={() => deleteHero(hero)}>Quitar del equipo</button>
            </div>
        </div>

    )
}


const HeroStat = ({ title, stat, color }) => {
    return (
        <div className='row row-cols-2 my-2'>
            <h6 className='col m-0'>{title}</h6>
            <div className="progress col px-0">
                <div
                    className={`progress-bar fw-bolder ${color}`}
                    role="progressbar"
                    style={stat !== 0 ? { width: stat + '%' } : { width: '100%' }}
                    aria-valuenow={stat} aria-valuemin="0" aria-valuemax="100"
                >

                    {stat !== 0 ? stat : 'no info'}

                </div>
            </div>
        </div>
    )
}



