
import { useState,useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import  phoneServices from './services/phone'
import './index.css'

const App = () => {

  const [phonebooks, setPhonebooks] = useState([])
  const [newName, setNewName] = useState({
    name:'',
    filter:''
  });
  const [number, setNumber] = useState(0);
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)


  useEffect(() => {
    phoneServices.getAllContacts()
      .then(response => setPhonebooks(response))
      .catch(error => console.log('Error fetching data:', error));
  }, []);


  const handleOnSubmit = (event) => {
    event.preventDefault();
    const nameAlreadyBook = phonebooks.find((person)=>person.name===newName.name);
    const updateNumber={...nameAlreadyBook, number}

    if (nameAlreadyBook) {
      if(window.confirm(`${nameAlreadyBook.name} is already added to phonebook`)){
        phoneServices.updateContact(nameAlreadyBook.id,{...updateNumber
      })
      .then((response)=>{
        
        const updateResult=phonebooks.map((person)=>person.id===response.id?response :person);
        setPhonebooks(updateResult)
     
      })
   
      }
      
    } else {
      phoneServices.createContact(newName.name, number)
        .then(response => {
          setPhonebooks([...phonebooks, response]);
        });
        setSuccess(true)
        setTimeout(()=>{
          setSuccess(false)
      }, 5000)
    }
  };
  

  const handleOnChangeName=(event)=>{
    const {name, value}=event.target
    setNewName({
      ...newName,
      [name]:value
    })
  }
  const hanleOnChangeNumber=(event)=>{
    const value=event.target.value;
    setNumber(value)
  }

  const newNamesFilters=phonebooks?.filter((person)=>person?.name?.toLowerCase().includes(newName.filter.toLowerCase()));
  
  
  const handleOnDelete=(phoneContact)=>{   
    if(window.confirm(`Delete ${phoneContact.name}`)){
      const response=phoneServices.deleteContact(phoneContact.id);
     response.then((response)=> phonebooks.filter((phonebook=>phonebook.name!==response.name)))
     .then((res)=>setPhonebooks([...res]))
     .catch(() => {
      setError(true)
      setTimeout(()=>{
setError(false)
      }, 5000)
      setPhonebooks(phonebooks.filter(n => n.id !== phoneContact.id))
    })
    }     
  }
if(phonebooks.length===0) return <div>Loading.....</div>
  return (
    <div>
      <h2>Phonebook</h2>
      {success && <h3 className='message'> Add {newName.name}</h3>}
      {error && <h3 className='error'> Information of {newName.name} was already delete from the server</h3>}
      <Filter filter={newName.filter} name='filter' handleOnChangeName={handleOnChangeName}/>

      <h3>Add a new</h3>
    <PersonForm value={newName.name} handleOnChangeName={handleOnChangeName} handleOnSubmit={handleOnSubmit} hanleOnChangeNumber={hanleOnChangeNumber} name='name' number={number}/>
      <h2>Numbers</h2>
       <Persons persons={newNamesFilters} handleOnClick={handleOnDelete}/>
    </div>
  )
}

export default App