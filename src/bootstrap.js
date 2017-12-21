import axios from 'axios'
import Env from './classes/Env'

window.env = new Env()
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Accept'] = window.env.get().accept
window.axios.defaults.headers.common['Authorization'] = window.env.get().access_token
