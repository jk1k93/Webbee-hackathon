import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const FIELD_TYPES = ['text', 'date', 'checkbox', 'number'] as const;

export type FieldType = (typeof FIELD_TYPES)[number];

export interface Field {
  id: string;
  name: string;
  type: FieldType;
}

export type ItemValueType = string | boolean;

export interface Item {
  id: string;
  name: string;
  values: Record<string, ItemValueType>;
}

export interface Category {
  id: string;
  name: string;
  titleFieldId: string;
  fields: Record<string, Field>;
  items: Record<string, Item>;
}

const initialState: Record<string, Category> = {};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    initalizeCategories: (
      draft,
      action: PayloadAction<Record<string, Category>>,
    ) => {
      const categories = Object.values(action.payload);
      categories.forEach(cat => {
        draft[cat.id] = cat;
      });
    },
    addCategory: (draft, action: PayloadAction<Category>) => {
      draft[action.payload.id] = action.payload;
    },
    updateCategory: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        category: Partial<Category>;
      }>,
    ) => {
      draft[action.payload.categoryId] = {
        ...draft[action.payload.categoryId],
        ...action.payload.category,
      };
    },
    removeCategory: (
      draft,
      action: PayloadAction<{
        id: string;
      }>,
    ) => {
      delete draft[action.payload.id];
    },
    addFieldToCategory: (
      draft,
      action: PayloadAction<{
        id: string;
        field: Field;
      }>,
    ) => {
      const {id, field} = action.payload;
      const existingFields = Object.values(draft[id].fields);
      if (existingFields.length === 0) {
        draft[id].titleFieldId = field.id;
      }
      draft[id].fields[field.id] = field;
    },
    updateField: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        fieldId: string;
        field: Partial<Field>;
      }>,
    ) => {
      const {categoryId, fieldId} = action.payload;
      draft[categoryId].fields[fieldId] = {
        ...draft[categoryId].fields[fieldId],
        ...action.payload.field,
      };
    },
    removeFieldFromCategory: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        fieldId: string;
      }>,
    ) => {
      const {categoryId, fieldId} = action.payload;
      if (draft[categoryId].titleFieldId === fieldId) {
        if (Object.values(draft[categoryId].fields).length) {
          const remainingFields = Object.values(
            draft[categoryId].fields,
          ).filter(field => field.id !== fieldId);
          if (remainingFields.length > 0) {
            draft[categoryId].titleFieldId = remainingFields[0].id;
          }
        }
      }
      delete draft[categoryId].fields[fieldId];
    },
    addItemToCategory: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        item: Item;
      }>,
    ) => {
      const {categoryId, item} = action.payload;
      draft[categoryId].items[item.id] = item;
    },
    updateItemValue: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        itemId: string;
        fieldId: string;
        val: ItemValueType;
      }>,
    ) => {
      const {categoryId, itemId, fieldId, val} = action.payload;
      draft[categoryId].items[itemId].values[fieldId] = val;
    },
    removeItemFromCategory: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        itemId: string;
      }>,
    ) => {
      const {categoryId, itemId} = action.payload;
      delete draft[categoryId].items[itemId];
    },
  },
});

export const {
  initalizeCategories,
  addCategory,
  updateCategory,
  addFieldToCategory,
  updateField,
  removeCategory,
  removeFieldFromCategory,
  addItemToCategory,
  removeItemFromCategory,
  updateItemValue,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
