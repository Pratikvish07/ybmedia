import { ScrollView, Text, View } from 'react-native';

const corporatePillars = [
  {
    title: 'Marketing Head',
    desc: 'Leading strategic marketing initiatives, brand positioning, and campaign ecosystem configurations.',
  },
  {
    title: 'Creative Design Head',
    desc: 'Oversees the visual identity matrices and creative direction vectors of all integrated channels.',
  },
  {
    title: 'Accounts Manager',
    desc: 'Ensures smooth structural financial operations, project budgeting, and tracking models.',
  },
  {
    title: 'Lead Graphic Designer',
    desc: 'Brings concepts to life through captivating visual designs and brand asset generation.',
  },
  {
    title: 'Lead Content Manager',
    desc: 'Responsible for developing compelling content strategies across cross-platform instances.',
  },
  {
    title: 'Audio-Visual Production Head',
    desc: 'Leads planning, capture, execution, and master delivery of all multi-media projects.',
  },
];

export default function PillarsScreen() {
  return (
    <ScrollView className="flex-1 bg-zinc-950 p-6">
      <Text className="mb-2 text-xl font-black uppercase tracking-wider text-white">
        Our Pillars
      </Text>
      <Text className="mb-6 text-xs leading-relaxed text-zinc-400">
        At YASHVI BAGGA PRODUCTIONS, our strength lies in the collective expertise, creativity, and
        dedication of our team.
      </Text>

      <View>
        {corporatePillars.map((pillar, index) => (
          <View
            key={index}
            className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-md">
            <Text className="mb-1 text-base font-bold tracking-tight text-[#E5B842]">
              {pillar.title}
            </Text>
            <Text className="text-xs leading-relaxed text-zinc-300">{pillar.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
