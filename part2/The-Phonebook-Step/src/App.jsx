
import { useState,useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState({
    name:'',
    filter:''
  });
  const [number, setNumber] = useState(0);


useEffect(() => {
  try {
    axios.get('http://localhost:3001/persons')
    .then((response)=> response.data) 
    .then((data)=>{
      setPersons([...data])
    })  
  } catch (error) {
    console.log('error', error)
  }
}, [])


  const handleOnSubmit=(event)=>{
    event.preventDefault();
    const isNewNanme=persons.some((person)=>person.name===newName.name);
    
    if(isNewNanme){
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons([...persons, {
        name:newName.name,
        number:number
      }])

    }
  }

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


  const newNamesFilters=persons.filter((person)=>person.name.toLowerCase().includes(newName.filter.toLowerCase()));
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newName.filter} name='filter' handleOnChangeName={handleOnChangeName}/>

      <h3>Add a new</h3>
    <PersonForm value={newName.name} handleOnChangeName={handleOnChangeName} handleOnSubmit={handleOnSubmit} hanleOnChangeNumber={hanleOnChangeNumber} name='name' number={number}/>
      <h2>Numbers</h2>
       <Persons persons={newNamesFilters}/>
    </div>
  )
}

export default App