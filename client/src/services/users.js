import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async newMovie => {
  const response = await axios.post(baseUrl, newMovie)
  return response.data
}

const update = async (id, modifiedMovie) => {
  const response = await axios.put(`${baseUrl}/${id}`, modifiedMovie)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

// eslint-disable-next-line
export default { getAll, getOne, create, update, remove }