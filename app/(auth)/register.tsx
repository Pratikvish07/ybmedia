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
import { Building2, User } from 'lucide-react-native';

import { auth, firestore } from '../../config/firebase';

export default function RegisterScreen() {
  const router = useRouter();
  const [formType, setFormType] = useState<'talent' | 'company'>('talent');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const [stageName, setStageName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('Fresher');

  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [requiredServices, setRequiredServices] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !fullName || !phone) {
      Alert.alert('Incomplete Form', 'Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      const profilePayload = {
        uid: user.uid,
        email: email.trim(),
        fullName,
        phone,
        role: formType,
        createdAt: new Date().toISOString(),
        ...(formType === 'talent'
          ? {
              stageName,
              age,
              gender,
              height,
              skills,
              experience,
            }
          : {
              companyName,
              industry,
              requiredServices,
            }),
      };

      await setDoc(doc(firestore, 'users', user.uid), profilePayload);
      await setDoc(doc(firestore, `registrations_${formType}`, user.uid), profilePayload);

      Alert.alert('Success', 'Profile deployed to global state node registry.');
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Registration Failure', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-zinc-950 p-6" contentContainerStyle={{ paddingBottom: 60 }}>
      <View className="mb-6 mt-8 items-center">
        <Text className="text-2xl font-black text-white">Join Production Hub</Text>
        <Text className="mt-1 text-center text-xs text-zinc-400">
          Select profile type to calibrate operational framework
        </Text>
      </View>

      <View className="mb-6 flex-row rounded-xl border border-zinc-800 bg-zinc-900 p-1">
        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center rounded-lg py-3 ${
            formType === 'talent' ? 'bg-[#E5B842]' : ''
          }`}
          onPress={() => setFormType('talent')}>
          <User color={formType === 'talent' ? '#000' : '#71717a'} size={16} />
          <Text
            className={`ml-2 text-xs font-bold uppercase tracking-wider ${
              formType === 'talent' ? 'text-black' : 'text-zinc-400'
            }`}>
            Talent Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center rounded-lg py-3 ${
            formType === 'company' ? 'bg-[#E5B842]' : ''
          }`}
          onPress={() => setFormType('company')}>
          <Building2 color={formType === 'company' ? '#000' : '#71717a'} size={16} />
          <Text
            className={`ml-2 text-xs font-bold uppercase tracking-wider ${
              formType === 'company' ? 'text-black' : 'text-zinc-400'
            }`}>
            Company Client
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text className="mb-3 border-b border-zinc-800 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
          Core Credentials
        </Text>

        <TextInput
          placeholder="Full Legal Name"
          placeholderTextColor="#52525b"
          className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Direct Access Phone Number"
          placeholderTextColor="#52525b"
          className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          placeholder="Corporate Communication Email"
          placeholderTextColor="#52525b"
          className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Secure Account Password (6+ characters)"
          placeholderTextColor="#52525b"
          className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />

        {formType === 'talent' && (
          <View>
            <Text className="mb-4 border-b border-zinc-800 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Physical & Artistic Metrics
            </Text>
            <TextInput
              placeholder="Stage Name (Optional)"
              placeholderTextColor="#52525b"
              className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
              value={stageName}
              onChangeText={setStageName}
            />
            <View className="mb-3 flex-row gap-3">
              <TextInput
                placeholder="Age"
                placeholderTextColor="#52525b"
                className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
              <TextInput
                placeholder="Gender"
                placeholderTextColor="#52525b"
                className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
                value={gender}
                onChangeText={setGender}
              />
            </View>
            <TextInput
              placeholder={'Height (e.g. 5\'10")'}
              placeholderTextColor="#52525b"
              className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
              value={height}
              onChangeText={setHeight}
            />
            <TextInput
              placeholder="Experience Level (e.g. 1-3 Years)"
              placeholderTextColor="#52525b"
              className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
              value={experience}
              onChangeText={setExperience}
            />
            <TextInput
              placeholder="Special Skills (e.g. Singing, Dialects)"
              placeholderTextColor="#52525b"
              className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
              value={skills}
              onChangeText={setSkills}
            />
          </View>
        )}

        {formType === 'company' && (
          <View>
            <Text className="mb-4 border-b border-zinc-800 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Corporate Metadata
            </Text>
            <TextInput
              placeholder="Registered Enterprise/Company Name"
              placeholderTextColor="#52525b"
              className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
              value={companyName}
              onChangeText={setCompanyName}
            />
            <TextInput
              placeholder="Industry Verticals (e.g., E-Commerce, OTT)"
              placeholderTextColor="#52525b"
              className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
              value={industry}
              onChangeText={setIndustry}
            />
            <TextInput
              placeholder="Primary Production Services Needed"
              placeholderTextColor="#52525b"
              className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white"
              value={requiredServices}
              onChangeText={setRequiredServices}
            />
          </View>
        )}

        <TouchableOpacity
          className="mt-6 flex-row items-center justify-center rounded-xl bg-[#E5B842] p-4 shadow-lg"
          onPress={handleRegister}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text className="text-center text-sm font-extrabold uppercase tracking-wider text-black">
              Initialize Node Integration
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
