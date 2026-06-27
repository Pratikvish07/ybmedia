import { ScrollView, Text, View } from 'react-native';
import { CheckCircle } from 'lucide-react-native';

const structuralServices = [
  'Commercial & Advertisement Casting',
  'Film & Entertainment Casting',
  'Model & Fashion Casting',
  'Influencer & Creator Casting',
  'Corporate & Training Video Casting',
  'Child, Teen & Senior Talent Casting',
];

export default function ServicesScreen() {
  return (
    <ScrollView className="flex-1 bg-zinc-950 p-6">
      <View className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <Text className="mb-1 text-xs font-black uppercase tracking-widest text-[#E5B842]">
          Casting Matrix Portfolio
        </Text>
        <Text className="mb-2 text-xl font-extrabold tracking-tight text-white">
          Discovering Right Talent for Every Story
        </Text>
        <Text className="text-justify text-xs leading-relaxed text-zinc-400">
          Our extensive talent network, industry expertise, and streamlined casting process enable
          us to identify and present the most suitable talent based on project requirements.
        </Text>
      </View>

      <Text className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
        Core Casting Verticals Available
      </Text>
      <View className="mb-6">
        {structuralServices.map((service, idx) => (
          <View
            key={idx}
            className="mb-2 flex-row items-center rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4">
            <CheckCircle color="#E5B842" size={16} />
            <Text className="ml-3 text-xs font-semibold tracking-wide text-zinc-200">
              {service}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
