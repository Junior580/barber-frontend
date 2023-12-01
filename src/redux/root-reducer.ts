import { combineReducers } from 'redux'

import auth from './auth/slice'

export const rootReducer = combineReducers({ auth })

export type RootState = ReturnType<typeof rootReducer>
