import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import logger from 'redux-logger'
import UserSlice from "../Reducers/UserSlice";
import DashboardSlice from "../DashBoard/store/dashboardSlice";
import ManagerdSlice from "../Manager/store/managerSlice";

const reducers = combineReducers({
    UserSlice,
    DashboardSlice,
    ManagerdSlice
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['UserSlice'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (gDM) => gDM({ serializableCheck: false }).concat(logger),
    devTools: true,
});
export default store;
