/* */
import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'http://external.cocotutor.ml:3000/auth/',
    timeout: 5000,
})

export default client