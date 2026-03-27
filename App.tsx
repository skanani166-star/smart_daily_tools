import { StyleSheet } from 'react-native';
import React from 'react';
import { AuthProvider } from './src/providers/AuthProvider';
import RootNavigator from './src/navigation/RootNavigator';

import ScreenProvider from './src/providers/ScreenProvider';

const App = () => {
  return (
    <ScreenProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ScreenProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
