import React, { useState } from 'react'

export default function TodoList({saveList, totalTasks, deletedIndex, editedIndex}) {

  const [checkCount, setCheckCount] = useState(0)

    const handleDelete = (index) => {
      deletedIndex(index) 
    }

    const handleEdit = (index) => {
      editedIndex(index)
    }

    const handleCheck = (e) => {
      console.log(e.target.checked)
      e.target.checked ? setCheckCount(checkCount+1) : setCheckCount(checkCount-1)
    }

  return (
    <div>
        <ul>
            {saveList.map((item, index)=>(
                <li key={index}>
                  {item}
                  <input type='checkbox' name='check' onChange = { (e)=> handleCheck(e) }></input>
                  <button onClick={ ()=> handleEdit(index) }>Edit</button>
                  <button onClick={ ()=> handleDelete(index) }>Delete</button>
                </li>
            )) }
            
        </ul>
        <strong>Your success percentage is : {(checkCount/totalTasks*100)}% </strong>
    </div>
  )
}
