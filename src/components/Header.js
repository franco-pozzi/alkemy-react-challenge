import { RiTeamLine, RiSearchLine, RiLogoutCircleRLine, RiCloseLine, RiMoonLine, RiMenu3Line, RiSunLine } from 'react-icons/ri'
import { BiStats } from 'react-icons/bi'

import { useState, useContext, useEffect } from 'react'

import { authContext } from '../context/authContext'



export default function Header() {

    const { removeToken } = useContext(authContext)

    const [showMenu, setShowMenu] = useState(false)

    const [isDark, setIsDark] = useState(localStorage.getItem('user-theme') || 'light-mode')


    useEffect(() => {
        if (isDark === 'dark-mode') {
            document.body.classList.add('dark-theme')
            localStorage.setItem('user-theme', 'dark-mode')
        }
        else {
            document.body.classList.remove('dark-theme')
            localStorage.setItem('user-theme', 'light-mode')
        }

    }, [isDark])



    return (
        <header className="header" >
            <nav className="nav header__container">
                <span className="nav__logo">REACT CHALLENGE</span>

                <div className={`nav__menu ${showMenu ? 'show-menu' : ''}`} >
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <a href="#my-team" className="nav__link" onClick={() => setShowMenu(false)}>
                                <RiTeamLine className="nav__icon" />
                                MI EQUIPO
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#team-stats" className="nav__link " onClick={() => setShowMenu(false)}>
                                <BiStats className="nav__icon" />
                                ESTADÍSTICAS
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#search-hero" className="nav__link" onClick={() => setShowMenu(false)}>
                                <RiSearchLine className="nav__icon" />
                                BUSCAR
                            </a>
                        </li>
                        <li className="nav__item">
                            <a className="nav__link" href='/log-in' onClick={() => removeToken()}>
                                <RiLogoutCircleRLine className="nav__icon" />
                                SALIR
                            </a>
                        </li>
                    </ul>
                    <RiCloseLine className="nav__close" onClick={() => setShowMenu(false)} />
                </div>

                <div className="nav__btns">
                    {isDark === 'light-mode' ? <RiSunLine className="change-theme" onClick={() => setIsDark('dark-mode')} /> : <RiMoonLine className="change-theme" onClick={() => setIsDark('light-mode')} />}
                    <RiMenu3Line className={`nav__toggle ${showMenu && 'hidden-menu'}`} onClick={() => setShowMenu(true)} />
                </div>
            </nav>
        </header>
    )
}
