import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'meetappRocketseat',
      storage,
      // reducers a serem persistidos
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
