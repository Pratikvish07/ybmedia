import { ScrollView, Text, View } from 'react-native';
import { Image } from 'expo-image';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-zinc-950">
      <View className="relative h-[300px] w-full">
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
          }}
          className="h-full w-full"
          contentFit="cover"
        />
        <View className="absolute inset-0 bg-black/45" />
        <View className="absolute bottom-6 left-6 right-6">
          <Text className="text-xs font-bold uppercase tracking-widest text-[#E5B842]">
            FOUNDATION STATEMENT
          </Text>
          <Text className="mt-1 text-2xl font-black text-white">Yashvi Bagga Productions</Text>
        </View>
      </View>

      <View className="p-6">
        <Text className="mb-4 text-base font-semibold italic leading-relaxed text-[#E5B842]">
          {'"Every dream begins with a vision."'}
        </Text>
        <Text className="mb-4 text-justify text-sm leading-relaxed text-zinc-300">
          YASHVI BAGGA PRODUCTIONS was founded with the belief that creativity has the power to
          inspire, influence, and transform businesses, brands, and individuals...
        </Text>
        <Text className="mb-6 text-justify text-sm leading-relaxed text-zinc-300">
          At YASHVI BAGGA PRODUCTIONS, we specialize in Social Media Management, Talent Sourcing,
          Brand Marketing, Influencer Collaborations, Creative Content Development, and End-to-End
          Production Services...
        </Text>

        <View className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 pt-4">
          <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-white">
            Dedication Manifesto
          </Text>
          <Text className="text-xs italic leading-relaxed text-zinc-400">
            {
              '"I dedicate this venture to every dreamer who believes that creativity can create opportunities and transform lives."'
            }
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
