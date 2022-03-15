import React from 'react'
import LoginOrRegister from '../components/login/LoginOrRegister'
import RegisterForm from '../components/login/RegisterForm'
import Page from '../templates/Page'

function Register() {
    return (
            <LoginOrRegister>
                <RegisterForm />
            </LoginOrRegister>
    )
}

export default Register
