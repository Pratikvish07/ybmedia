import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Camera, ExternalLink, Video } from 'lucide-react-native';

const runtimeMediaRegistry = [
  {
    id: '1',
    title: 'Production Showreel V1',
    duration: '3:45',
    thumbnail:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    title: 'Brand Campaign Shoot',
    duration: '1:30',
    thumbnail:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
  },
];

export default function PortfolioScreen() {
  const triggerDeepLinkRouting = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Routing Interruption', `Target URL context open failure: ${url}`);
    }
  };

  return (
    <ScrollView className="flex-1 bg-zinc-950 p-6">
      <Text className="mb-2 text-xl font-black uppercase tracking-wider text-white">
        Portfolio Integration
      </Text>
      <Text className="mb-6 text-xs text-zinc-400">
        Live channels mapping to Yashvi Bagga Productions content syndication systems.
      </Text>

      <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
        YouTube Content Channel Sub-Nodes
      </Text>
      {runtimeMediaRegistry.map((video) => (
        <View
          key={video.id}
          className="mb-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg">
          <View className="relative h-40 items-center justify-center bg-zinc-800">
            <Text className="font-mono text-xs uppercase text-zinc-600">
              [ Video Asset Embed Frame ]
            </Text>
            <View className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5">
              <Text className="font-mono text-[10px] text-zinc-400">{video.duration}</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between p-4">
            <View className="flex-1 pr-4">
              <Text
                className="text-xs font-bold uppercase tracking-wide text-white"
                numberOfLines={1}>
                {video.title}
              </Text>
              <Text className="mt-0.5 font-mono text-[10px] uppercase text-zinc-500">
                Source Node ID: YT-{video.id}
              </Text>
            </View>
            <TouchableOpacity
              className="rounded-lg bg-zinc-800 p-2"
              onPress={() => triggerDeepLinkRouting('https://youtube.com/@yashvibagga')}>
              <ExternalLink color="#E5B842" size={14} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text className="mb-3 mt-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
        Verification Target Anchors
      </Text>
      <View className="flex-row gap-2">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          onPress={() => triggerDeepLinkRouting('https://youtube.com/@yashvibagga')}>
          <Video color="#EF4444" size={18} />
          <Text className="ml-2 text-xs font-bold text-white">YouTube Channel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-4"
          onPress={() => triggerDeepLinkRouting('https://www.instagram.com/yashvayayay')}>
          <Camera color="#E1306C" size={18} />
          <Text className="ml-2 text-xs font-bold text-white">Instagram Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
