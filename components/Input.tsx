import React from 'react';
import {Input} from '@rneui/base';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {KeyboardTypeOptions} from 'react-native';

interface Props {
  value: string;
  placeholder: string;
  onChange?: (val: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardTypeOptions;
}

const InputBox = ({
  value,
  onChange,
  placeholder,
  containerStyle,
  keyboardType,
}: Props) => {
  return (
    <Input
      keyboardType={keyboardType}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      inputStyle={styles.inputStyle}
      inputContainerStyle={styles.inputContainerStyle}
      containerStyle={[styles.containerStyle, containerStyle]}
      renderErrorMessage={false}
    />
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputStyle: {
    paddingHorizontal: 12,
    backgroundColor: '#f3f3f3',
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
  },
  containerStyle: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 0,
  },
});
