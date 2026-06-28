import { ScrollView, Text, View } from 'react-native';

const teamPillars = [
  {
    title: 'Marketing Head',
    desc: 'Leading strategic marketing initiatives, brand positioning, campaign planning, client relationship management, and business growth through market insights and innovative strategies.',
    icon: '📣',
  },
  {
    title: 'Creative Design Head',
    desc: 'Oversees visual identity and creative direction across all projects — from conceptualizing brand aesthetics to ensuring consistency across campaigns.',
    icon: '🎨',
  },
  {
    title: 'Accounts Manager',
    desc: 'Ensures smooth financial operations, project budgeting, vendor coordination, and client billing management with transparency and efficiency.',
    icon: '📋',
  },
  {
    title: 'Lead Graphic Designer',
    desc: 'Brings concepts to life through captivating visual designs — social media creatives, branding materials, marketing collateral, and campaign assets.',
    icon: '✏️',
  },
  {
    title: 'Lead Content Manager',
    desc: 'Develops compelling content strategies and manages content creation across platforms through engaging storytelling and audience-focused communication.',
    icon: '📝',
  },
  {
    title: 'Audio-Visual Production Head',
    desc: 'Leads planning, production, and execution of video, photography, and multimedia projects — from concept development to final delivery.',
    icon: '🎥',
  },
  {
    title: 'Social Media Management Team',
    desc: 'Monitors trends, creates engaging content calendars, manages online communities, and executes platform-specific strategies to maximize digital visibility.',
    icon: '📱',
  },
  {
    title: 'Talent Sourcing & Influencer Relations',
    desc: 'Identifies, evaluates, and manages collaborations with creators, influencers, artists, and industry professionals to connect brands with the right talent.',
    icon: '⭐',
  },
  {
    title: 'Video Editors & Post-Production Team',
    desc: 'Transforms raw footage into polished visual stories through expert editing, motion graphics, sound synchronization, and post-production enhancements.',
    icon: '🎞️',
  },
  {
    title: 'Content Writers & Creative Strategists',
    desc: 'Develops scripts, campaign concepts, brand stories, website content, social media copy, and marketing communications that inspire action and drive engagement.',
    icon: '💬',
  },
];

const networkHighlights = [
  'Senior Corporate Trainers & Subject Matter Experts',
  'Film Makers, Directors, Cinematographers & Editors',
  'Social Media Strategists & Digital Marketing Professionals',
  'Graphic Designers, Animators & Motion Graphics Experts',
  'Anchors, Moderators & Masters of Ceremonies',
  'Actors, Models, Voice Artists & Creative Talent',
  'HR Consultants & Recruitment Professionals',
  'Event Managers & Production Teams',
  'Technical Support Teams & Project Coordinators',
  'Regional Associates & Local Execution Partners',
];

export default function PillarsScreen() {
  return (
    <ScrollView className="flex-1 bg-zinc-950" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="bg-zinc-900 px-6 pb-6 pt-6">
        <Text className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#E5B842]">
          The People Behind YB
        </Text>
        <Text className="text-2xl font-black text-white">Our Pillars</Text>
        <Text className="mt-2 text-xs leading-relaxed text-zinc-400">
          Our strength lies in the collective expertise, creativity, and dedication of our team — a passionate group committed to delivering impactful solutions.
        </Text>
      </View>

      <View className="p-4">
        {/* Team Cards */}
        {teamPillars.map((pillar, index) => (
          <View
            key={index}
            className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <View className="mb-2 flex-row items-center gap-3">
              <Text className="text-2xl">{pillar.icon}</Text>
              <Text className="flex-1 text-sm font-bold text-[#E5B842]">{pillar.title}</Text>
            </View>
            <Text className="text-xs leading-relaxed text-zinc-300">{pillar.desc}</Text>
          </View>
        ))}

        {/* Network Section */}
        <View className="mt-4 rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
          <Text className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#E5B842]">
            Pan-India Network
          </Text>
          <Text className="mb-4 text-base font-black text-white">
            Nationwide Reach. Local Expertise.
          </Text>
          <Text className="mb-4 text-xs leading-relaxed text-zinc-400">
            Our Pan-India network enables us to deliver seamless, high-quality services across the country — from metropolitan cities to Tier-II and Tier-III cities.
          </Text>
          {networkHighlights.map((item, i) => (
            <View key={i} className="mb-2 flex-row items-start gap-3">
              <View className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#E5B842]" />
              <Text className="flex-1 text-xs text-zinc-300">{item}</Text>
            </View>
          ))}
          <View className="mt-5 rounded-lg bg-[#E5B842]/10 p-3">
            <Text className="text-center text-[10px] font-bold uppercase tracking-widest text-[#E5B842]">
              One Network · One Standard · One Commitment to Excellence
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}