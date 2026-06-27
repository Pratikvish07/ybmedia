import { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LogIn } from 'lucide-react-native';

import { auth } from '../../config/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please completely fill out all credential inputs.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Authentication Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center bg-zinc-950 p-6">
      <View className="mb-8 items-center">
        <Text className="text-3xl font-extrabold tracking-tight text-white">Welcome Back</Text>
        <Text className="mt-2 text-sm text-zinc-400">
          Sign in to sync profiles and portfolio assets
        </Text>
      </View>

      <View>
        <View>
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Email Address
          </Text>
          <TextInput
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white focus:border-[#E5B842]"
            placeholder="enter your account email"
            placeholderTextColor="#52525b"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View className="mt-4">
          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Password
          </Text>
          <TextInput
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-white focus:border-[#E5B842]"
            placeholder="password"
            placeholderTextColor="#52525b"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          className="mt-6 flex-row items-center justify-center rounded-xl bg-[#E5B842] p-4 shadow-lg shadow-[#E5B842]/20"
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <>
              <LogIn color="#000" size={20} />
              <Text className="ml-2 text-center text-base font-bold text-black">Sign In</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View className="mt-8 flex-row justify-center">
        <Text className="text-zinc-500">New to the platform? </Text>
        <Link href="/(auth)/register" asChild>
          <TouchableOpacity>
            <Text className="font-semibold text-[#E5B842]">Create account</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
