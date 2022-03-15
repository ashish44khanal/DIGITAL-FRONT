import React from 'react'
import LoginForm from '../components/login/LoginForm'
import LoginOrRegister from '../components/login/LoginOrRegister'

function Login() {
    return (
        <div>
            <LoginOrRegister>
                <LoginForm />
            </LoginOrRegister>
        </div>
    )
}

export default Login
