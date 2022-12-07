import { useGetUsersQuery } from './usersApiSlice'
import { PulseLoader } from 'react-spinners'
import User from './User'
import useTitle from '../../hooks/useTitle'
import { useEffect } from 'react'

const UsersList = () => {
    useTitle('shopNotes: Users List')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content 

    if (isLoading) content = <PulseLoader color={'#FFF'} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const usersContent = ids?.length
            && ids.map(userId => <User key={userId} userId={userId} />)

        content = (
            <div className='content__container'>
                <h2>Users</h2>
                {usersContent}
            </div>
        )
    }
    return content
}

export default UsersList