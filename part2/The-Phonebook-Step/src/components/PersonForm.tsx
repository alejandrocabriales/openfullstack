import React from 'react'

 const PersonForm = ({handleOnSubmit, name,handleOnChangeName,hanleOnChangeNumber, number, value}) => {
  return (
    <form onSubmit={handleOnSubmit}>
    <div>
      <div>name: <input value={value} onChange={handleOnChangeName} name={name}/></div>
      <div> number: <input value={number} onChange={hanleOnChangeNumber} /></div>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm
