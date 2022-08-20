/* eslint-disable */
import axios from 'axios'
axios.defaults.baseURL = 'https://reqres.in'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
