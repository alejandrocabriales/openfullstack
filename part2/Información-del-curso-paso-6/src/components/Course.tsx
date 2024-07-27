import React from 'react'
import Header from './Header'
import Part from './Part'
import { Content } from './Content'
import Total from './Total'

 const Course = ({courses}) => {
  return (
    <div>
      {courses.map((course)=>(
      <div key={course.id}>
        <Header name={course.name}/>
          <div>
            <Content parts={course.parts}/>
          </div>
          <Total parts={course.parts}/>
        
        </div>
      ))}
    </div>
  )
}

export default Course