import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { auth } from '../config/firebase';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    type: 'logo',
  },
  {
    id: '2',
    type: 'about',
    quote: 'Every dream begins with a vision.',
    paragraphs: [
      'YASHVI BAGGA PRODUCTIONS was founded with the belief that creativity has the power to inspire, influence, and transform businesses, brands, and individuals. In an era where digital presence defines success, we envisioned a platform that brings together talent, innovation, storytelling, and strategic marketing under one roof.',
      'What started as a passion for creating meaningful content has evolved into a dedicated venture focused on helping brands build authentic connections with their audiences. We believe that every brand has a story worth telling, every creator deserves an opportunity to shine, and every campaign should leave a lasting impact.',
    ],
    showSignature: true,
  },
  {
    id: '3',
    type: 'mission',
    paragraphs: [
      'At YASHVI BAGGA PRODUCTIONS, we specialize in Social Media Management, Talent Sourcing, Brand Marketing, Influencer Collaborations, Creative Content Development, and End-to-End Production Services. Our mission is to bridge the gap between brands and audiences through innovative ideas, compelling narratives, and result-oriented strategies.',
      'As an emerging production company, we are committed to professionalism, creativity, integrity, and excellence in every project we undertake. We aspire to create a vibrant ecosystem where businesses grow, talents flourish, and creative visions come to life.',
    ],
  },
  {
    id: '4',
    type: 'dedication',
    paragraphs: [
      'This foundation is not merely the beginning of a company; it is the beginning of a journey driven by passion, perseverance, and purpose. We look forward to building meaningful partnerships, nurturing creative talent, and contributing to the ever-evolving world of digital media and brand communication.',
      'With gratitude and determination, we embark on this exciting journey, believing that the best stories are yet to be told.',
    ],
    dedication:
      '"I dedicate this venture to every dreamer who believes that creativity can create opportunities and transform lives."',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const goToApp = () => {
    if (auth.currentUser) {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/(auth)/login');
    }
  };

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      goToApp();
    }
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const renderSlide = ({ item }: { item: (typeof slides)[0] }) => {
    if (item.type === 'logo') {
      return (
        <View style={{ width }} className="flex-1 items-center justify-center bg-zinc-950 px-8">
          <Image
            source={{ uri: 'https://ybproductions.co.in/LogoYB.png' }}
            style={{ width: 200, height: 200 }}
            contentFit="contain"
          />
          <Text className="mt-6 text-center text-xs font-bold uppercase tracking-[6px] text-[#E5B842]">
            Yashvi Bagga Productions
          </Text>
          <Text className="mt-4 text-center text-sm italic text-zinc-400">
            "Every dream begins with a vision."
          </Text>
        </View>
      );
    }

    if (item.type === 'about') {
      return (
        <View style={{ width }} className="flex-1 bg-zinc-950 px-7 pt-14">
          <Text className="mb-5 text-center text-sm italic text-[#E5B842]">
            {item.quote}
          </Text>
          {item.paragraphs?.map((p, i) => (
            <Text key={i} className="mb-4 text-justify text-xs leading-relaxed text-zinc-300">
              {p}
            </Text>
          ))}
          {item.showSignature && (
            <View className="mt-4">
              <Image
                source={{ uri: 'https://ybproductions.co.in/LogoYB.png' }}
                style={{ width: 90, height: 45, opacity: 0.7 }}
                contentFit="contain"
                tintColor="#E5B842"
              />
              <Text className="mt-1 text-xs font-semibold text-zinc-400">Yashvi</Text>
              <Text className="text-[10px] uppercase tracking-widest text-zinc-600">Founder</Text>
            </View>
          )}
        </View>
      );
    }

    if (item.type === 'mission') {
      return (
        <View style={{ width }} className="flex-1 bg-zinc-950 px-7 pt-14">
          <Text className="mb-5 text-xs font-black uppercase tracking-widest text-[#E5B842]">
            Our Mission
          </Text>
          {item.paragraphs?.map((p, i) => (
            <Text key={i} className="mb-4 text-justify text-xs leading-relaxed text-zinc-300">
              {p}
            </Text>
          ))}
        </View>
      );
    }

    if (item.type === 'dedication') {
      return (
        <View style={{ width }} className="flex-1 bg-zinc-950 px-7 pt-14">
          <Text className="mb-5 text-xs font-black uppercase tracking-widest text-[#E5B842]">
            Our Foundation
          </Text>
          {item.paragraphs?.map((p, i) => (
            <Text key={i} className="mb-4 text-justify text-xs leading-relaxed text-zinc-300">
              {p}
            </Text>
          ))}
          <View className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <Text className="text-xs italic leading-relaxed text-zinc-400">
              {item.dedication}
            </Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Skip button */}
      <TouchableOpacity
        className="absolute right-5 top-12 z-10 rounded-full bg-zinc-800/80 px-4 py-2"
        onPress={goToApp}>
        <Text className="text-xs font-bold uppercase tracking-wider text-zinc-300">Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        className="flex-1"
      />

      {/* Bottom controls */}
      <View className="flex-row items-center justify-between px-6 pb-12 pt-4">
        {/* Dots */}
        <View className="flex-row gap-2">
          {slides.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 22, 8],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={{ width: dotWidth, opacity }}
                className="h-2 rounded-full bg-[#E5B842]"
              />
            );
          })}
        </View>

        {/* Next / Get Started button */}
        <TouchableOpacity
          className="rounded-xl bg-[#E5B842] px-6 py-3"
          onPress={goNext}>
          <Text className="text-xs font-extrabold uppercase tracking-wider text-black">
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}