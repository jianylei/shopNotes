import { useNavigate } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'

const Note = ({ noteId }) => {
    const { note } = useGetNotesQuery('notesList', {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        })
    })

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', 
            { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', 
            { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr className="table__row" onClick={handleEdit}>
                <td className="table__cell note__ticket">#{note.ticket}</td>
                <td className="table__cell note__title">{note.title}</td>
                <td className="table__cell note__username">{note.username}</td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__status">
                    {note.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
            </tr>
        )

    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote