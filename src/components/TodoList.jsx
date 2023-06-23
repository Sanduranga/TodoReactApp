import React, { useState } from 'react'
import './todoList.css'

export default function TodoList({saveList, checkIndex, deletedIndex, editedIndex}) {

    const handleDelete = (deleteId) => {
      deletedIndex(deleteId) 
    }

    const handleEdit = (editId) => {
      editedIndex(editId)
    }

    const handleCheck = (checkId) => {
      checkIndex(checkId)
    }

  return (
    <div className='container'>
        <ul>
            {saveList.map((item, index)=>(
                <li className='list' key={index}>
                  <div>
                    <strong>User Id :</strong> {item.userId}<br/>
                    <strong>Id :</strong> {item.id}<br/>
                    <strong>Title :</strong> {item.title}<br/>
                    
                  </div>
                  <div>
                    <input className='checkBtn' type='checkbox' name='check' checked = {item.completed} onChange = { ()=> handleCheck(item.id) }></input>
                    <button className='editBtn' onClick={ ()=> handleEdit(item.id) }>Edit</button>
                    <button className='deletBtn' onClick={ ()=> handleDelete(item.id) }>Delete</button>
                  </div>     
                </li>
            )) }
            
        </ul>
    </div>
  )
}
