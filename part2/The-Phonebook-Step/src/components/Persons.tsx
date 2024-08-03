import React from 'react'

 const Persons = ({persons,handleOnClick}) => {

  return (
    <div>
      {persons.map((person)=>{
          return (
            <div key={person.name} style={{display:'flex', flexDirection:'row', gap:8}}>
              <div>{person.name}</div>
              <div>{person.number}</div>
              <button onClick={()=>handleOnClick(person)}>delete</button>
            </div>
        )
      })}
    </div>
  )
}

export default Persons