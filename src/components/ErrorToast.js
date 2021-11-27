import { useContext } from 'react'
import { userTeamContext } from '../context/userTeamContext'

import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { AiOutlineClose } from 'react-icons/ai'



export default function ErrorToast() {

    const { teamError, setTeamError } = useContext(userTeamContext)

    if (teamError.length === 0) {
        return <></>
    }

    if (teamError === 'hero-added') {
        return (
            <>
                <ToastContainer className="p-3">
                    <Toast bg={'success'} >
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Héroe agregado</strong>
                            <button className='toast-button' onClick={() => setTeamError([])} > <AiOutlineClose /> </button>
                        </Toast.Header>
                        <Toast.Body>Haz agregado correctamente el héroe  a tu equipo</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        )
    }

    if (teamError === 'hero-deleted') {
        return (
            <>
                <ToastContainer className="p-3">
                    <Toast bg={'success'}>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Héroe eliminado</strong>
                            <button className='toast-button' onClick={() => setTeamError([])} > <AiOutlineClose /> </button>
                        </Toast.Header>
                        <Toast.Body>Haz eliminado correctamente el héroe  de tu equipo</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        )
    }

    else {
        return (
            <>
                <ToastContainer className="p-3">
                    <Toast bg={'danger'}>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">ERROR</strong>
                            <button className='toast-button' onClick={() => setTeamError([])} > <AiOutlineClose /> </button>
                        </Toast.Header>
                        <Toast.Body>{teamError}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
        )
    }
}
