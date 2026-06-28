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
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Briefcase, Film, User } from 'lucide-react-native';
import { auth, firestore } from '../../config/firebase';

type FormType = 'talent' | 'actor' | 'company';

const LANGUAGES = ['English', 'Hindi', 'Punjabi', 'Tamil', 'Telugu', 'Malayalam', 'Bengali', 'Marathi', 'Gujarati'];
const ACTOR_SKILLS = ['Dance', 'Singing', 'Theatre', 'Martial Arts', 'Gymnastics', 'Horse Riding', 'Swimming', 'Driving', 'Public Speaking', 'Anchoring', 'Musical Instruments', 'Regional Dialects', 'Foreign Languages'];
const ROLE_INTERESTS = ['Films', 'Web Series', 'OTT Productions', 'Television', 'Advertisements', 'Corporate Videos', 'Music Videos', 'Short Films', 'Digital Content', 'Social Media Campaigns', 'Print Modelling', 'Fashion Shows'];
const TALENT_INTERESTS = ['Full-Time Employment', 'Part-Time Employment', 'Freelance Projects', 'Contract Assignments', 'Event-Based Engagements', 'Brand Collaborations', 'Casting Opportunities', 'Influencer Campaigns', 'Creative Consulting'];
const MEDIA_PROFESSIONS = ['Director', 'Screenwriter / Script Writer', 'Cinematographer / DOP', 'Video Editor', 'Sound Engineer', 'Lighting Gaffer', 'Drone Operator', 'Production Designer', 'Costume Stylist', 'Makeup Artist', 'VFX / CGI Artist', 'Motion Graphics', 'Photographer', 'Graphic Designer', 'Anchor / Presenter', 'Voice-Over Artist', 'Actor / Performer', 'Social Media Manager', 'Digital Marketer', 'Content Writer', 'Event Manager', 'HR / Recruitment'];
const BUILD_TYPES = ['Slim', 'Athletic', 'Average', 'Heavy'];
const EXPERIENCE_LEVELS = ['Fresher', 'Less than 1 Year', '1–3 Years', '3–5 Years', 'More than 5 Years'];

function CheckItem({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      className={`mb-2 flex-row items-center gap-3 rounded-lg border p-3 ${
        checked ? 'border-[#E5B842] bg-[#E5B842]/10' : 'border-zinc-800 bg-zinc-900'
      }`}>
      <View
        className={`h-4 w-4 rounded items-center justify-center border ${
          checked ? 'border-[#E5B842] bg-[#E5B842]' : 'border-zinc-600'
        }`}>
        {checked && <Text className="text-[9px] font-black text-black">✓</Text>}
      </View>
      <Text className={`flex-1 text-xs ${checked ? 'text-white' : 'text-zinc-400'}`}>{label}</Text>
    </TouchableOpacity>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="mb-4 mt-6 border-b border-zinc-800 pb-2 text-[10px] font-black uppercase tracking-widest text-zinc-500">
      {children}
    </Text>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View className="mb-3">
      <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">{label}</Text>
      {children}
    </View>
  );
}

function Input(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
      placeholderTextColor="#52525b"
      {...props}
    />
  );
}

