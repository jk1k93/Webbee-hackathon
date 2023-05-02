import {Button, Switch} from '@rneui/base';
import React, {Fragment} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {Category, ItemValueType} from '../store/reducers/categories';
import InputBox from './Input';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

interface Props {
  category: Category;
  itemId: string;
  handleItemValueChange?: (
    fieldId: string,
    itemId: string,
    value: ItemValueType,
  ) => void;
  handleItemRemove?: (itemId: string) => void;
}

const CategoryItemForm = ({
  category,
  itemId,
  handleItemValueChange,
  handleItemRemove,
}: Props) => {
  const item = category.items[itemId];
  const fields = Object.values(category.fields);

  const handleChange = (fieldId: string, value: ItemValueType) => {
    handleItemValueChange?.(fieldId, item.id, value);
  };

  const showDatePicker = (fieldId: string) => {
    DateTimePickerAndroid.open({
      value: new Date(parseInt(item.values[fieldId] as string, 10)),
      onChange: (_, newDate?: Date) => {
        handleChange(
          fieldId,
          newDate?.getTime().toString() ?? new Date().getTime().toString(),
        );
      },
      mode: 'date',
      is24Hour: true,
    });
  };

  const onRemoveItem = () => {
    handleItemRemove?.(item.id);
  };

  return (
    <Fragment>
      {item.values[category.titleFieldId] && (
        <Text style={styles.title}>
          {item.values[category.titleFieldId].toString()}
        </Text>
      )}
      <View style={styles.formContainer}>
        {fields.map(field => {
          if (field.type === 'text' || field.type === 'number') {
            return (
              <InputBox
                key={field.id}
                placeholder={`Enter ${field.name}`}
                value={item.values[field.id] as string}
                keyboardType={
                  field.type === 'number' ? 'decimal-pad' : undefined
                }
                onChange={(val: string) => {
                  handleChange(field.id, val);
                }}
              />
            );
          }

          if (field.type === 'checkbox') {
            return (
              <View key={field.id} style={styles.checkboxContainer}>
                <Text>{field.name}</Text>
                <Switch
                  onValueChange={(val: boolean) => {
                    handleChange(field.id, val);
                  }}
                  value={item.values[field.id] as boolean}
                />
              </View>
            );
          }

          if (field.type === 'date') {
            return (
              <Button
                key={field.id}
                onPress={() => showDatePicker(field.id)}
                title={new Date(
                  parseInt(item.values[field.id] as string, 10),
                ).toDateString()}
              />
            );
          }
        })}
      </View>
      <View>
        <Button onPress={onRemoveItem}>Remove</Button>
      </View>
    </Fragment>
  );
};

export default CategoryItemForm;

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    columnGap: 12,
  },
  formContainer: {
    rowGap: 16,
  },
});
