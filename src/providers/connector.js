import axios from 'axios'

const connector = axios.create({
  baseURL: 'http://70.176.31.167:3535/'
})

export default connector
