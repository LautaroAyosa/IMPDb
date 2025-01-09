import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOneById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getOneByUserName = async (username) => {
  const response = await axios.get(`${baseUrl}/username/${username}`)
  console.log(response.data)
  return response.data
}

const create = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const update = async (id, modifiedUser) => {
  const response = await axios.put(`${baseUrl}/${id}`, modifiedUser)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

// eslint-disable-next-line
export default { getAll, getOneById, getOneByUserName, create, update, remove }