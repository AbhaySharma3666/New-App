import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { ArrowLeft, Bell, Trash } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const API_URL =
  'https://newsdata.io/api/1/news?apikey=pub_d694d4797fb94d148943dfe07bba279d&country=in&language=en&image=1';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      const data = json?.results || [];

      const formatted = data.map((item, index) => ({
        id: index.toString(),
        title: item.title || 'News Update',
        message: item.description || 'No description available.',
        time: new Date(item.pubDate).toLocaleTimeString(),
      }));

      setNotifications(formatted);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch notifications');
    }
  };

  const deleteNotification = (id) => {
    const filtered = notifications.filter((item) => item.id !== id);
    setNotifications(filtered);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.notificationCard,
        { backgroundColor: isDarkMode ? '#1c1c1e' : '#F8F8F8' },
      ]}
    >
      <Bell size={20} color={colors.accent} style={{ marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.message, { color: colors.subtitle }]}>{item.message}</Text>
        <Text style={[styles.time, { color: colors.subtitle }]}>{item.time}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteNotification(item.id)} style={styles.deleteButton}>
        <Trash size={18} color={colors.subtitle} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          { backgroundColor: colors.card, borderBottomColor: isDarkMode ? '#444' : '#eee' },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  message: {
    fontSize: 14,
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    marginTop: 6,
  },
  deleteButton: {
    paddingLeft: 8,
    paddingVertical: 4,
  },
});
