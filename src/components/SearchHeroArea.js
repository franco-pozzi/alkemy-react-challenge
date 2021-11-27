import { Formik, Form, Field } from 'formik'
import axios from 'axios'

import { useState, useContext } from 'react'
import { userTeamContext } from '../context/userTeamContext'


export default function SearchHeroArea() {

    const [heroResults, setHeroResults] = useState([])

    return (
        <div className='container search-containter my-5 p-4' id='search-hero'>
            <div className='search-area'>
                <SearchHero setHeroResults={setHeroResults} />

                {heroResults.length > 0 && <ResultsArea heroResults={heroResults} />}
            </div>
        </div>
    )
}


const SearchHero = ({ setHeroResults }) => {

    const validateFields = (values) => {
        const formError = {}

        if (!values.hero) {
            formError.hero = '¡ Debes ingresar nombre del héroe !'
        }
        return formError
    }

    const SubmitFormHandle = (values, { setHeroResults }, { setFieldError }) => {
        setHeroResults([])

        axios
            .get(`https://superheroapi.com/api/10226593207513599/search/${values.hero}`)
            .then(res =>
                (res.data.response === 'success') ? setHeroResults(res.data.results) : setFieldError('dataError', 'No hay héroe con los parametros ingresados')
            )
            .catch(error => setFieldError('dataError', 'Error en la búsqueda, intente nuevamente'))
    }

    return (
        <div className="row row-cols-1 row-cols-md-2 justify-content-evenly">
            <h3 className="col d-flex align-items-center justify-content-center justify-content-md-start">Buscador de héroes: </h3>

            <Formik
                initialValues={{ hero: '' }}
                validate={validateFields}
                onSubmit={(values, { setFieldError }) => SubmitFormHandle(values, { setHeroResults }, { setFieldError })}
            >
                {({ errors }) =>
                    <>
                        <Form className="col d-flex my-4">

                            <Field className="form-control me-2"
                                type="search"
                                name='hero'
                                placeholder={errors.hero ? "* campo requerido" : "Ej: Batman"}
                                style={errors.hero && { 'borderColor': 'red' }}
                                aria-label="Search"
                            />


                            <button className="btn btn-outline-info" type="submit">Buscar</button>

                        </Form>
                        {errors.dataError &&
                            <h5 className="my-4 text-center w-100" style={{ color: 'red' }}>
                                {errors.dataError || errors.hero}
                            </h5>
                        }
                    </>
                }
            </Formik>
            <p className='w-100'>Puedes buscar por nombre y agregar el héroe a tu equipo, recuerda que el tamaño máximo del equipo es 6, solo puedes tener 3 heroes buenos, 3 heroes malos y no puedes repetir héroes en tu equipo.</p>
        </div>
    )
}


const ResultsArea = ({ heroResults }) => {

    const { addNewHero } = useContext(userTeamContext)

    return (
        <div className='py-5'>
            <h4 className='text-center'>Resultados: </h4>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-evenly">

                {heroResults.length > 0 && heroResults.map(hero =>
                    <div className="col py-4 px-3" key={hero.id}>
                        <div className="card">
                            <img src={hero.image.url} className="card-top" alt={hero.name + ' image'} style={{ height: '70%' }} />

                            <div className="card-body" style={{ height: '30%' }}>
                                <h5 className="card-title text-center py-2">{hero.name}</h5>

                                <div className="d-flex justify-content-center">
                                    <button className='btn btn-outline-info quit-btn px-3 py-1' onClick={() => addNewHero(hero)}>AGREGAR AL EQUIPO</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}
