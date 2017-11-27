/* */
import axios from 'axios'

const client = axios.create({
    // baseURL: 'http://localhost:80',
    baseURL: 'https://external.cocotutor.ml/',
    // timeout: 5000,
})

export default client