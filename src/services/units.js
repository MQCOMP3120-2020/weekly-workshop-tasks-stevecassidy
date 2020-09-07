import axios from 'axios'
const baseURL = "/api/"

/**
 * Get a list of all unitsfrom the api
 * @return {Promise}    Promise that will resolve to the response data
 */
const getAll = () => {
    return axios.get(baseURL + "units")
                .then(response => response.data)
}

/**
 * 
 * @param {Object} newObject a new unit object
 * @returns {Promise} Promise that will resolve to the response data
 */
const create = (newObject) => {

    return axios.post(baseURL + "units", newObject)
                .then(response => response.data)
}

/**
 * Update an existing unit via the API
 * @param {Object} unit An modified unit {code, title, offering}
 * @returns {Promise} Promise that will resolve to the response data
 */
const update = (unit) => {
    return axios.put(baseURL + "units/" + unit.id, unit)
                .then(response => response.data)
}

/**
 * Delete an existing unit via the API
 * @param {integer} unitid the unit id to delete
 * @returns {Promise} Promise that will resolve to the response data
 */
const del = (unitid) => {
    return axios.delete(baseURL + "units/" + unitid)
                .then(response => response.data)
}


/**
 * Send a login request
 * @param {Object} param0 {username, password} 
 * @returns {Promise} Promise that will resolve to the response data
 */
const login = ({username, password}) => {

    console.log("POST", baseURL + 'login')
    return axios.post(baseURL + 'login', {username, password})
    .then(response => response.data)
}

export default {getAll, create, update, delete: del, login} 

