import React from 'react'

 const Part = ({ part}) => {
  return (
    <div style={{display:'flex', gap:8}}>
        <p>{part.name}</p>
        <p>{part.exercises}</p>
    </div>
  )
}

export default Part