
import { useState,useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import  phoneServices from './services/phone'

const App = () => {

  const [phonebooks, setPhonebooks] = useState([])
  const [newName, setNewName] = useState({
    name:'',
    filter:''
  });
  const [number, setNumber] = useState(0);


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
     .catch(error => console.log('Error delete user :', error));
    }
     
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newName.filter} name='filter' handleOnChangeName={handleOnChangeName}/>

      <h3>Add a new</h3>
    <PersonForm value={newName.name} handleOnChangeName={handleOnChangeName} handleOnSubmit={handleOnSubmit} hanleOnChangeNumber={hanleOnChangeNumber} name='name' number={number}/>
      <h2>Numbers</h2>
       <Persons persons={newNamesFilters} handleOnClick={handleOnDelete}/>
    </div>
  )
}

export default App