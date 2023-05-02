import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/base';
import React, {useCallback, useMemo} from 'react';
import {Dimensions} from 'react-native';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/Card';
import CategoryItemForm from '../components/CategoryItemForm';
import PageLayout from '../components/PageLayout';
import {getNewItemInitialData} from '../helpers/categoryItems.helpers';
import {
  addItemToCategory,
  Category,
  ItemValueType,
  removeItemFromCategory,
  updateItemValue,
} from '../store/reducers/categories';
import {RootState} from '../store/store';

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dimensions = Dimensions.get('window');
  const screenHeight = dimensions.height;

  const categories = useSelector((state: RootState) => state.categories);

  const categoriesData = useMemo(() => {
    return Object.values(categories);
  }, [categories]);

  const handleNewItemAddition = useCallback(
    (category: Category) => {
      dispatch(
        addItemToCategory({
          categoryId: category?.id ?? '',
          item: getNewItemInitialData(Object.values(category.fields)),
        }),
      );
    },
    [dispatch],
  );

  const onItemValueChange = useCallback(
    (
      fieldId: string,
      itemId: string,
      val: ItemValueType,
      category: Category,
    ) => {
      dispatch(
        updateItemValue({
          categoryId: category.id,
          fieldId,
          itemId,
          val,
        }),
      );
    },
    [dispatch],
  );

  const onItemRemove = useCallback(
    (itemId: string, category: Category) => {
      dispatch(removeItemFromCategory({categoryId: category.id, itemId}));
    },
    [dispatch],
  );

  if (categoriesData.length === 0) {
    return (
      <PageLayout>
        <View
          style={[
            {
              height: screenHeight,
            },
            styles.addCategoryContainer,
          ]}>
          <Text>No categories found</Text>
          <Button
            onPress={() => {
              navigation.navigate('Manage Categories' as never);
            }}>
            Add new category
          </Button>
        </View>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.listContainer, {height: screenHeight}]}>
          {categoriesData.map(category => {
            return (
              <View style={styles.categoryContainer} key={category.id}>
                <View style={styles.categoryHeadingContainer}>
                  <Text style={styles.categoryHeading}>{category.name}</Text>
                  <Button
                    onPress={() => handleNewItemAddition(category)}
                    title="Add Item"
                  />
                </View>
                {Object.values(category.items).length === 0 && (
                  <View>
                    <Text>No Items found</Text>
                  </View>
                )}
                <View style={styles.cardListContainer}>
                  {Object.values(category.items).map(item => {
                    return (
                      <Card key={item.id}>
                        <CategoryItemForm
                          category={category}
                          itemId={item.id}
                          handleItemValueChange={(
                            fieldId: string,
                            itemId: string,
                            value: ItemValueType,
                          ) => {
                            onItemValueChange(fieldId, itemId, value, category);
                          }}
                          handleItemRemove={(itemId: string) => {
                            onItemRemove(itemId, category);
                          }}
                        />
                      </Card>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </PageLayout>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  addCategoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 12,
  },
  categoryHeading: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'left',
  },
  categoryContainer: {
    rowGap: 12,
  },
  listContainer: {
    rowGap: 20,
  },
  cardListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
    columnGap: 12,
  },
  categoryHeadingContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
