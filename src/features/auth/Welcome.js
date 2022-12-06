import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Welcome = () => {
    const { username, isManager, isAdmin } = useAuth()

    useTitle(`shopNotes: ${username}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

  return (
    <section className="welcome">
        <p>{today}</p>

        <p><Link to="/dash/notes">View Notes</Link></p>
        <p><Link to="/dash/notes/new">Add New Note</Link></p>

        {(isManager || isAdmin) && 
            <>
                <p><Link to="/dash/users">View User Settings</Link></p>
                <p><Link to="/dash/users/new">Add New User</Link></p>
            </>
        }
    </section>
  )
}

export default Welcome