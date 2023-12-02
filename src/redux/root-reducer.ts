import { combineReducers } from 'redux'

import auth from './auth/slice'
import toast from './toast/slice'

export const rootReducer = combineReducers({ auth, toast })

export type RootState = ReturnType<typeof rootReducer>
