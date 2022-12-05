import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { PulseLoader } from 'react-spinners'
import useTitle from '../../hooks/useTitle'

const NewNote = () => {
    useTitle('shopNotes: New Note')

    const { users } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!users?.length) return <PulseLoader color={'#FFF'} />

    return <NewNoteForm users={users} />
}

export default NewNote