import React from 'react'
import ReactDOM from 'react-dom'
import AuthForm from './AuthForm'
import axios from 'axios'
import Env from '../classes/Env'
// this is imported from src/react/example.jsx

window.env = new Env()
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Accept'] = window.env.get().accept
window.axios.defaults.headers.common['Authorization'] = window.env.get().access_token

const authform = <AuthForm />

ReactDOM.render(
  authform,
  document.getElementById('app')
)
