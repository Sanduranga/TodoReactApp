import React, {useState} from 'react'
import TodoList from '../components/TodoList'
import './input.css'

const Input = () => {

  const [input, setInput] = useState('')
  const [list, setList] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [editIndex, setEditIndex] = useState(0)
  const [taskCount, setTaskCount] = useState(0)
    

    const handleInput = (event) => {
        setInput(event.target.value) 
           
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()

        setList([...list,input])
        setInput('')
        setTaskCount(taskCount+1)
    }

    const handleUpdate = (event) => {
        event.preventDefault()

        const updatedTask = [...list]
        updatedTask[editIndex] = input
        setList(updatedTask)
        setEditMode(false) 
        setInput('')    
    }

    const handledelete = (index) => {
      const updatedData = list.filter((_, i) => i !== index);
      setList(updatedData)
      setTaskCount(taskCount-1)
    }

    const handleEdit = (index) => {
      setInput(list[index])
      setEditIndex(index)
      setEditMode(true)
    }

  return (
    
    <div className='container'>
      {input==0? (
          <form >
            <input  value={input} onChange = { handleInput} placeholder='What To Do?'></input>     
          </form>)
        : 
        (!editMode ? (
            <form onSubmit={ (event)=> handleSubmit(event) }>
              <input  value={input} onChange = { handleInput}></input>
              <button type='submit' value='submit' >Submit</button>
            </form>
            ) 
            : 
              (<form onSubmit={ (event)=> handleUpdate(event) }>
                <input value={input} onChange = { handleInput}></input>
                <button type='submit' value='submit' >Update</button>
              </form>
              )
        )  
      }
      <TodoList saveList = {list} totalTasks = {taskCount} deletedIndex = {handledelete} editedIndex={handleEdit} updatedIndex={handleUpdate} />
    </div>
  )
}
export default Input