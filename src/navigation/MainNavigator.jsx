// src/navigation/MainNavigator.jsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './TabsNavigator';
import NotificationScreen from '../screens/NotificationScreen';
import DetailsNewsScreen from '../screens/DetailsNewsScreen';
import SaveScreen from '../screens/SaveScreen';
import DiscoveryScreen from '../screens/DiscoveryScreen';
import ListScreen from '../screens/ListScreen.jsx';
import ProfileScreen from '../screens/ProfileScreen.jsx';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppNavigator} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="DetailsNewsScreen" component={DetailsNewsScreen} />
      <Stack.Screen name="SaveScreen" component={SaveScreen} />
      <Stack.Screen name="DiscoveryScreen" component={DiscoveryScreen} />
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
    </Stack.Navigator>
  );
}
