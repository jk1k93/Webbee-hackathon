import 'react-native-gesture-handler';
import React, {useCallback, useEffect} from 'react';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';

import {store} from './store/store';
import AppNavigation from './AppNavigation';
import {initalizeCategories} from './store/reducers/categories';
import {CATEGORIES_KEY, getData} from './helpers/asyncStorage.helpers';

function App(): JSX.Element {
  const initializeStore = useCallback(async () => {
    const data = await getData(CATEGORIES_KEY);
    store.dispatch(initalizeCategories(data));
  }, []);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <Provider store={store}>
      <MenuProvider>
        <AppNavigation />
      </MenuProvider>
    </Provider>
  );
}

export default App;
