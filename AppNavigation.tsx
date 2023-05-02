import React, {Fragment, useEffect, useMemo, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from './screens/Dashboard';
import ManageCategories from './screens/ManageCategories';
import {useSelector} from 'react-redux';
import {RootState} from './store/store';
import CategoryScreen from './screens/Category';
import {Category} from './store/reducers/categories';
import {CATEGORIES_KEY, storeData} from './helpers/asyncStorage.helpers';

const getValidCategories = (categories: Category[]) => {
  const validCategories: string[] = [];
  categories.forEach(cat => {
    if (validCategories.indexOf(cat.name) === -1 && cat.name.length > 0) {
      validCategories.push(cat.name);
    }
  });
  return validCategories;
};

const AppNavigation = () => {
  const Drawer = createDrawerNavigator();
  const categories = useSelector((state: RootState) => state.categories);
  const timerRef = useRef<number>();

  const validCategories: string[] = useMemo(() => {
    return getValidCategories(Object.values(categories));
  }, [categories]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      storeData(CATEGORIES_KEY, categories);
    }, 1000);
    return () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [categories]);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Manage Categories">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Fragment>
          {validCategories.map(category => {
            return (
              <Drawer.Screen
                key={category}
                name={category}
                component={CategoryScreen}
              />
            );
          })}
        </Fragment>
        <Drawer.Screen name="Manage Categories" component={ManageCategories} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
