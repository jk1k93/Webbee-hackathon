import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

const PageLayout = (props: any) => {
  return (
    <SafeAreaView>
      <View style={styles.pageContainer}>{props.children}</View>
    </SafeAreaView>
  );
};

export default PageLayout;

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    display: 'flex',
    backgroundColor: '#d3d3d3',
  },
});
