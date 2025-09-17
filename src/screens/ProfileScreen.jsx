import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ArrowLeft, Edit, Mail, Phone } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    avatar: 'https://i.pravatar.cc/150?img=12',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: isDarkMode ? '#333' : '#eee' }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.editIcon}>
            <Edit size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Name */}
        <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>

        {/* Email */}
        <View style={styles.infoRow}>
          <Mail size={18} color={colors.accent} style={styles.icon} />
          <Text style={[styles.infoText, { color: colors.text }]}>{user.email}</Text>
        </View>

        {/* Phone */}
        <View style={styles.infoRow}>
          <Phone size={18} color={colors.accent} style={styles.icon} />
          <Text style={[styles.infoText, { color: colors.text }]}>{user.phone}</Text>
        </View>

        {/* Edit Button */}
        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.accent }]}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    padding: 6,
    borderRadius: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
  },
  editButton: {
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
