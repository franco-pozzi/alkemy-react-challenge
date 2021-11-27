import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'

import './LogIn.css'
import reactLogo from '../../images/reactLogo.png'
import { BiLogIn, BiError } from 'react-icons/bi'

import { useContext } from 'react'
import { authContext } from '../../context/authContext'




const validateFields = (values) => {
    const errors = {}

    if (!values.email) {
        errors.email = 'Ingrese su email'
    }
    if (!values.password) {
        errors.password = 'Ingrese su contraseña'
    }
    return errors
}

const SubmitFormHandle = (values, { addToken, setFieldError }) => {


    axios.defaults.headers.common["Authorization"] = ""
    localStorage.removeItem("token")

    axios
        .post("http://challenge-react.alkemy.org/", values)
        .then(response => {
            const token = response.data.token

            axios.defaults.headers.common["Authorization"] = "Token " + token

            localStorage.setItem("token", token)

            addToken(token)
        })
        .catch(error => {
            setFieldError('submitError', 'El email o la contraseña son inválidos.')
        })

}


export default function LogIn() {

    document.title = 'Log-In | React Challenge'

    const { addToken } = useContext(authContext)

    return (

        <section className='login-section d-flex align-items-center'>
            <div className='container d-flex justify-content-center'>
                <div className='col-10 col-sm-9 col-md-8 col-lg-7 col-xl-6 col-xxl-5'>
                    <div className='login-card'>
                        <div className='logo-area'>
                            <img className='logo' src={reactLogo} alt="" />
                        </div>
                        <h1 className='text-center fs-4 '>Challenge React Alkemy</h1>
                        <p className='fs-6 mt-3' >Para acceder ingrese sus datos de usuario:</p>

                        <hr className='separator' />

                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validate={validateFields}
                            onSubmit={(values, { setFieldError }) => SubmitFormHandle(values, { addToken, setFieldError })}
                        >

                            {({ errors }) =>

                                <Form >
                                    <div className='mb-2 mt-3'>
                                        <label className='form-label' htmlFor="email">Email:</label>

                                        <Field className='form-control login-field fw-light' style={errors.email && { border: '1px solid red' }} name='email' placeholder='challenge@alkemy.org' type='email' />

                                        <ErrorMessage name='email'>
                                            {msg => <div className='alert alert-danger mt-1 text-center' ><BiError className='me-1' />{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    <div className='mb-3'>
                                        <label className='form-label' htmlFor="password">Contraseña:</label>

                                        <Field className='form-control login-field fw-light' style={errors.password && { border: '1px solid red' }} name='password' placeholder='react' type='password' />

                                        <ErrorMessage name='password'>
                                            {msg => <div className='alert alert-danger mt-1 text-center' ><BiError className='me-1' />{msg}</div>}
                                        </ErrorMessage>
                                    </div>

                                    {errors.submitError && <div className='alert alert-danger my-1 text-center' >{errors.submitError}</div>}

                                    <button className='btn service-btn mt-1' type="submit" > Enviar <BiLogIn className='service-icon' /> </button>

                                </Form>
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    )
}
