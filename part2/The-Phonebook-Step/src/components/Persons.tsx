import React from 'react'

 const Persons = ({persons}) => {
  return (
    <div>
      {persons.map((person)=>{
          return (
            <div key={person.name} style={{display:'flex', flexDirection:'row', gap:8}}>
              <div>{person.name}</div>
              <div>{person.number}</div>
            </div>
        )
      })}
    </div>
  )
}

export default Persons