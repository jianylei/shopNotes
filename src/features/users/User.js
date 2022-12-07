import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

const User = ({ userId }) => {
    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${ userId }`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const status = user.active ? '' : 'card--inactive'

        return (
            <div className={`user__container ${status}`} onClick={handleEdit}>
                <div className='user__container-top'>
                    <div className=''>{user.username}</div>
                    <span className={ user.active
                            ? "note__status--completed"
                            : "note__status--open"
                        }>
                            <FontAwesomeIcon icon={faCircle} />
                    </span>
                </div>
                <div className='user__container-bottom'>
                    <div className=''>{userRolesString}</div>
                </div>
            </div>
        )
    } else return null
}

const memoizedUser = memo(User)

export default memoizedUser