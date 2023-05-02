/* eslint-disable react-native/no-inline-styles */
import {Button} from '@rneui/base';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {View, FlatList, Dimensions, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/Card';
import CategoryForm from '../components/CategoryForm';
import PageLayout from '../components/PageLayout';
import Separator from '../components/Separator';
import {
  addCategory,
  addFieldToCategory,
  FieldType,
  removeCategory,
  removeFieldFromCategory,
  updateCategory,
  updateField,
} from '../store/reducers/categories';
import {RootState} from '../store/store';

const ManageCategories = () => {
  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  const categoriesData = useMemo(() => {
    return Object.values(categories);
  }, [categories]);

  const dimensions = Dimensions.get('window');
  const screenHeight = dimensions.height;
  const screenWidth = dimensions.width;

  const addNewCategory = () => {
    const uniqueKey = new Date().getTime().toString();
    dispatch(
      addCategory({
        id: new Date().getTime().toString(),
        name: 'New Category',
        titleFieldId: uniqueKey,
        fields: {
          [uniqueKey]: {
            id: uniqueKey,
            name: '',
            type: 'text',
          },
        },
        items: {},
      }),
    );
  };

  const handleCategoryNameChange = useCallback(
    (id: string, val: string) => {
      dispatch(
        updateCategory({
          categoryId: id,
          category: {
            name: val,
          },
        }),
      );
    },
    [dispatch],
  );

  const handleFieldNameChange = useCallback(
    (categoryId: string, fieldId: string, val: string) => {
      dispatch(updateField({categoryId, fieldId, field: {name: val}}));
    },
    [dispatch],
  );

  const handleAddNewField = useCallback(
    (categoryId: string, fieldType: FieldType) => {
      dispatch(
        addFieldToCategory({
          id: categoryId,
          field: {
            id: `${new Date().getTime()}`,
            name: '',
            type: fieldType,
          },
        }),
      );
    },
    [dispatch],
  );

  const handleFieldTypeUpdate = useCallback(
    (categoryId: string, fieldId: string, type: FieldType) => {
      dispatch(updateField({categoryId, fieldId, field: {type}}));
    },
    [dispatch],
  );

  const handleTitleFieldUpdate = useCallback(
    (id: string, val: string) => {
      dispatch(
        updateCategory({
          categoryId: id,
          category: {
            titleFieldId: val,
          },
        }),
      );
    },
    [dispatch],
  );

  const handleCategoryDelete = useCallback(
    (categoryId: string) => {
      dispatch(removeCategory({id: categoryId}));
    },
    [dispatch],
  );

  const handleFieldDelete = useCallback(
    (categoryId: string, fieldId: string) => {
      dispatch(removeFieldFromCategory({categoryId, fieldId}));
    },
    [dispatch],
  );

  return (
    <PageLayout>
      <View style={{height: screenHeight}}>
        <View style={{flex: screenHeight > 900 ? 5 : 4, alignItems: 'center'}}>
          {categoriesData.length === 0 && <Text>No Categories Found</Text>}
          {categoriesData.length > 0 && (
            <FlatList
              numColumns={Math.floor(screenWidth / 350)}
              data={categoriesData}
              renderItem={({item}) => {
                return (
                  <View style={styles.cardContainer}>
                    <Card>
                      <CategoryForm
                        category={item}
                        handleNameChange={handleCategoryNameChange}
                        handleFieldNameChange={handleFieldNameChange}
                        handleAddNewField={handleAddNewField}
                        handleFieldTypeUpdate={handleFieldTypeUpdate}
                        handleTitleFieldUpdate={handleTitleFieldUpdate}
                        handleCategoryDelete={handleCategoryDelete}
                        handleFieldDelete={handleFieldDelete}
                      />
                    </Card>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Separator}
            />
          )}
        </View>
        <View style={{flex: 1}}>
          <Button onPress={addNewCategory} title="Add New Category" />
        </View>
      </View>
    </PageLayout>
  );
};

export default ManageCategories;

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 8,
  },
});
