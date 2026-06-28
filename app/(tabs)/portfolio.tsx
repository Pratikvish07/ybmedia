import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Camera, ExternalLink, Play, } from 'lucide-react-native';

// Instagram reel links — replace with actual reel URLs from yashvibagga account
const reels = [
  {
    id: '1',
    title: 'Brand Campaign Reel',
    platform: 'Instagram',
    type: 'Reel',
    url: 'https://www.instagram.com/yashvayayay',
    thumbnail: '🎬',
    duration: 'Reel',
  },
  {
    id: '2',
    title: 'Production Showreel',
    platform: 'YouTube',
    type: 'Video',
    url: 'https://youtube.com/@yashvibagga',
    thumbnail: '🎥',
    duration: 'Showreel',
  },
  {
    id: '3',
    title: 'Behind The Scenes',
    platform: 'Instagram',
    type: 'Reel',
    url: 'https://www.instagram.com/yashvayayay',
    thumbnail: '🎞️',
    duration: 'BTS',
  },
  {
    id: '4',
    title: 'Talent Showcase',
    platform: 'YouTube',
    type: 'Video',
    url: 'https://youtube.com/@yashvibagga',
    thumbnail: '⭐',
    duration: 'Showcase',
  },
];

const socialLinks = [
  {
    label: 'YouTube Channel',
    icon: 'youtube',
    url: 'https://youtube.com/@yashvibagga',
    desc: 'Watch our full productions, showreels & campaigns',
    color: '#FF0000',
  },
  {
    label: 'Instagram Profile',
    icon: 'instagram',
    url: 'https://www.instagram.com/yashvayayay',
    desc: 'Reels, stories & behind the scenes content',
    color: '#E1306C',
  },
  {
    label: 'Official Website',
    icon: 'web',
    url: 'https://ybproductions.co.in',
    desc: 'Full portfolio, services & contact info',
    color: '#E5B842',
  },
];

export default function PortfolioScreen() {
  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', `Cannot open: ${url}`);
    }
  };

  return (
    <ScrollView className="flex-1 bg-zinc-950" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="bg-zinc-900 px-6 pb-6 pt-6">
        <Text className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#E5B842]">
          Our Work
        </Text>
        <Text className="text-2xl font-black text-white">Portfolio</Text>
        <Text className="mt-2 text-xs leading-relaxed text-zinc-400">
          A glimpse of our productions, campaigns, and creative work. Tap to view on YouTube or Instagram.
        </Text>
      </View>

      <View className="p-4">
        {/* Reel / Video Cards */}
        <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
          Featured Work
        </Text>

        <View className="mb-6 flex-row flex-wrap gap-3">
          {reels.map((reel) => (
            <TouchableOpacity
              key={reel.id}
              style={{ width: '47%' }}
              className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
              onPress={() => openLink(reel.url)}>
              {/* Thumbnail placeholder */}
              <View className="h-32 items-center justify-center bg-zinc-800">
                <Text className="text-4xl">{reel.thumbnail}</Text>
                <View className="absolute inset-0 items-center justify-center">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-[#E5B842]/90">
                    <Play color="#000" size={16} fill="#000" />
                  </View>
                </View>
                <View className="absolute right-2 top-2 rounded bg-black/80 px-1.5 py-0.5">
                  <Text className="text-[9px] font-bold text-zinc-400">{reel.duration}</Text>
                </View>
              </View>
              <View className="p-3">
                <Text className="text-xs font-bold text-white" numberOfLines={1}>
                  {reel.title}
                </Text>
                <Text className="mt-0.5 text-[9px] uppercase tracking-wider text-[#E5B842]">
                  {reel.platform} · {reel.type}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Note about live content */}
        <View className="mb-6 rounded-xl border border-zinc-700 bg-zinc-900/60 p-4">
          <Text className="text-[10px] leading-relaxed text-zinc-500">
            📌 Our full portfolio of reels, campaigns, and productions is available on our social channels. Tap the links below to explore our live content.
          </Text>
        </View>

        {/* Social / Channel Links */}
        <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
          Visit Our Channels
        </Text>

        {socialLinks.map((link, i) => (
          <TouchableOpacity
            key={i}
            className="mb-3 flex-row items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            onPress={() => openLink(link.url)}>
            <View
              className="h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: link.color + '20' }}>
              {link.icon === 'youtube' && <Text style={{ color: link.color }} className="text-[10px] font-black">YT</Text>}
              {link.icon === 'instagram' && <Camera color={link.color} size={20} />}
              {link.icon === 'web' && <ExternalLink color={link.color} size={20} />}
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-white">{link.label}</Text>
              <Text className="text-[10px] text-zinc-400">{link.desc}</Text>
            </View>
            <ExternalLink color="#71717a" size={14} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}