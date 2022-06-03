import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import { app } from './reducers';
import { useDispatch } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const reducer = combineReducers({
    app,
});

const persistConfig = {
    key: 'root',
    whitelist: ['app'],
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<ReturnType<typeof reducer>>(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch & ThunkDispatch<RootState, null, AnyAction>>();

export default store;
