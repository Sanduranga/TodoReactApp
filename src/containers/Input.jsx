import React, {useEffect, useState} from 'react'
import TodoList from '../components/TodoList'
import './input.css'
import axios from 'axios'

const Input = () => {

  const [input, setInput] = useState({userId:'',
                                      id :'',
                                      title:'',
                                      completed:''})
  const [list, setList] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [stateId, setStateId] = useState(0)
  const [useEfectParameter, setUseEfectParameter] = useState(0)


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos', list)
    .then(res => {setList(...list,res.data)})
    .catch(err => console.log(err))
    },[] )
    

    const handleInput = (event) => {
        setInput({...input, [event.target.name]:event.target.value})       
    }

    const {userId, id, title, completed} = input

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post('https://jsonplaceholder.typicode.com/todos', input)
        .then(res => {setList([...list,res.data])
                      alert('Submited!')})
        .catch(err => console.log(err))
        
        setInput({
          userId:'',
          id :'',
          title:'',
          completed:''})
    }

    const handleUpdate = (event) => {
        event.preventDefault()
        console.log(stateId)

        axios.put(`https://jsonplaceholder.typicode.com/todos/${stateId}`, input)
        .then(res => alert('Updated!'))
        .catch(err => console.log(err))
        setUseEfectParameter(useEfectParameter+1)

        setEditMode(false) 
        setInput({
          userId:'',
          id :'',
          title:'',
          completed:''})    
    }

    const handleCheck = (checkId) => {
      const checkUpdate = list[checkId-1]
      checkUpdate.completed === true? (checkUpdate.completed = false) : checkUpdate.completed = true
      console.log(checkUpdate)
      axios.put(`https://jsonplaceholder.typicode.com/todos/${checkId}`, checkUpdate)
        // .then(res => alert(res))
        // .catch(err => console.log(err))
        setUseEfectParameter(useEfectParameter+1)
        
    }
    

    const handleDelete = (deleteId) => {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${deleteId}`)
      .then(res => alert('Deleted!'))
      // .catch(err => console.log(err))
      setUseEfectParameter(useEfectParameter+1)
    }

    const handleEdit = (editId) => {
      axios.get(`https://jsonplaceholder.typicode.com/todos/${editId}`)
      .then(res => {setInput( res.data)})
      // .catch(err => console.log(err))

      setStateId(editId)
      setEditMode(true)
    }

  return (
    
    <div className='container'>
      
       { (editMode ? (
            <form onSubmit={ (event)=> handleUpdate(event) }>
              <input value={userId} type='number' name='userId' onChange={handleInput} placeholder='User id' ></input>
              <input value={id} type='number' name='id' onChange={handleInput} placeholder='Task id' ></input>
              <input value={title} type='text' name='title' onChange = { handleInput} placeholder='What To Do?'></input>
              <button className='updateBtn' type='submit' value='submit' >Update</button>
            </form>
            )
            :
              (userId==0 || id ==0) ? (
                <form >
                  <input value={userId} type='number' name='userId' onChange={handleInput} placeholder='User id'></input>
                  <input value={id} ype='number' name='id' onChange={handleInput} placeholder='Task id'></input>    
                </form>)
                : 
                  (title==0)? (
                      <form onSubmit={ (event)=> handleSubmit(event) }>
                        <input value={userId} type='number' name='userId' onChange={handleInput} placeholder='User id'></input>
                        <input value={id} type='number' name='id' onChange={handleInput} placeholder='Task id'></input>
                        <input  value={title} name='title' onChange = { handleInput} placeholder='What To Do?'></input>
                      </form>
                      ) 
                      :
                        (<form onSubmit={ (event)=> handleSubmit(event) }>
                          <input value={userId} type='number' name='userId' onChange={handleInput} placeholder='User ID'></input>
                          <input value={id} type='number' name='id' onChange={handleInput} placeholder='id'></input>
                          <input  value={title} name='title' onChange = { handleInput} placeholder='What To Do?'></input>
                          <button className='submitBtn' type='submit' value='submit' >Submit</button>
                        </form>
                        )                   
            )     
        }
      <TodoList saveList = {list}
                checkIndex = {handleCheck} 
                deletedIndex = {handleDelete} 
                editedIndex={handleEdit} 
                updatedIndex={handleUpdate}
       />
    </div>
  )
}
export default Input