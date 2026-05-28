import React from 'react'
import NoteCard from './components/NoteCard'
import Sidebar from './components/Sidebar'
import NoteEditor from './components/NoteEditor'
import EmptyState from './components/EmptyState'

const App = () => {
  const [notes, setNotes] = React.useState(() => {
    const savedNotes = localStorage.getItem("notes")
    return savedNotes ? JSON.parse(savedNotes) : []
  })

  const [activeNoteId, setActiveNoteId] = React.useState(null)

  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(()=> {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  React.useEffect(() => {
    if (notes.length > 0 && !activeNoteId) {
      setActiveNoteId(notes[0].id)
    }
  }, [notes, activeNoteId])

  function handleNewNote(){
    const newNote = {
      id: String(Date.now()),
      title: "",
      body: "",
      tag: "personal",
      updatedAt: new Date().toISOString()
    }

    const newNotes = [
      newNote,
      ...notes
    ]

    setNotes(newNotes)
    setActiveNoteId(newNote.id)
  }

  function handleSelectNote(value){
    setActiveNoteId(value)
  }

  function handleUpdateNote(id, changes){
    const updatedNotes = notes.map((note) => {
      if(note.id === id){
        return {
          ...note,
          ...changes,
          updatedAt: new Date().toISOString()
        }
      }
      
      return note
    })

    setNotes(updatedNotes)
  }

  function handleDeleteNote(id){
    const filteredNotes = notes.filter((note) => {
      return note.id !== id
    })

    setNotes(filteredNotes)

    if(activeNoteId === id){
      setActiveNoteId(
        filteredNotes.length > 0 
        ? filteredNotes[0].id
        : null
      )
    }
  }

  function handleSearchChange(value){
    setSearchQuery(value)
  }

  function formatDate(dateString){
    const date = new Date(dateString)

    const now = new Date()

    const isToday = date.toDateString() === now.toDateString()
    
    const time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    })

    if(isToday){
      return `Today, ${time}`
    }

    return date.toLocaleDateString([], {
      weekday: "short",
      day: "numeric",
      month: "short"
    }) + `, ${time}`
  }

  function formatLastEdited(dateString){
    const date = new Date(dateString)

    const time = date.toLocaleTimeString([],{
      hour: "numeric",
      minute: "2-digit"
    })

    return `Last edited today at ${time}`
  }

  const filteredNotes = searchQuery === "" 
                        ? notes
                        : notes.filter((note) => {
                          return (
                            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            note.body.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                        })

  const activeNote = searchQuery.trim() !== ""
    ? filteredNotes.find(note => note.id === activeNoteId)
    : notes.find(note => note.id === activeNoteId)

  return (
    <div className='app'>
      <Sidebar 
              notes = {filteredNotes} 
              activeNoteId = {activeNoteId}
              searchQuery = {searchQuery}
              onNewNote = {handleNewNote}
              onSelectNote = {handleSelectNote}
              onSearchChange = {handleSearchChange}
              formatDate={formatDate}
      />

      {/* {activeNote ? <NoteEditor 
            note = {activeNote}
            onUpdate = {handleUpdateNote}
            onDelete = {handleDeleteNote}
            formatLastEdited={formatLastEdited}
          /> 
        : <EmptyState onNewNote={handleNewNote} />
        } */}

      {searchQuery && filteredNotes.length === 0 ? (
        <EmptyState
          title="No matching notes"
          message="Try searching with another keyword."
          buttonText="Create New Note"
          onNewNote={handleNewNote}
        />
      ) : searchQuery && !activeNote ? (
        <EmptyState
          title="Select a result"
          message="Choose a note from the search results to open it."
        />
      ) : activeNote ? (
        <NoteEditor
          note={activeNote}
          onUpdate={handleUpdateNote}
          onDelete={handleDeleteNote}
          formatLastEdited={formatLastEdited}
        />
      ) : (
        <EmptyState
          title="No note selected"
          message="Create a new note to start writing."
          buttonText="Create New Note"
          onNewNote={handleNewNote}
        />
      )}
    </div>
  )
}

export default App