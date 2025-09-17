
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {Home, Compass, Bookmark, Settings} from 'lucide-react-native'
import HomeScreen from '../screens/HomeScreen';
import DiscoveryScreen from '../screens/DiscoveryScreen';
import SaveScreen from '../screens/SaveScreen';
import SettingScreen from '../screens/SettingScreen';


const Tab = createBottomTabNavigator(); 

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({focused, color, size}) => {
          let IconComponent;

          if (route.name === 'Home') {
            IconComponent = Home;
          } else if (route.name === 'Discovery') {
            IconComponent = Compass;
          } else if (route.name === 'Saved') {
            IconComponent = Bookmark;
          } else if (route.name === 'Settings') {
            IconComponent = Settings;
          }

          return <IconComponent size={size} color={color} />
        },
        tabBarActiveTintColor: 'rgb(254, 0, 0)',
        tabBarInactiveTintColor: 'rgb(61, 61, 61)',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          height: 65,
          paddingBottom: 12,
          paddingTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discovery" component={DiscoveryScreen} />
      <Tab.Screen name="Saved" component={SaveScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />

    </Tab.Navigator>
  )
}

export default AppNavigator;