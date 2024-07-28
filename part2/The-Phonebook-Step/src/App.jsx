
import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState({
    name:'',
    filter:''
  });
  const [number, setNumber] = useState(0);

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