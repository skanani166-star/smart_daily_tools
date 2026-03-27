import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getOnboardingSeen } from '../storage/onboarding';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const isLoggedIn = false;

  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await getOnboardingSeen();
      setHasSeenOnboarding(seen);
      setIsLoading(false);
    };
    checkOnboarding();
  }, []);

  if (isLoading) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={
          !hasSeenOnboarding
            ? 'OnboardingNavigator'
            : isLoggedIn
            ? 'AppNavigator'
            : 'AuthNavigator'
        }
      >
        <Stack.Screen
          name="OnboardingNavigator"
          component={OnboardingNavigator}
        />
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        <Stack.Screen name="AppNavigator" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
