import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'

const NewNote = () => {
    const users = useSelector(selectAllUsers)

    return users && users.length ? <NewNoteForm users={users} /> : <p>Loading...</p>
}

export default NewNote