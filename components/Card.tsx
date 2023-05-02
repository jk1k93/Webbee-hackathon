import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = (props: any) => {
  return <View style={styles.card}>{props.children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    padding: 16,
    rowGap: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: 'white',
    width: 350,
  },
});
