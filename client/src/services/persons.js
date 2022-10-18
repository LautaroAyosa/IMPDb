import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async newPerson => {
  const response = await axios.post(baseUrl, newPerson)
  return response.data
}

const update = async (id, modifiedPerson) => {
  const response = await axios.put(`${baseUrl}/${id}`, modifiedPerson)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

// eslint-disable-next-line
export default { getAll, getOne, create, update, remove }