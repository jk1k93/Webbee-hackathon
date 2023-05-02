import {combineReducers, configureStore} from '@reduxjs/toolkit';
import categoriesReducer from './reducers/categories';

const rootReducer = combineReducers({
  categories: categoriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
