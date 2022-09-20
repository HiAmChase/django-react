import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const NotePage = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  let [note, setNote] = useState(null)

  useEffect(() => {
    getNote()
  }, [])

  let getNote = async () => {
    let response = await fetch(`/api/notes/${id}`)
    let data = await response.json()
    console.log(id);
    setNote(data)
  }

  let deleteNote = async () => {
    fetch(`/api/notes/${id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    navigate('/')
  }

  let updateNote = async () => {
    fetch(`/api/notes/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  let handleSubmit = () => {
    updateNote()
    navigate('/')
  }

  return (
    <div className='note'>
        <div className='note-header'>
              <button onClick={handleSubmit}>Back</button>
              <button onClick={deleteNote}>Delete</button>
        </div>
        <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage