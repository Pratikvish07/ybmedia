import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const pillars = [
  {
    title: 'Innovation with Purpose',
    desc: 'Continually exploring new ideas and contemporary digital technologies to deliver modern, impactful solutions.',
    icon: '💡',
  },
  {
    title: 'Excellence in Execution',
    desc: 'Quality, professionalism, and attention to detail form the cornerstone of every project we undertake.',
    icon: '🏆',
  },
  {
    title: 'People-Centric Approach',
    desc: 'Training, communication, and creative solutions designed to inspire growth, confidence, and transformation.',
    icon: '🤝',
  },
  {
    title: 'Integrity & Trust',
    desc: 'Long-term relationships built on transparency, commitment, and ethical business practices.',
    icon: '🛡️',
  },
  {
    title: 'Creativity Beyond Boundaries',
    desc: 'Combining raw imagination with strategic execution to produce work that is distinctive and memorable.',
    icon: '✨',
  },
];

const taglines = [
  'Where Creativity Meets Purpose.',
  'Transforming Ideas into Experiences.',
  'Beyond Production. Beyond Expectations.',
  'Building Brands. Developing People. Creating Stories.',
];

const trustedBy = [
  'Government Organizations',
  'Public Sector Enterprises (PSUs)',
  'Corporate Houses',
  'Educational Institutions',
  'Development Agencies',
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-zinc-950" showsVerticalScrollIndicator={false}>
      {/* Hero Banner */}
      <View className="relative h-[280px] w-full">
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
          }}
          className="h-full w-full"
          contentFit="cover"
        />
        <View className="absolute inset-0 bg-black/60" />
        <View className="absolute inset-0 items-center justify-center px-6">
          <Image
            source={{ uri: 'https://ybproductions.co.in/LogoYB.png' }}
            style={{ width: 80, height: 80 }}
            contentFit="contain"
          />
          <Text className="mt-3 text-center text-xs font-bold uppercase tracking-[4px] text-[#E5B842]">
            Yashvi Bagga Productions
          </Text>
          <Text className="mt-2 text-center text-sm italic text-zinc-300">
            "Every dream begins with a vision."
          </Text>
        </View>
      </View>

      {/* Brand Essence Banner */}
      <View className="bg-[#E5B842] px-6 py-3">
        <Text className="text-center text-[10px] font-black uppercase tracking-[3px] text-black">
          Creating Experiences · Inspiring Excellence · Building Impact
        </Text>
      </View>

      <View className="p-6">
        {/* The Founder & Vision */}
        <View className="mb-8">
          <Text className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#E5B842]">
            The Founder & Vision
          </Text>
          <Text className="mb-4 text-xl font-black text-white">Our Core Belief</Text>

          <Text className="mb-3 text-justify text-xs leading-relaxed text-zinc-300">
            YASHVI BAGGA PRODUCTIONS was founded with the belief that creativity has the power to
            inspire, influence, and transform businesses, brands, and individuals.
          </Text>
          <Text className="mb-3 text-justify text-xs leading-relaxed text-zinc-300">
            What started as a passion for creating meaningful content has evolved into a
            multidisciplinary venture focused on helping brands build authentic connections with
            their audiences. We believe that every brand has a story worth telling, every creator
            deserves an opportunity to shine, and every campaign should leave a lasting impact.
          </Text>

          {/* Dedication card */}
          <View className="mt-3 rounded-xl border border-[#E5B842]/30 bg-zinc-900 p-4">
            <Text className="mb-1 text-[10px] uppercase tracking-widest text-[#E5B842]">
              Founder's Dedication
            </Text>
            <Text className="text-xs italic leading-relaxed text-zinc-300">
              "I dedicate this venture to every dreamer who believes that creativity can create
              opportunities and transform lives."
            </Text>
            <Text className="mt-3 text-xs font-semibold text-zinc-400">— Yashvi, Founder</Text>
          </View>
        </View>

        {/* The Brand */}
        <View className="mb-8">
          <Text className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#E5B842]">
            The Brand & Values
          </Text>
          <Text className="mb-4 text-xl font-black text-white">Who We Are</Text>

          <Text className="mb-4 text-justify text-xs leading-relaxed text-zinc-300">
            We are a dynamic, multidisciplinary organization that seamlessly blends media,
            communication, learning, branding, and creative production to deliver meaningful
            experiences and measurable impact.
          </Text>

          {/* Trusted By */}
          <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            Trusted Partner For
          </Text>
          <View className="mb-5 flex-row flex-wrap gap-2">
            {trustedBy.map((item, i) => (
              <View key={i} className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1">
                <Text className="text-[10px] font-semibold text-zinc-300">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Core Pillars */}
        <View className="mb-8">
          <Text className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#E5B842]">
            Core Pillars
          </Text>
          <Text className="mb-4 text-xl font-black text-white">What Defines Us</Text>

          {pillars.map((p, i) => (
            <View
              key={i}
              className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
              <View className="flex-row items-center gap-3">
                <Text className="text-2xl">{p.icon}</Text>
                <Text className="flex-1 text-sm font-bold text-[#E5B842]">{p.title}</Text>
              </View>
              <Text className="mt-2 text-xs leading-relaxed text-zinc-400">{p.desc}</Text>
            </View>
          ))}
        </View>

        {/* Taglines */}
        <View className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <Text className="mb-3 text-[10px] font-black uppercase tracking-widest text-[#E5B842]">
            Brand Taglines
          </Text>
          {taglines.map((t, i) => (
            <View key={i} className="mb-2 flex-row items-start gap-2">
              <Text className="text-[#E5B842]">›</Text>
              <Text className="flex-1 text-xs italic text-zinc-300">{t}</Text>
            </View>
          ))}
        </View>

        {/* CTA to Services */}
        <TouchableOpacity
          className="mb-4 rounded-xl bg-[#E5B842] p-4"
          onPress={() => router.push('/(tabs)/services')}>
          <Text className="text-center text-sm font-extrabold uppercase tracking-wider text-black">
            Explore Our Services →
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}