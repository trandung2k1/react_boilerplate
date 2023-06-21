import React, { useEffect } from 'react'
import { useAppDispatch } from './store/hooks'
import { getUsers } from './store/slices/userSlice'
const App = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getUsers())
    })
    return <div>App</div>
}

export default App
