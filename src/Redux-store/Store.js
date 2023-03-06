import { configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import counterReducer from './Local-state';
  
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
  
const persistedReducer = persistReducer(persistConfig, counterReducer)
export const store = configureStore({
    reducer: { LocalSate : persistedReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})