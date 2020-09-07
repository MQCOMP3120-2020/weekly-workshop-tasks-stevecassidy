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
const create = (newObject, user) => {

    if (!user) {
        return new Promise(() => null)
    }

    const config = {headers: {Authorization: "Bearer " + user.token}  }

    return axios.post(baseURL + "units", newObject, config)
                .then(response => response.data)
}

/**
 * Update an existing unit via the API
 * @param {Object} unit An modified unit {code, title, offering}
 * @returns {Promise} Promise that will resolve to the response data
 */
const update = (unit, user) => {

    if (!user) {
        return new Promise(() => null)
    }

    const config = {headers: {Authorization: "Bearer " + user.token}  }

    return axios.put(baseURL + "units/" + unit.id, unit, config)
                .then(response => response.data)
}

/**
 * Delete an existing unit via the API
 * @param {integer} unitid the unit id to delete
 * @returns {Promise} Promise that will resolve to the response data
 */
const del = (unitid, user) => {
    
    if (!user) {
        return new Promise(() => null)
    }

    const config = {headers: {Authorization: "Bearer " + user.token}  }

    return axios.delete(baseURL + "units/" + unitid, config)
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

