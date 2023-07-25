import axios from "axios";
const baseUrl = 'http://localhost:3002/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObejct => {
    const request = axios.post(baseUrl, personObejct)
    return request.then(response => response.data)
}

const update = (id, personObejct) => {
    const request = axios.put(`${baseUrl}/${id}`, personObejct)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, deletePerson }