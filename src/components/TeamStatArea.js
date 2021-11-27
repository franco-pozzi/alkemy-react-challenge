import { useContext } from "react"
import { userTeamContext } from "../context/userTeamContext"
import useTeamStats from "../hooks/useTeamStats"

export default function TeamStatsArea() {

    const { finalTeam } = useContext(userTeamContext)

    const { teamTotalStats, teamTotalAverage } = useTeamStats(finalTeam)

    return (
        <>
            {teamTotalStats.length > 0 && (
                <div className="container stat-container my-5" id='team-stats'>
                    <h1 className="row d-flex justify-content-center my-3">Estadísticas de tu equipo</h1>
                    <div className="row row-cols-1 row-cols-md-2">
                        <div className="col d-flex flex-column justify-content-center align-items-center">
                            <h3 className="row">
                                {teamTotalStats[0].info !== 0 ? teamTotalStats[0].info : ''}
                            </h3>
                            <div className="average-info row row-cols-1 row-cols-xl-2 w-100 m-2">
                                {teamTotalAverage.map(({ title, value }, i) => (
                                    <div className="col d-inline-flex justify-content-between my-2 px-3" key={i}>
                                        <h6 className='my-1'>{title} :</h6>
                                        <span className='fw-bold my-1'>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col px-4">
                            {teamTotalStats.map(({ title, stat }, i) => (
                                <StatBar key={i} title={title} stat={stat} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

const StatBar = ({ title, stat }) => {
    return (
        <div className="stat-item row row-cols-1 row-cols-md-2 mx-2 my-xl-2">
            <h6 className='col text-center my-2 w-100'>{title}</h6>
            <div className="progress col w-100 m-1 p-0">
                <div
                    className="progress-bar bg-info progress-bar-striped progress-bar-animated text-dark"
                    role="progressbar"
                    style={{ width: stat / 6 + "%" }}
                    aria-valuenow={stat}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    {stat}
                </div>
            </div>
        </div>
    )
}
