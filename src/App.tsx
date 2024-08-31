import { useEffect } from 'react'
import { useAppDispatch } from './store/hooks'
import { getUsers } from './store/slices/userSlice'
const App = () => {
    console.log(process.env.REACT_APP_PORT)
    console.log(process.env.PORT)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getUsers())
    })
    return <div>App</div>
}

export default App
