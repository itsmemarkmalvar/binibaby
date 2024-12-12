import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forgot Password Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    color: '#FF69B4',
  },
});

export default ForgotPassword; 