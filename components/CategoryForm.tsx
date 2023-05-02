import {Button} from '@rneui/base';
import Input from './Input';
import React, {Fragment, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Category, FieldType, FIELD_TYPES} from '../store/reducers/categories';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

interface Props {
  category: Category;
  handleNameChange?: (id: string, val: string) => void;
  handleFieldNameChange?: (
    categoryId: string,
    fieldId: string,
    val: string,
  ) => void;
  handleAddNewField?: (categoryId: string, type: FieldType) => void;
  handleFieldTypeUpdate?: (
    categoryId: string,
    fieldId: string,
    type: FieldType,
  ) => void;
  handleTitleFieldUpdate?: (categoryId: string, fieldId: string) => void;
  handleCategoryDelete?: (categoryId: string) => void;
  handleFieldDelete?: (categoryId: string, fieldId: string) => void;
}

const CategoryForm = ({
  category,
  handleNameChange,
  handleFieldNameChange,
  handleAddNewField,
  handleFieldTypeUpdate,
  handleTitleFieldUpdate,
  handleCategoryDelete,
  handleFieldDelete,
}: Props) => {
  const onNameChange = useCallback(
    (val: string) => {
      handleNameChange?.(category.id, val);
    },
    [handleNameChange, category.id],
  );

  const onAddNewField = useCallback(
    (type: FieldType) => {
      handleAddNewField?.(category.id, type);
    },
    [handleAddNewField, category.id],
  );

  const onFieldNameChange = useCallback(
    (fieldId: string, val: string) => {
      handleFieldNameChange?.(category.id, fieldId, val);
    },
    [handleFieldNameChange, category.id],
  );

  const onFieldTypeChange = useCallback(
    (fieldId: string, type: FieldType) => {
      handleFieldTypeUpdate?.(category.id, fieldId, type);
    },
    [handleFieldTypeUpdate, category.id],
  );

  const onTitleFieldUpdate = useCallback(
    (fieldId: string) => {
      handleTitleFieldUpdate?.(category.id, fieldId);
    },
    [handleTitleFieldUpdate, category.id],
  );

  const getTitleFieldName = () => {
    const categoryFields = Object.values(category.fields);
    const titleFieldId = category.titleFieldId;
    if (categoryFields.length === 0) {
      return 'Unnamed Field';
    }
    return category.fields[titleFieldId].name.length > 0
      ? category.fields[titleFieldId].name
      : 'Unnamed Field';
  };

  const onRemoveCategory = () => {
    handleCategoryDelete?.(category.id);
  };
  const onRemoveField = (fieldId: string) => {
    handleFieldDelete?.(category.id, fieldId);
  };

  const titleFieldOptions = Object.values(category.fields).filter(
    field => field.name.length > 0,
  );

  return (
    <Fragment>
      {category.name && <Text style={styles.title}>{category.name}</Text>}
      <Input
        onChange={onNameChange}
        value={category.name}
        placeholder="Add Category Name"
      />
      {Object.values(category.fields).map(field => {
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Input
              placeholder="Field"
              containerStyle={styles.fieldInputContainer}
              value={field.name}
              onChange={(val: string) => onFieldNameChange(field.id, val)}
            />
            <Menu>
              <MenuTrigger>
                <Text style={styles.fieldTypeText}>{field.type}</Text>
              </MenuTrigger>
              <MenuOptions>
                {FIELD_TYPES.map(type => {
                  return (
                    <MenuOption
                      key={type}
                      onSelect={() => onFieldTypeChange(field.id, type)}>
                      <Text style={styles.fieldTypeOptionText}>{type}</Text>
                    </MenuOption>
                  );
                })}
              </MenuOptions>
            </Menu>
            <Button
              onPress={() => onRemoveField(field.id)}
              style={styles.fieldRemoveBtn}>
              Remove
            </Button>
          </View>
        );
      })}
      <Menu>
        <MenuTrigger>
          <View style={styles.titleFieldButton}>
            <Text style={styles.titleFieldButtonText}>
              TITLE FIELD: {getTitleFieldName()}
            </Text>
          </View>
        </MenuTrigger>
        <MenuOptions>
          {titleFieldOptions.map(field => {
            return (
              <MenuOption
                key={field.id}
                onSelect={() => onTitleFieldUpdate(field.id)}>
                <Text style={styles.fieldTypeOptionText}>{field.name}</Text>
              </MenuOption>
            );
          })}
        </MenuOptions>
      </Menu>
      <View style={styles.cardFooter}>
        <Menu>
          <MenuTrigger style={styles.menuTrigger} text="Add New Field" />
          <MenuOptions>
            {FIELD_TYPES.map(type => {
              return (
                <MenuOption key={type} onSelect={() => onAddNewField(type)}>
                  <Text style={styles.fieldTypeOptionText}>{type}</Text>
                </MenuOption>
              );
            })}
          </MenuOptions>
        </Menu>
        <Button
          onPress={onRemoveCategory}
          title={'Remove'}
          iconPosition="left"
        />
      </View>
    </Fragment>
  );
};

export default CategoryForm;

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontWeight: '600',
  },
  fieldContainer: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },
  fieldRemoveBtn: {
    flex: 1,
  },
  fieldInputContainer: {
    flex: 1,
  },
  fieldTypeText: {
    fontWeight: '600',
    textTransform: 'capitalize',
    color: 'blue',
  },
  fieldTypeOptionText: {
    textTransform: 'capitalize',
    fontSize: 16,
  },
  menuTrigger: {
    borderWidth: 1,
    padding: 4,
    textTransform: 'capitalize',
  },
  titleFieldButton: {
    backgroundColor: '#2089dc',
    padding: 8,
    borderRadius: 4,
    color: 'white',
  },
  titleFieldButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
