import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const services = [
  {
    id: 'casting',
    icon: '🎬',
    title: 'Casting Services',
    subtitle: 'Discovering Talent. Creating Characters.',
    description:
      'Connect filmmakers, OTT platforms, ad agencies, and corporate clients with the right talent for every production.',
    highlights: [
      'Film & Television Casting',
      'OTT & Web Series',
      'Advertisement & TVC',
      'Corporate & Institutional Films',
      'Music Videos & Digital Content',
    ],
    color: '#E5B842',
  },
  {
    id: 'social_media',
    icon: '📱',
    title: 'Social Media Management',
    subtitle: 'Transforming Brands Through Digital Engagement',
    description:
      'Strategic social media campaigns across Instagram, Facebook, LinkedIn, YouTube, X, Pinterest, and Threads.',
    highlights: [
      'Content Strategy & Calendars',
      'Reels, Shorts & Video Content',
      'Community Management',
      'Analytics & Reporting',
      'Influencer Collaborations',
    ],
    color: '#E5B842',
  },
  {
    id: 'digital_marketing',
    icon: '📊',
    title: 'Digital Marketing',
    subtitle: 'Transforming Digital Presence into Lasting Impact',
    description:
      'Data-driven digital marketing solutions including SEO, performance marketing, ORM, and content marketing.',
    highlights: [
      'Search Engine Optimization (SEO)',
      'Google Ads & Paid Campaigns',
      'Online Reputation Management',
      'Content & Email Marketing',
      'Video Marketing',
    ],
    color: '#E5B842',
  },
  {
    id: 'branding',
    icon: '🎨',
    title: 'Creative Branding',
    subtitle: 'Building Brands That Inspire and Endure',
    description:
      'End-to-end branding solutions from identity design to audio-visual brand films and marketing collateral.',
    highlights: [
      'Brand Strategy & Positioning',
      'Logo & Corporate Identity',
      'Brand Style Guides',
      'Brand Films & Explainer Videos',
      'Motion Graphics & Ads',
    ],
    color: '#E5B842',
  },
  {
    id: 'it_solutions',
    icon: '💻',
    title: 'IT Solutions',
    subtitle: 'Web, App & Technical Development',
    description:
      'Engineering responsive websites, e-commerce platforms, custom apps, CRMs, LMS, and ERP systems.',
    highlights: [
      'Corporate Website Development',
      'E-Commerce Platforms',
      'iOS & Android Apps',
      'CRM / LMS / ERP Systems',
      'Technical Upkeep & Security',
    ],
    color: '#E5B842',
  },
  {
    id: 'talent_pool',
    icon: '👥',
    title: 'Talent Pool & Headhunting',
    subtitle: 'One Partner. Every Talent. Every Department.',
    description:
      'End-to-end personnel sourcing for production units — from creative directors to post-production specialists.',
    highlights: [
      'Directors & Screenwriters',
      'Cinematographers & Crew',
      'Editors, Colorists & VFX',
      'Art, Styling & Production Design',
      'Support & Logistics Staff',
    ],
    color: '#E5B842',
  },
  {
    id: 'manpower',
    icon: '🏢',
    title: 'Manpower Outsourcing',
    subtitle: 'Flexible Workforce Solutions',
    description:
      'Temporary, contract, or project-based staffing across admin, technical, marketing, and event verticals.',
    highlights: [
      'Temporary & Contract Staffing',
      'Admin & Front Desk Support',
      'Technical IT Teams',
      'Marketing Coordination',
      'Event & Promotional Staff',
    ],
    color: '#E5B842',
  },
  {
    id: 'training',
    icon: '🎓',
    title: 'Professional Training',
    subtitle: 'Empowering People. Developing Skills.',
    description:
      'Executive development, digital literacy, and vocational training programmes for organizations and individuals.',
    highlights: [
      'Leadership & Soft Skills',
      'AI & Digital Technology',
      'Cybersecurity & Cloud',
      'Production & Video Editing',
      'Entrepreneurship Development',
    ],
    color: '#E5B842',
  },
];

export default function ServicesScreen() {
  const router = useRouter();

  const handleServicePress = (serviceId: string) => {
    router.push(`/(tabs)/service-detail?id=${serviceId}` as any);
  };

  return (
    <ScrollView className="flex-1 bg-zinc-950" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="bg-zinc-900 px-6 pb-6 pt-6">
        <Text className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#E5B842]">
          What We Offer
        </Text>
        <Text className="text-2xl font-black text-white">Our Services</Text>
        <Text className="mt-2 text-xs leading-relaxed text-zinc-400">
          Tap any service card to explore details and submit a requirement.
        </Text>
      </View>

      <View className="p-4">
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            onPress={() => handleServicePress(service.id)}
            className="mb-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 active:opacity-80">
            <View className="p-5">
              <View className="mb-3 flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#E5B842]/10">
                  <Text className="text-2xl">{service.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-black text-white">{service.title}</Text>
                  <Text className="text-[10px] text-[#E5B842]">{service.subtitle}</Text>
                </View>
                <Text className="text-lg text-zinc-500">›</Text>
              </View>

              <Text className="mb-3 text-xs leading-relaxed text-zinc-400">
                {service.description}
              </Text>

              <View className="flex-row flex-wrap gap-1">
                {service.highlights.slice(0, 3).map((h, i) => (
                  <View key={i} className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5">
                    <Text className="text-[9px] font-semibold text-zinc-300">{h}</Text>
                  </View>
                ))}
                {service.highlights.length > 3 && (
                  <View className="rounded-full border border-[#E5B842]/30 bg-[#E5B842]/10 px-2 py-0.5">
                    <Text className="text-[9px] font-semibold text-[#E5B842]">
                      +{service.highlights.length - 3} more
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View className="border-t border-zinc-800 px-5 py-3">
              <Text className="text-[10px] font-bold uppercase tracking-wider text-[#E5B842]">
                Tap to Submit Requirement →
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}