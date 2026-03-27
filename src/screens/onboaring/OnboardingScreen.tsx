import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { setOnboardingSeen } from '../../storage/onboarding';
import { COLORS } from '../../utils/colors';
import { SPACING } from '../../utils/spacing';
import { STYLE } from '../../utils/style';
import { TYPOGRAPHY } from '../../utils/typography';

const { width, height } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: '1',
    title: 'Welcome to SmartDaily',
    subtitle:
      'Your ultimate companion for daily organization and productivity.',
    image: require('../../assets/onboarding/welcome_to_smartdaily.png'),
  },
  {
    id: '2',
    title: 'Plan Your Day',
    subtitle: 'Easily manage tasks and schedules with our intuitive interface.',
    image: require('../../assets/onboarding/plan_your_day.png'),
  },
  {
    id: '3',
    title: 'Stay Notified',
    subtitle: 'Never miss an important event with smart reminders.',
    image: require('../../assets/onboarding/onboarding1.png'),
  },
  {
    id: '4',
    title: 'Get Started Now',
    subtitle: 'Join thousands of users and start your journey today.',
    image: require('../../assets/onboarding/onboarding1.png'),
  },
];

const OnboardingScreen = ({ navigation }: { navigation: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const finishOnboarding = async () => {
    await setOnboardingSeen();
    navigation.getParent()?.replace('Auth');
  };

  const scrollToNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      finishOnboarding();
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }: { item: (typeof ONBOARDING_DATA)[0] }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={{ height: '70%', width: '100%' }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={finishOnboarding} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        keyExtractor={item => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {ONBOARDING_DATA.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={scrollToNext} style={styles.nextButton}>
          <Text style={styles.nextText}>
            {currentIndex === ONBOARDING_DATA.length - 1 ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.xl,
    alignItems: 'flex-end',
  },
  skipButton: {
    padding: SPACING.md,
  },
  skipText: {
    ...TYPOGRAPHY.subtitle,
  },
  slide: {
    width,
  },
  textContainer: {
    paddingHorizontal: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.displayLarge,
    paddingBottom: SPACING.md,
    paddingTop: SPACING.xxxxxxl,
  },
  subtitle: {
    ...TYPOGRAPHY.title,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    ...STYLE.rowSpaceBetween,
  },
  pagination: {
    flexDirection: 'row',
  },
  dot: {
    width: SPACING.sm,
    height: SPACING.sm,
    borderRadius: SPACING.sm,
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.xs,
  },
  activeDot: {
    backgroundColor: COLORS.darkPrimary,
    width: SPACING.xl,
  },
  nextButton: {
    backgroundColor: COLORS.darkPrimary,
    paddingHorizontal: SPACING.xxxl,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.xxl,
  },
  nextText: {
    ...TYPOGRAPHY.subtitle,
  },
});
