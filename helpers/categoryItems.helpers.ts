import {Field, FieldType, Item} from '../store/reducers/categories';

const getValueByType = (type: FieldType) => {
  if (type === 'text' || type === 'number') {
    return '';
  }
  if (type === 'checkbox') {
    return true;
  }
  if (type === 'date') {
    return new Date().getTime().toString();
  }
};

const getInitialValues = (fields: Field[]) => {
  const values = fields.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.id]: getValueByType(curr.type),
    };
  }, {});
  return values;
};

export const getNewItemInitialData = (fields: Field[]): Item => {
  return {
    id: new Date().getTime().toString(),
    name: '',
    values: getInitialValues(fields),
  };
};
