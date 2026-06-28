import { useEffect, useState, createContext, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';

import '../global.css';
import { auth } from '../config/firebase';

const AuthContext = createContext<{ user: User | null; initialized: boolean; isGuest: boolean }>({
  user: null,
  initialized: false,
  isGuest: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitialized(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    // If logged in and still on auth screens, send to home
    if (user && inAuthGroup) {
      router.replace('/(tabs)/home');
    }
    // Guests can freely access tabs — no forced redirect
  }, [user, initialized, segments, router]);

  if (!initialized) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#E5B842" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, initialized, isGuest: !user }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </AuthContext.Provider>
  );
}