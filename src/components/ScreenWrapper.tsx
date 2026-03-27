import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { STYLE } from '../utils/style';
import { COLORS } from '../utils/colors';

type Props = {
  children: React.ReactNode;
};

const ScreenWrapper = ({ children }: Props) => {
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  gradient: {
    ...STYLE.container,
  },
});
