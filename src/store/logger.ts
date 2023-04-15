// eslint-disable-next-line import/named
import { Reducer } from '@reduxjs/toolkit'
import type { CombinedState } from '@reduxjs/toolkit'
import { RootState } from './store'
export interface IAction {
    type: string
}
const logger = (reducer: Reducer<CombinedState<RootState>, IAction>) => {
    return (prevState: CombinedState<RootState>, action: IAction) => {
        console.group(action.type)
        console.log('Action type: ', action.type)
        console.log('PrevState: ', prevState)
        const newState = reducer(prevState, action)
        console.log('NewState: ', newState)
        console.groupEnd()
        return newState
    }
}
export default logger
