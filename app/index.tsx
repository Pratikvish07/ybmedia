import { useEffect, useRef } from 'react';
import { Animated, ImageBackground, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { auth } from '../config/firebase';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (auth.currentUser) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/(auth)/login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, router, slideAnim]);

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
      }}
      className="flex-1 items-center justify-center bg-black">
      <View className="absolute inset-0 bg-black/70" />

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="items-center px-6">
        <Image
          source={{ uri: 'https://ybproductions.co.in/LogoYB.png' }}
          className="h-48 w-48"
          contentFit="contain"
        />
        <Text className="mt-4 text-center text-xs font-bold uppercase tracking-[6px] text-[#E5B842]">
          Yashvi Bagga Productions
        </Text>
        <Text className="mt-6 px-4 text-center text-sm italic text-gray-400">
          {'"Every dream begins with a vision."'}
        </Text>
      </Animated.View>
    </ImageBackground>
  );
}
