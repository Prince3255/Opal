'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import FolderReducer from './slice/folders'
import WorkSpaceReducer from './slice/workspaces'
import UserReducer from './slice/user'

import { TypedUseSelectorHook, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  FolderReducer,
  WorkSpaceReducer,
  UserReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
