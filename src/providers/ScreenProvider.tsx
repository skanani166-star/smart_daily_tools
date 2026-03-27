import { StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { STYLE } from '../utils/style';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../utils/colors';

const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={STYLE.container}
        >
          {children}
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ScreenProvider;

const styles = StyleSheet.create({
  container: {
    ...STYLE.container,
  },
});
