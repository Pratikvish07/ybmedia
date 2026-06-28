import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import { ChevronLeft, Send } from 'lucide-react-native';
import { auth, firestore } from '../../config/firebase';

const serviceDetails: Record<string, {
  icon: string;
  title: string;
  subtitle: string;
  about: string;
  offerings: string[];
  formTitle: string;
  extraFields: Array<{ key: string; label: string; placeholder: string; multiline?: boolean }>;
}> = {
  casting: {
    icon: '🎬',
    title: 'Casting Services',
    subtitle: 'Discovering Talent. Creating Characters. Bringing Stories to Life.',
    about:
      'We connect filmmakers, television producers, OTT platforms, advertising agencies, and corporate clients with talented artists who perfectly match the creative vision of their projects.',
    offerings: [
      'Film Casting (Feature, Short, Documentary)',
      'Television & Daily Soap Casting',
      'OTT & Web Series Casting',
      'Advertisement & Commercial Casting',
      'Corporate & Institutional Film Casting',
      'Music Videos & Digital Content',
      'Child, Teen & Senior Artist Casting',
      'Voice-Over & Background Artists',
    ],
    formTitle: 'Submit Casting Requirement',
    extraFields: [
      { key: 'productionType', label: 'Production Type', placeholder: 'e.g. Feature Film, TVC, Web Series' },
      { key: 'characterDescription', label: 'Character/Role Description', placeholder: 'Describe the character, age, look, personality...', multiline: true },
      { key: 'castingDeadline', label: 'Casting Deadline', placeholder: 'e.g. 15 July 2025' },
      { key: 'numberOfRoles', label: 'Number of Roles Required', placeholder: 'e.g. 3 lead + 5 supporting' },
    ],
  },
  social_media: {
    icon: '📱',
    title: 'Social Media Management',
    subtitle: 'Transforming Brands Through Strategic Digital Engagement',
    about:
      'We manage and grow your social media presence across Instagram, Facebook, LinkedIn, YouTube, X, Pinterest, and Threads with data-driven strategies and engaging content.',
    offerings: [
      'Social Media Strategy & Planning',
      'Content Calendar Development',
      'Creative Post Design (Graphics & Reels)',
      'Community Management & Engagement',
      'Influencer & Creator Collaborations',
      'Paid Social Advertising',
      'Analytics & Performance Reporting',
      'ORM — Online Reputation Management',
    ],
    formTitle: 'Request Social Media Services',
    extraFields: [
      { key: 'platforms', label: 'Platforms Needed', placeholder: 'e.g. Instagram, LinkedIn, YouTube' },
      { key: 'targetAudience', label: 'Target Audience', placeholder: 'Describe your target audience...' },
      { key: 'currentFollowers', label: 'Current Follower Count (approx.)', placeholder: 'e.g. 5,000 on Instagram' },
      { key: 'contentGoals', label: 'Goals / KPIs', placeholder: 'e.g. brand awareness, lead generation...', multiline: true },
    ],
  },
  digital_marketing: {
    icon: '📊',
    title: 'Digital Marketing',
    subtitle: 'Transforming Digital Presence into Lasting Impact',
    about:
      'We combine creativity, technology, and data-driven insights to design campaigns that increase visibility, build trust, and deliver tangible business outcomes.',
    offerings: [
      'Search Engine Optimization (SEO)',
      'Google Ads & Performance Marketing',
      'Social Media Advertising',
      'Content & Email Marketing',
      'Video Marketing',
      'Website Design & Digital Branding',
      'Online Reputation Management (ORM)',
      'Government & Public Sector Solutions',
    ],
    formTitle: 'Request Digital Marketing Services',
    extraFields: [
      { key: 'websiteUrl', label: 'Website URL', placeholder: 'https://yourwebsite.com' },
      { key: 'marketingObjective', label: 'Marketing Objective', placeholder: 'e.g. increase organic traffic, generate leads...' },
      { key: 'currentChallenges', label: 'Current Challenges', placeholder: 'Describe challenges you face digitally...', multiline: true },
      { key: 'monthlyAdBudget', label: 'Monthly Ad Budget (INR)', placeholder: 'e.g. ₹50,000' },
    ],
  },
  branding: {
    icon: '🎨',
    title: 'Creative Branding',
    subtitle: 'Building Brands That Inspire, Connect, and Endure',
    about:
      'From identity definition workshops to audio-visual brand films, we build powerful brand identities that resonate with audiences and stand the test of time.',
    offerings: [
      'Brand Strategy & Positioning',
      'Logo & Corporate Identity Design',
      'Brand Style Guide & Color Palette',
      'Business Collateral (Brochures, Reports)',
      'Brand Films & Corporate Videos',
      'Explainer & Product Videos',
      'Motion Graphics & Ads',
      'Television & Digital Advertisements',
    ],
    formTitle: 'Submit Branding Requirement',
    extraFields: [
      { key: 'brandingScope', label: 'Branding Scope Needed', placeholder: 'e.g. new brand identity, rebranding, brand film' },
      { key: 'industryType', label: 'Industry / Sector', placeholder: 'e.g. Healthcare, Education, E-Commerce' },
      { key: 'competitorBrands', label: 'Competitor Brands (optional)', placeholder: 'List 2-3 competitors for reference' },
      { key: 'brandVision', label: 'Brand Vision & Values', placeholder: 'Describe what your brand should convey...', multiline: true },
    ],
  },
  it_solutions: {
    icon: '💻',
    title: 'IT Solutions',
    subtitle: 'Web, App & Technical Development',
    about:
      'We engineer responsive, secure digital platforms — from corporate websites and e-commerce stores to custom iOS/Android apps, CRMs, LMS, and ERP systems.',
    offerings: [
      'Corporate Website Design & Development',
      'E-Commerce with Payment Gateways',
      'Portfolio & Scheduling Platforms',
      'iOS & Android App Development',
      'CRM / LMS / ERP Systems',
      'UI/UX Design & Prototyping',
      'Plugin Updates & Security Monitoring',
      'Domain, Hosting & Business Email',
    ],
    formTitle: 'Request IT Development Services',
    extraFields: [
      { key: 'projectType', label: 'Project Type', placeholder: 'e.g. Website, Mobile App, CRM System' },
      { key: 'techRequirements', label: 'Technical Requirements', placeholder: 'Describe features, integrations needed...', multiline: true },
      { key: 'targetPlatform', label: 'Target Platform', placeholder: 'e.g. iOS, Android, Web, All' },
      { key: 'timeline', label: 'Expected Launch Timeline', placeholder: 'e.g. 3 months, Q3 2025' },
    ],
  },
  talent_pool: {
    icon: '👥',
    title: 'Talent Pool & Headhunting',
    subtitle: 'One Partner. Every Talent. Every Department.',
    about:
      'Beyond casting, we provide end-to-end personnel sourcing for production units — creative teams, technical crew, art & styling, post-production specialists, and support staff.',
    offerings: [
      'Directors, Screenwriters & Choreographers',
      'Cinematographers & Drone Operators',
      'Sound Engineers & Lighting Gaffers',
      'Production Designers & Costume Stylists',
      'Editors, Colorists & VFX/CGI Technicians',
      'Background Score Composers & Foley Artists',
      'Line / Location Managers',
      'Logistics, Security & Catering Support',
    ],
    formTitle: 'Submit Talent Requirement',
    extraFields: [
      { key: 'rolesRequired', label: 'Roles/Positions Required', placeholder: 'List the roles you need filled...', multiline: true },
      { key: 'projectType', label: 'Project Type', placeholder: 'e.g. Feature Film, Documentary, Ad Film' },
      { key: 'shootLocation', label: 'Shoot Location(s)', placeholder: 'e.g. Mumbai, Delhi, Pan-India' },
      { key: 'shootDuration', label: 'Shoot Duration', placeholder: 'e.g. 30 days starting August 2025' },
    ],
  },
  manpower: {
    icon: '🏢',
    title: 'Manpower Outsourcing',
    subtitle: 'Flexible Workforce Solutions for Growing Organizations',
    about:
      'We provide temporary, contract, or project-based staffing solutions across admin, technical, marketing, and event verticals for organizations of all sizes.',
    offerings: [
      'Temporary Personnel Provisions',
      'Long-Term Contract Staffing',
      'Project-Based Team Deployment',
      'Admin & Front Desk Support',
      'Technical IT Teams',
      'Marketing Coordination Teams',
      'Corporate Trainers',
      'Event & Promotional Staff',
    ],
    formTitle: 'Submit Manpower Requirement',
    extraFields: [
      { key: 'staffingType', label: 'Staffing Type', placeholder: 'e.g. Temporary, Contract, Project-based' },
      { key: 'rolesNeeded', label: 'Roles / Positions Needed', placeholder: 'e.g. 5 admin staff, 2 IT support...', multiline: true },
      { key: 'workLocation', label: 'Work Location', placeholder: 'City / State or Remote' },
      { key: 'engagementPeriod', label: 'Engagement Period', placeholder: 'e.g. 3 months, 6 months, ongoing' },
    ],
  },
  training: {
    icon: '🎓',
    title: 'Professional & Vocational Training',
    subtitle: 'Empowering People. Developing Skills. Transforming Careers.',
    about:
      'We offer executive development, digital literacy, and vocational training programmes designed for organizations, educational institutions, and individuals across India.',
    offerings: [
      'Leadership & Soft Skills Training',
      'Communication & Emotional Intelligence',
      'Generative AI & Digital Technology',
      'Cybersecurity & Cloud Fundamentals',
      'Video Editing & Photography',
      'Production Techniques',
      'Event & Hospitality Management',
      'Entrepreneurship Development',
    ],
    formTitle: 'Request Training Programme',
    extraFields: [
      { key: 'trainingType', label: 'Training Programme Required', placeholder: 'e.g. Leadership, AI Tools, Video Editing' },
      { key: 'targetParticipants', label: 'Target Participants', placeholder: 'e.g. Corporate executives, college students...' },
      { key: 'numberOfParticipants', label: 'Number of Participants', placeholder: 'e.g. 30-50 participants' },
      { key: 'preferredMode', label: 'Preferred Mode', placeholder: 'Online / Offline / Hybrid' },
    ],
  },
};

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const service = serviceDetails[id ?? 'casting'];

  const [projectName, setProjectName] = useState('');
  const [brief, setBrief] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [extraValues, setExtraValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (!service) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-950">
        <Text className="text-white">Service not found.</Text>
      </View>
    );
  }

  const handleSubmit = async () => {
    if (!projectName || !brief) {
      Alert.alert('Incomplete', 'Please provide a project name and brief.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(firestore, 'service_requirements'), {
        serviceId: id,
        serviceTitle: service.title,
        userId: auth.currentUser?.uid ?? 'guest',
        userEmail: auth.currentUser?.email ?? 'guest',
        projectName: projectName.trim(),
        brief: brief.trim(),
        budgetRange: budgetRange.trim(),
        ...extraValues,
        status: 'pending_review',
        timestamp: new Date().toISOString(),
      });
      Alert.alert('Submitted!', 'Your requirement has been sent to our team. We will be in touch shortly.');
      setProjectName('');
      setBrief('');
      setBudgetRange('');
      setExtraValues({});
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-zinc-950" showsVerticalScrollIndicator={false}>
      {/* Back Header */}
      <TouchableOpacity
        className="flex-row items-center gap-2 px-5 pt-14 pb-2"
        onPress={() => router.back()}>
        <ChevronLeft color="#E5B842" size={20} />
        <Text className="text-xs font-bold uppercase tracking-wider text-[#E5B842]">Services</Text>
      </TouchableOpacity>

      {/* Service Hero */}
      <View className="px-6 pb-6 pt-2">
        <View className="mb-3 flex-row items-center gap-4">
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-[#E5B842]/10">
            <Text className="text-3xl">{service.icon}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xl font-black text-white">{service.title}</Text>
            <Text className="mt-0.5 text-[10px] italic text-[#E5B842]">{service.subtitle}</Text>
          </View>
        </View>
        <Text className="text-xs leading-relaxed text-zinc-400">{service.about}</Text>
      </View>

      {/* What's Included */}
      <View className="px-6 pb-6">
        <Text className="mb-3 text-xs font-black uppercase tracking-widest text-zinc-400">
          What's Included
        </Text>
        {service.offerings.map((item, i) => (
          <View key={i} className="mb-2 flex-row items-start gap-3">
            <View className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E5B842]" />
            <Text className="flex-1 text-xs leading-relaxed text-zinc-300">{item}</Text>
          </View>
        ))}
      </View>

      {/* Requirement Form */}
      <View className="border-t border-zinc-800 px-6 pb-16 pt-6">
        <Text className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#E5B842]">
          Submit Your Requirement
        </Text>
        <Text className="mb-5 text-lg font-black text-white">{service.formTitle}</Text>

        {/* Common fields */}
        <View className="mb-3">
          <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Project Name *
          </Text>
          <TextInput
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
            placeholder="e.g. Winter Campaign 2025"
            placeholderTextColor="#52525b"
            value={projectName}
            onChangeText={setProjectName}
          />
        </View>

        {/* Service-specific extra fields */}
        {service.extraFields.map((field) => (
          <View key={field.key} className="mb-3">
            <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              {field.label}
            </Text>
            <TextInput
              className={`rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white ${field.multiline ? 'min-h-[90px]' : ''}`}
              placeholder={field.placeholder}
              placeholderTextColor="#52525b"
              multiline={field.multiline}
              textAlignVertical={field.multiline ? 'top' : 'center'}
              numberOfLines={field.multiline ? 4 : 1}
              value={extraValues[field.key] ?? ''}
              onChangeText={(val) => setExtraValues((prev) => ({ ...prev, [field.key]: val }))}
            />
          </View>
        ))}

        <View className="mb-3">
          <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Project Brief / Overview *
          </Text>
          <TextInput
            className="min-h-[120px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
            placeholder="Describe your project, objectives, timeline, and any specific requirements..."
            placeholderTextColor="#52525b"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={brief}
            onChangeText={setBrief}
          />
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Budget Range (INR)
          </Text>
          <TextInput
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
            placeholder="e.g. ₹50,000 – ₹1,00,000"
            placeholderTextColor="#52525b"
            value={budgetRange}
            onChangeText={setBudgetRange}
          />
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center rounded-xl bg-[#E5B842] p-4"
          onPress={handleSubmit}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Send color="#000" size={16} />
              <Text className="ml-2 text-sm font-extrabold uppercase tracking-wider text-black">
                Submit Requirement
              </Text>
            </>
          )}
        </TouchableOpacity>

        {!auth.currentUser && (
          <Text className="mt-3 text-center text-[10px] text-zinc-600">
            Sign in to track your submitted requirements.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}