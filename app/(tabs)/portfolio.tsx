import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Camera, ExternalLink, Play } from 'lucide-react-native';

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
        {/* Reel / Video Cards — 2x2 grid */}
        <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
          Featured Work
        </Text>

        <View className="mb-6 flex-row flex-wrap justify-between">
          {reels.map((reel, idx) => (
            <TouchableOpacity
              key={reel.id}
              activeOpacity={0.85}
              style={{ width: '48%', marginBottom: 14 }}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/40"
              onPress={() => openLink(reel.url)}>
              {/* Thumbnail */}
              <View className="relative h-36 items-center justify-center bg-zinc-800">
                <Text className="text-5xl opacity-90">{reel.thumbnail}</Text>

                {/* Bottom gradient-style scrim for legibility */}
                <View className="absolute inset-x-0 bottom-0 h-12 bg-black/30" />

                {/* Play button */}
                <View className="absolute inset-0 items-center justify-center">
                  <View className="h-11 w-11 items-center justify-center rounded-full border border-[#E5B842]/40 bg-[#E5B842] shadow-md shadow-black/50">
                    <Play color="#000" size={18} fill="#000" />
                  </View>
                </View>

                {/* Duration / tag badge */}
                <View className="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-0.5">
                  <Text className="text-[9px] font-bold uppercase tracking-wide text-[#E5B842]">
                    {reel.duration}
                  </Text>
                </View>

                {/* Index badge */}
                <View className="absolute left-2 top-2 h-5 w-5 items-center justify-center rounded-full bg-black/70">
                  <Text className="text-[9px] font-bold text-zinc-300">
                    {String(idx + 1).padStart(2, '0')}
                  </Text>
                </View>
              </View>

              {/* Card footer */}
              <View className="p-3">
                <Text className="text-xs font-bold text-white" numberOfLines={1}>
                  {reel.title}
                </Text>
                <View className="mt-1.5 flex-row items-center justify-between">
                  <Text className="text-[9px] font-bold uppercase tracking-wider text-[#E5B842]">
                    {reel.platform}
                  </Text>
                  <Text className="text-[9px] uppercase tracking-wider text-zinc-500">
                    {reel.type}
                  </Text>
                </View>
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

        {/* Social / Channel Links — 2x2 icon grid */}
        <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
          Visit Our Channels
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {socialLinks.map((link, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.85}
              style={{ width: '48%', marginBottom: 12 }}
              className="items-center rounded-2xl border border-zinc-800 bg-zinc-900 px-3 py-5"
              onPress={() => openLink(link.url)}>
              <View
                className="mb-3 h-12 w-12 items-center justify-center rounded-full border"
                style={{ backgroundColor: link.color + '20', borderColor: link.color + '40' }}>
                {link.icon === 'youtube' && (
                  <Text style={{ color: link.color }} className="text-xs font-black">YT</Text>
                )}
                {link.icon === 'instagram' && <Camera color={link.color} size={22} />}
                {link.icon === 'web' && <ExternalLink color={link.color} size={22} />}
              </View>
              <Text className="text-center text-xs font-bold text-white">{link.label}</Text>
              <Text className="mt-1 text-center text-[9px] leading-relaxed text-zinc-400" numberOfLines={2}>
                {link.desc}
              </Text>
              <View className="mt-3 flex-row items-center gap-1">
                <Text className="text-[9px] font-bold uppercase tracking-wider text-[#E5B842]">Visit</Text>
                <ExternalLink color="#E5B842" size={10} />
              </View>
            </TouchableOpacity>
          ))}

          {/* Filler tile to keep a clean 2x2 / even grid when count is odd */}
          {socialLinks.length % 2 !== 0 && (
            <View style={{ width: '48%' }} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}