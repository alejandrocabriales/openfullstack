import React from 'react'

 const Filter = ({filter,handleOnChangeName, name}) => {
  return (
    <div style={{marginBottom:12}}>filter shown with: 
        <input value={filter} onChange={handleOnChangeName} name={name}/>
    </div>
  )
}

export default Filter