// ---------- TALENT / MEDIA PROFESSIONAL FORM ----------
function MediaProfessionalForm({ onSubmit, loading }: { onSubmit: (data: any) => void; loading: boolean }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [professions, setProfessions] = useState<string[]>([]);
  const [totalExp, setTotalExp] = useState('');
  const [prevClients, setPrevClients] = useState('');
  const [skills, setSkills] = useState('');
  const [portfolioLinks, setPortfolioLinks] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [expectedComp, setExpectedComp] = useState('');
  const [whyJoin, setWhyJoin] = useState('');

  const toggleProfession = (p: string) =>
    setProfessions((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  const toggleInterest = (i: string) =>
    setInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  return (
    <>
      <SectionLabel>A. Personal Information</SectionLabel>
      <Field label="Full Name *"><Input placeholder="Your full name" value={fullName} onChangeText={setFullName} /></Field>
      <Field label="Phone Number *"><Input placeholder="Mobile number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} /></Field>
      <Field label="Email Address *"><Input placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} /></Field>
      <Field label="Password *"><Input placeholder="Password (6+ characters)" secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword} /></Field>
      <View className="mb-3 flex-row gap-3">
        <View className="flex-1">
          <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">City</Text>
          <Input placeholder="City" value={city} onChangeText={setCity} />
        </View>
        <View className="flex-1">
          <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">State</Text>
          <Input placeholder="State" value={state} onChangeText={setState} />
        </View>
      </View>

      <SectionLabel>B. Primary Profession (Select All Applicable)</SectionLabel>
      {MEDIA_PROFESSIONS.map((p) => (
        <CheckItem key={p} label={p} checked={professions.includes(p)} onToggle={() => toggleProfession(p)} />
      ))}

      <SectionLabel>C. Experience Details</SectionLabel>
      <Field label="Total Experience">
        <View className="flex-row flex-wrap gap-2">
          {EXPERIENCE_LEVELS.map((l) => (
            <TouchableOpacity
              key={l}
              onPress={() => setTotalExp(l)}
              className={`rounded-full border px-3 py-1.5 ${totalExp === l ? 'border-[#E5B842] bg-[#E5B842]/10' : 'border-zinc-700 bg-zinc-900'}`}>
              <Text className={`text-[10px] font-semibold ${totalExp === l ? 'text-[#E5B842]' : 'text-zinc-400'}`}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Field>
      <Field label="Previous Organizations / Clients"><Input placeholder="List previous clients or companies" value={prevClients} onChangeText={setPrevClients} multiline numberOfLines={3} textAlignVertical="top" className="min-h-[80px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white" /></Field>
      <Field label="Skills & Specializations"><Input placeholder="Key skills and areas of expertise" value={skills} onChangeText={setSkills} /></Field>

      <SectionLabel>D. Assignment Preferences</SectionLabel>
      <Text className="mb-2 text-[10px] text-zinc-500">Interested In (select all that apply)</Text>
      {TALENT_INTERESTS.map((i) => (
        <CheckItem key={i} label={i} checked={interests.includes(i)} onToggle={() => toggleInterest(i)} />
      ))}

      <SectionLabel>E. Portfolio & Work Samples</SectionLabel>
      <Field label="Portfolio / Showreel Links"><Input placeholder="YouTube, Drive, Instagram, website links..." value={portfolioLinks} onChangeText={setPortfolioLinks} multiline numberOfLines={3} textAlignVertical="top" className="min-h-[80px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white" /></Field>

      <SectionLabel>F. Compensation & Additional Info</SectionLabel>
      <Field label="Expected Compensation"><Input placeholder="e.g. ₹50,000/month or Per Project basis" value={expectedComp} onChangeText={setExpectedComp} /></Field>
      <Field label="Why Yashvi Bagga Productions?"><Input placeholder="Why would you like to work with us?" value={whyJoin} onChangeText={setWhyJoin} multiline numberOfLines={4} textAlignVertical="top" className="min-h-[100px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white" /></Field>

      <TouchableOpacity
        className="mt-6 flex-row items-center justify-center rounded-xl bg-[#E5B842] p-4"
        disabled={loading}
        onPress={() =>
          onSubmit({ fullName, phone, email, password, city, state, professions, totalExp, prevClients, skills, portfolioLinks, interests, expectedComp, whyJoin, role: 'talent' })
        }>
        {loading ? <ActivityIndicator color="#000" /> : <Text className="text-sm font-extrabold uppercase tracking-wider text-black">Register as Media Professional</Text>}
      </TouchableOpacity>
    </>
  );
}

// ---------- ACTOR REGISTRATION FORM ----------
function ActorForm({ onSubmit, loading }: { onSubmit: (data: any) => void; loading: boolean }) {
  const [fullName, setFullName] = useState('');
  const [stageName, setStageName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [build, setBuild] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);

  const [expLevel, setExpLevel] = useState('');
  const [formalTraining, setFormalTraining] = useState<string>('');
  const [trainingInstitute, setTrainingInstitute] = useState('');
  const [prevWork, setPrevWork] = useState('');

  const [roleInterests, setRoleInterests] = useState<string[]>([]);
  const [actorSkills, setActorSkills] = useState<string[]>([]);
  const [aboutSelf, setAboutSelf] = useState('');

  const [mediaLinks, setMediaLinks] = useState('');
  const [instagramLink, setInstagramLink] = useState('');

  const [willingToTravel, setWillingToTravel] = useState('');

  const toggle = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  return (
    <>
      <SectionLabel>A. Personal Details</SectionLabel>
      <Field label="Full Name *"><Input placeholder="Full legal name" value={fullName} onChangeText={setFullName} /></Field>
      <Field label="Stage Name (optional)"><Input placeholder="Stage name if any" value={stageName} onChangeText={setStageName} /></Field>
      <View className="mb-3 flex-row gap-3">
        <View className="flex-1">
          <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Age</Text>
          <Input placeholder="Age" keyboardType="numeric" value={age} onChangeText={setAge} />
        </View>
        <View className="flex-1">
          <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Gender</Text>
          <Input placeholder="Gender" value={gender} onChangeText={setGender} />
        </View>
      </View>
      <Field label="Date of Birth"><Input placeholder="DD/MM/YYYY" value={dob} onChangeText={setDob} /></Field>
      <Field label="City of Residence"><Input placeholder="City" value={city} onChangeText={setCity} /></Field>
      <Field label="Mobile Number *"><Input placeholder="Phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} /></Field>
      <Field label="Email Address *"><Input placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} /></Field>
      <Field label="Password *"><Input placeholder="Password (6+ characters)" secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword} /></Field>

      <SectionLabel>B. Physical Profile</SectionLabel>
      <View className="mb-3 flex-row gap-3">
        <View className="flex-1">
          <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Height</Text>
          <Input placeholder={'e.g. 5\'10"'} value={height} onChangeText={setHeight} />
        </View>
        <View className="flex-1">
          <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Weight</Text>
          <Input placeholder="e.g. 65 kg" value={weight} onChangeText={setWeight} />
        </View>
      </View>
      <Field label="Build Type">
        <View className="flex-row flex-wrap gap-2">
          {BUILD_TYPES.map((b) => (
            <TouchableOpacity key={b} onPress={() => setBuild(b)}
              className={`rounded-full border px-3 py-1.5 ${build === b ? 'border-[#E5B842] bg-[#E5B842]/10' : 'border-zinc-700 bg-zinc-900'}`}>
              <Text className={`text-[10px] font-semibold ${build === b ? 'text-[#E5B842]' : 'text-zinc-400'}`}>{b}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Field>
      <View className="mb-3 flex-row gap-3">
        <View className="flex-1">
          <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Hair Color</Text>
          <Input placeholder="Hair color" value={hairColor} onChangeText={setHairColor} />
        </View>
        <View className="flex-1">
          <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Eye Color</Text>
          <Input placeholder="Eye color" value={eyeColor} onChangeText={setEyeColor} />
        </View>
      </View>
      <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Languages Spoken</Text>
      {LANGUAGES.map((l) => (
        <CheckItem key={l} label={l} checked={languages.includes(l)} onToggle={() => toggle(languages, l, setLanguages)} />
      ))}

      <SectionLabel>C. Acting Experience</SectionLabel>
      <Field label="Experience Level">
        <View className="flex-row flex-wrap gap-2">
          {EXPERIENCE_LEVELS.map((l) => (
            <TouchableOpacity key={l} onPress={() => setExpLevel(l)}
              className={`rounded-full border px-3 py-1.5 ${expLevel === l ? 'border-[#E5B842] bg-[#E5B842]/10' : 'border-zinc-700 bg-zinc-900'}`}>
              <Text className={`text-[10px] font-semibold ${expLevel === l ? 'text-[#E5B842]' : 'text-zinc-400'}`}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Field>
      <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Formal Acting Training?</Text>
      <View className="mb-3 flex-row gap-3">
        {['Yes', 'No'].map((opt) => (
          <TouchableOpacity key={opt} onPress={() => setFormalTraining(opt)}
            className={`flex-1 rounded-xl border py-3 ${formalTraining === opt ? 'border-[#E5B842] bg-[#E5B842]/10' : 'border-zinc-800 bg-zinc-900'}`}>
            <Text className={`text-center text-xs font-bold ${formalTraining === opt ? 'text-[#E5B842]' : 'text-zinc-400'}`}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {formalTraining === 'Yes' && (
        <Field label="Institute / Trainer Name"><Input placeholder="Training institute or trainer" value={trainingInstitute} onChangeText={setTrainingInstitute} /></Field>
      )}
      <Field label="Previous Work / Experience">
        <TextInput
          className="min-h-[100px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
          placeholder="Mention films, ads, web series, theatre, music videos, modelling..."
          placeholderTextColor="#52525b"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={prevWork}
          onChangeText={setPrevWork}
        />
      </Field>

      <SectionLabel>D. Role Preferences</SectionLabel>
      <Text className="mb-2 text-[10px] text-zinc-500">Interested In (select all applicable)</Text>
      {ROLE_INTERESTS.map((r) => (
        <CheckItem key={r} label={r} checked={roleInterests.includes(r)} onToggle={() => toggle(roleInterests, r, setRoleInterests)} />
      ))}

      <SectionLabel>E. Talent & Special Skills</SectionLabel>
      {ACTOR_SKILLS.map((s) => (
        <CheckItem key={s} label={s} checked={actorSkills.includes(s)} onToggle={() => toggle(actorSkills, s, setActorSkills)} />
      ))}

      <SectionLabel>F. About Yourself</SectionLabel>
      <Field label="Introduce Yourself">
        <TextInput
          className="min-h-[120px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
          placeholder="Tell us about yourself, acting journey, strengths, aspirations, and what makes you unique..."
          placeholderTextColor="#52525b"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={aboutSelf}
          onChangeText={setAboutSelf}
        />
      </Field>

      <SectionLabel>G. Media & Portfolio Links</SectionLabel>
      <Field label="YouTube / Drive / Showreel Links">
        <TextInput
          className="min-h-[90px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
          placeholder="Paste YouTube, Google Drive, or showreel links here..."
          placeholderTextColor="#52525b"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={mediaLinks}
          onChangeText={setMediaLinks}
        />
      </Field>
      <Field label="Instagram / Facebook Profile"><Input placeholder="https://instagram.com/yourprofile" autoCapitalize="none" value={instagramLink} onChangeText={setInstagramLink} /></Field>
      <View className="mb-4 rounded-xl border border-[#E5B842]/20 bg-[#E5B842]/5 p-3">
        <Text className="text-[10px] leading-relaxed text-zinc-400">
          📌 Applications with performance videos, audition clips, or showreels are given priority. Please submit at least one self-introduction or performance video link.
        </Text>
      </View>

      <SectionLabel>H. Availability</SectionLabel>
      <Text className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Willing to Travel for Shoots?</Text>
      <View className="mb-4 flex-row gap-3">
        {['Yes', 'No', 'Depends on Location'].map((opt) => (
          <TouchableOpacity key={opt} onPress={() => setWillingToTravel(opt)}
            className={`flex-1 rounded-xl border py-3 ${willingToTravel === opt ? 'border-[#E5B842] bg-[#E5B842]/10' : 'border-zinc-800 bg-zinc-900'}`}>
            <Text className={`text-center text-[9px] font-bold ${willingToTravel === opt ? 'text-[#E5B842]' : 'text-zinc-400'}`}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="mb-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <Text className="text-[10px] italic leading-relaxed text-zinc-500">
          I hereby declare that the information provided is true and accurate. I authorize YASHVI BAGGA PRODUCTIONS to review my submitted materials for casting purposes.
        </Text>
      </View>

      <TouchableOpacity
        className="mt-2 flex-row items-center justify-center rounded-xl bg-[#E5B842] p-4"
        disabled={loading}
        onPress={() =>
          onSubmit({ fullName, stageName, dob, age, gender, phone, email, password, city, height, weight, build, hairColor, eyeColor, languages, expLevel, formalTraining, trainingInstitute, prevWork, roleInterests, actorSkills, aboutSelf, mediaLinks, instagramLink, willingToTravel, role: 'actor' })
        }>
        {loading ? <ActivityIndicator color="#000" /> : <Text className="text-sm font-extrabold uppercase tracking-wider text-black">Register as Actor / Performer</Text>}
      </TouchableOpacity>
    </>
  );
}

// ---------- COMPANY / CLIENT FORM ----------
function CompanyForm({ onSubmit, loading }: { onSubmit: (data: any) => void; loading: boolean }) {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [designation, setDesignation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [industry, setIndustry] = useState('');
  const [city, setCity] = useState('');
  const [website, setWebsite] = useState('');
  const [requiredServices, setRequiredServices] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [hearAboutUs, setHearAboutUs] = useState('');

  return (
    <>
      <SectionLabel>A. Company Information</SectionLabel>
      <Field label="Company / Organization Name *"><Input placeholder="Registered company name" value={companyName} onChangeText={setCompanyName} /></Field>
      <Field label="Contact Person Name *"><Input placeholder="Your full name" value={contactPerson} onChangeText={setContactPerson} /></Field>
      <Field label="Designation / Role"><Input placeholder="e.g. Marketing Manager, CEO" value={designation} onChangeText={setDesignation} /></Field>
      <Field label="Phone Number *"><Input placeholder="Phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} /></Field>
      <Field label="Email Address *"><Input placeholder="Official email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} /></Field>
      <Field label="Password *"><Input placeholder="Password (6+ characters)" secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword} /></Field>
      <Field label="Industry / Sector"><Input placeholder="e.g. E-Commerce, Healthcare, Education, Government" value={industry} onChangeText={setIndustry} /></Field>
      <Field label="City / Location"><Input placeholder="City" value={city} onChangeText={setCity} /></Field>
      <Field label="Website (optional)"><Input placeholder="https://yourcompany.com" autoCapitalize="none" value={website} onChangeText={setWebsite} /></Field>

      <SectionLabel>B. Project / Service Requirements</SectionLabel>
      <Field label="Services Required *">
        <TextInput
          className="min-h-[90px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
          placeholder="e.g. Social Media Management, Brand Film, Talent Sourcing, Training Programme..."
          placeholderTextColor="#52525b"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={requiredServices}
          onChangeText={setRequiredServices}
        />
      </Field>
      <Field label="Project Brief / Overview *">
        <TextInput
          className="min-h-[120px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
          placeholder="Describe your project, objectives, target audience, and expected outcomes..."
          placeholderTextColor="#52525b"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={projectBrief}
          onChangeText={setProjectBrief}
        />
      </Field>
      <Field label="Estimated Budget (INR)"><Input placeholder="e.g. ₹2,00,000 – ₹5,00,000" value={budget} onChangeText={setBudget} /></Field>
      <Field label="Expected Timeline"><Input placeholder="e.g. Start August 2025, 3-month project" value={timeline} onChangeText={setTimeline} /></Field>
      <Field label="How did you hear about us?"><Input placeholder="e.g. Social media, referral, Google" value={hearAboutUs} onChangeText={setHearAboutUs} /></Field>

      <View className="mt-2 mb-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <Text className="text-[10px] italic leading-relaxed text-zinc-500">
          I hereby declare that the information provided is true and accurate. I authorize YASHVI BAGGA PRODUCTIONS to contact us regarding suitable services and project collaborations.
        </Text>
      </View>

      <TouchableOpacity
        className="mt-2 flex-row items-center justify-center rounded-xl bg-[#E5B842] p-4"
        disabled={loading}
        onPress={() =>
          onSubmit({ companyName, contactPerson, designation, phone, email, password, industry, city, website, requiredServices, projectBrief, budget, timeline, hearAboutUs, role: 'company' })
        }>
        {loading ? <ActivityIndicator color="#000" /> : <Text className="text-sm font-extrabold uppercase tracking-wider text-black">Register as Company / Client</Text>}
      </TouchableOpacity>
    </>
  );
}

// ---------- MAIN REGISTER SCREEN ----------
export default function RegisterScreen() {
  const router = useRouter();
  const [formType, setFormType] = useState<FormType>('actor');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: any) => {
    if (!data.email || !data.password || ((!data.fullName && !data.companyName))) {
      Alert.alert('Incomplete Form', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email.trim(), data.password);
      const user = userCredential.user;
      const { password: _, ...profileData } = data;

      const payload = {
        uid: user.uid,
        email: data.email.trim(),
        createdAt: new Date().toISOString(),
        ...profileData,
      };

      await setDoc(doc(firestore, 'users', user.uid), payload);
      await setDoc(doc(firestore, `registrations_${data.role}`, user.uid), payload);

      Alert.alert('Registration Successful!', 'Your profile has been submitted. Our team will be in touch.');
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-zinc-950"
      contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}>
      <View className="px-6 pb-4 pt-14">
        <Text className="text-2xl font-black text-white">Join YB Productions</Text>
        <Text className="mt-1 text-xs text-zinc-400">Select your profile type to get started</Text>
      </View>

      {/* Form Type Selector */}
      <View className="mx-6 mb-2 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="p-1">
          <View className="flex-row gap-1">
            {[
              { key: 'actor', label: 'Actor / Performer', icon: Film },
              { key: 'talent', label: 'Media Professional', icon: User },
              { key: 'company', label: 'Company / Client', icon: Briefcase },
            ].map(({ key, label, icon: Icon }) => (
              <TouchableOpacity
                key={key}
                onPress={() => setFormType(key as FormType)}
                className={`flex-row items-center gap-2 rounded-lg px-4 py-2.5 ${formType === key ? 'bg-[#E5B842]' : ''}`}>
                <Icon color={formType === key ? '#000' : '#71717a'} size={14} />
                <Text className={`text-xs font-bold ${formType === key ? 'text-black' : 'text-zinc-400'}`}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="px-6">
        {formType === 'actor' && <ActorForm onSubmit={handleRegister} loading={loading} />}
        {formType === 'talent' && <MediaProfessionalForm onSubmit={handleRegister} loading={loading} />}
        {formType === 'company' && <CompanyForm onSubmit={handleRegister} loading={loading} />}

        <TouchableOpacity
          className="mt-6 items-center"
          onPress={() => router.push('/(auth)/login')}>
          <Text className="text-xs text-zinc-500">
            Already have an account?{' '}
            <Text className="font-bold text-[#E5B842]">Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}