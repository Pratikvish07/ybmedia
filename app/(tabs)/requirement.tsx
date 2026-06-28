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
import { addDoc, collection } from 'firebase/firestore';
import { Send } from 'lucide-react-native';

import { auth, firestore } from '../../config/firebase';

export default function RequirementScreen() {
  const [projectName, setProjectName] = useState('');
  const [brief, setBrief] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePipelineSubmission = async () => {
    if (!auth) {
      Alert.alert('Firebase Error', 'Auth instance is not available.');
      return;
    }

    if (!firestore) {
      Alert.alert('Firebase Error', 'Firestore instance is not available.');
      return;
    }

    if (!projectName || !brief) {
      Alert.alert('Incomplete Form', 'Please provide a project name and a brief overview.');
      return;
    }

    setLoading(true);
    try {
      const designRequirementPayload = {
        userId: auth.currentUser?.uid,
        userEmail: auth.currentUser?.email,
        projectName: projectName.trim(),
        brief: brief.trim(),
        budgetRange: budgetRange.trim(),
        status: 'pending_review',
        timestamp: new Date().toISOString(),
      };

      await addDoc(collection(firestore, 'production_requirements'), designRequirementPayload);

      Alert.alert(
        'Transmission Authenticated',
        'Project brief committed to real-time administrative pipeline channels.'
      );
      setProjectName('');
      setBrief('');
      setBudgetRange('');
    } catch (error: any) {
      Alert.alert('Transmission Failure', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-zinc-950 p-6">
      <View className="mb-6">
        <Text className="text-xl font-black uppercase tracking-wider text-white">
          Project Dispatch Tunnel
        </Text>
        <Text className="mt-1 text-xs text-zinc-400">
          Submit creative design and production requirements to administration.
        </Text>
      </View>

      <View>
        <View className="mb-3">
          <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            Project Classification Label
          </Text>
          <TextInput
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white focus:border-[#E5B842]"
            placeholder="e.g. Winter Brand Campaign TVC"
            placeholderTextColor="#52525b"
            value={projectName}
            onChangeText={setProjectName}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            Production Brief / Scope Parameters
          </Text>
          <TextInput
            className="min-h-[120px] rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white focus:border-[#E5B842]"
            placeholder="Outline cast parameters, locations, schedules, and specific role needs..."
            placeholderTextColor="#52525b"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={brief}
            onChangeText={setBrief}
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            Allocated Budget Scope
          </Text>
          <TextInput
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white focus:border-[#E5B842]"
            placeholder="Estimated Budget in INR / USD"
            placeholderTextColor="#52525b"
            value={budgetRange}
            onChangeText={setBudgetRange}
          />
        </View>

        <TouchableOpacity
          className="mt-4 flex-row items-center justify-center rounded-xl bg-[#E5B842] p-4 shadow-lg"
          onPress={handlePipelineSubmission}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <Send color="#000" size={16} />
              <Text className="ml-2 text-center text-xs font-extrabold uppercase tracking-wider text-black">
                Dispatch to Admin Dashboard
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
