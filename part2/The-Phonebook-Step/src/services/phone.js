import axios from 'axios'
export const baseUrl = 'http://localhost:3001/persons'

const getAllContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)  
}


const createContact = (name, contactNumber) => {
  const request = axios.post(baseUrl,{
    name,
    number:contactNumber
  })
  return request.then(response => response.data)  
}


const deleteContact =  (id) => {
  const request = axios.delete(`${baseUrl}/${id}`,{
    id,
  })
  return request.then((response)=>response.data) 
}


const updateContact =  (id, person) => {
  const request = axios.put(`${baseUrl}/${id}`,{
...person
  })
  return request.then((response)=>response.data)  

}
export default { 
  createContact,
  deleteContact,
  getAllContacts,
  updateContact
}