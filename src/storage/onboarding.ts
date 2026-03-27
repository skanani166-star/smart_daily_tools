import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'HAS_SEEN_ONBOARDING';

export const setOnboardingSeen = async () => {
  await AsyncStorage.setItem(KEY, 'true');
};

export const getOnboardingSeen = async () => {
  const value = await AsyncStorage.getItem(KEY);
  return value === 'true';
};