/* */
import axios from 'axios'

const client = axios.create({
    aseURL: 'http://external.cocotutor.ml:3000/auth/',
    timeout: 5000,
})

export default client