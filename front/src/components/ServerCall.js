import axios from "axios";

const url = '/api/persons'

const post = (data) => {
  return axios.post(url, data)
}

const get = () => {
  return axios.get(url)
}

const deleteLine = (id) => {
  return axios.delete(url+"/"+id)
}

const put = (num, data) => {
  return axios.put(url+"/"+num, data)
}

export {post, get, deleteLine, put}