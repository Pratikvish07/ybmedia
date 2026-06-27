import { Alert, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Briefcase, ClipboardList, Film, Home, Layers, LogOut } from 'lucide-react-native';

import { auth } from '../../config/firebase';

export default function TabsLayout() {
  const triggerSessionTermination = () => {
    Alert.alert('Session Interruption', 'Terminate cryptographic security state context loop?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Terminate', style: 'destructive', onPress: () => signOut(auth) },
    ]);
  };

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#09090b',
          borderBottomWidth: 1,
          borderBottomColor: '#27272a',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontWeight: '900',
          fontSize: 14,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        },
        tabBarStyle: {
          backgroundColor: '#09090b',
          borderTopWidth: 1,
          borderTopColor: '#27272a',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#E5B842',
        tabBarInactiveTintColor: '#71717a',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
        headerRight: () => (
          <TouchableOpacity className="mr-4 p-1" onPress={triggerSessionTermination}>
            <LogOut color="#EF4444" size={18} />
          </TouchableOpacity>
        ),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="pillars"
        options={{
          title: 'Pillars',
          tabBarIcon: ({ color }) => <Layers color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: 'Services',
          tabBarIcon: ({ color }) => <Briefcase color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color }) => <Film color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="requirement"
        options={{
          title: 'Requirement',
          tabBarIcon: ({ color }) => <ClipboardList color={color} size={20} />,
        }}
      />
    </Tabs>
  );
}
