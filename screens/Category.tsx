import {useRoute} from '@react-navigation/native';
import {Button} from '@rneui/base';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Dimensions, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/Card';
import CategoryItemForm from '../components/CategoryItemForm';
import PageLayout from '../components/PageLayout';
import Separator from '../components/Separator';
import {getNewItemInitialData} from '../helpers/categoryItems.helpers';
import {
  addItemToCategory,
  ItemValueType,
  removeItemFromCategory,
  updateItemValue,
} from '../store/reducers/categories';
import {RootState} from '../store/store';

const Category = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories);
  const dimensions = Dimensions.get('window');
  const screenHeight = dimensions.height;
  const screenWidth = dimensions.width;
  const activeCategory = useMemo(() => {
    return Object.values(categories).find(cat => cat.name === route.name);
  }, [categories, route.name]);
  const items = activeCategory?.items ?? {};
  const itemsData = Object.values(items);

  const handleNewItemAddition = useCallback(() => {
    dispatch(
      addItemToCategory({
        categoryId: activeCategory?.id ?? '',
        item: getNewItemInitialData(
          Object.values(activeCategory?.fields ?? {}),
        ),
      }),
    );
  }, [activeCategory, dispatch]);

  const handleItemValueChange = useCallback(
    (fieldId: string, itemId: string, val: ItemValueType) => {
      if (activeCategory?.id != null) {
        dispatch(
          updateItemValue({
            categoryId: activeCategory.id,
            fieldId,
            itemId,
            val,
          }),
        );
      }
    },
    [activeCategory?.id, dispatch],
  );

  const handleItemRemove = useCallback(
    (itemId: string) => {
      if (activeCategory?.id != null) {
        dispatch(
          removeItemFromCategory({categoryId: activeCategory.id, itemId}),
        );
      }
    },
    [activeCategory?.id, dispatch],
  );

  if (activeCategory != null) {
    return (
      <PageLayout>
        <View style={[{height: screenHeight}, styles.pageContainer]}>
          <View style={styles.pageHeader}>
            {itemsData.length === 0 && <Text>No Items Found</Text>}
            <Button
              style={styles.addNewBtn}
              onPress={handleNewItemAddition}
              title={'Add New Item'}
            />
          </View>
          <View style={styles.listContainer}>
            {itemsData.length > 0 && (
              <FlatList
                numColumns={Math.floor(screenWidth / 350)}
                data={itemsData}
                ItemSeparatorComponent={Separator}
                renderItem={({item}) => {
                  return (
                    <View style={styles.cardContainer}>
                      <Card>
                        <CategoryItemForm
                          category={activeCategory}
                          itemId={item.id}
                          handleItemValueChange={handleItemValueChange}
                          handleItemRemove={handleItemRemove}
                        />
                      </Card>
                    </View>
                  );
                }}
                keyExtractor={item => item.id}
              />
            )}
          </View>
        </View>
      </PageLayout>
    );
  }

  return null;
};

export default Category;

const styles = StyleSheet.create({
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageContainer: {
    rowGap: 12,
  },
  itemsList: {
    marginBottom: 100,
    flex: 1,
  },
  addNewBtn: {
    alignSelf: 'flex-end',
  },
  cardContainer: {
    paddingHorizontal: 8,
  },
  listContainer: {
    alignItems: 'center',
  },
});
