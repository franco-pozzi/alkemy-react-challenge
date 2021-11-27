import Spinner from 'react-bootstrap/Spinner'


export default function EmptyCard() {
    return (
        <div className="col heroe-col p-4">
            <div className="card">
                <div className='card-top d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant='info' style={{ 'height': '5rem', 'width': '5rem' }} />
                </div>

                <div className="card-body px-3 py-1 d-flex justify-content-center align-items-center">
                    <a className='btn btn-outline-info btn-lg mt-1' href='#search-hero'>Agregar Heroe</a>
                </div>
            </div>
        </div >
    )
}


