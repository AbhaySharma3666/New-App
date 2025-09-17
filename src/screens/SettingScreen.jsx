import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import {
  Settings,
  User,
  Bell,
  Moon,
  Globe,
  Shield,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Eye,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(true);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReadingMode, setIsReadingMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleReadingMode = () => setIsReadingMode(!isReadingMode);

  const colors = isDarkMode
    ? {
        background: '#1c1c1e',
        text: '#fff',
        subtitle: '#aaa',
        card: '#2c2c2e',
        accent: '#FF6B6B',
      }
    : {
        background: '#fff',
        text: '#000',
        subtitle: '#666',
        card: '#fff',
        accent: '#FF6B6B',
      };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => console.log('User logged out') },
    ]);
  };

  const handleProfilePress = () => navigation.navigate('ProfileScreen');

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    showSwitch,
    switchValue,
    onSwitchChange,
    showChevron = true,
    iconColor = '#FF6B6B',
  }) => (
    <TouchableOpacity
      style={[styles.settingItem, { backgroundColor: colors.card }]}
      onPress={onPress}
      disabled={showSwitch}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
          <Icon size={20} color={iconColor} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.settingSubtitle, { color: colors.subtitle }]}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {showSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: '#E5E5EA', true: colors.accent }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E5E5EA"
          />
        ) : (
          showChevron && <ChevronRight size={16} color="#C7C7CC" />
        )}
      </View>
    </TouchableOpacity>
  );

  const SettingSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.subtitle }]}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerContent}>
          <Settings size={28} color={colors.accent} />
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
            <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>Customize your experience</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <SettingSection title="PROFILE">
          <SettingItem
            icon={User}
            title="Profile"
            subtitle="Manage your account"
            onPress={handleProfilePress}
            iconColor="#007AFF"
          />
        </SettingSection>

        <SettingSection title="PREFERENCES">
          <SettingItem
            icon={Bell}
            title="Notifications"
            subtitle="Push notifications and alerts"
            showSwitch
            switchValue={notifications}
            onSwitchChange={setNotifications}
            iconColor="#FF9500"
          />
          <View style={styles.separator} />

          <SettingItem
            icon={Moon}
            title="Dark Mode"
            subtitle="Switch to dark theme"
            showSwitch
            switchValue={isDarkMode}
            onSwitchChange={toggleDarkMode}
            iconColor="#5856D6"
          />
          <View style={styles.separator} />

          <SettingItem
            icon={Globe}
            title="Language"
            subtitle="English"
            onPress={() => setLanguageModalVisible(true)}
            iconColor="#34C759"
          />
          <View style={styles.separator} />

          <SettingItem
            icon={Eye}
            title="Reading Mode"
            subtitle="Enhanced reading experience"
            showSwitch
            switchValue={isReadingMode}
            onSwitchChange={toggleReadingMode}
            iconColor="#FF2D92"
          />
        </SettingSection>

        <SettingSection title="SUPPORT">
          <SettingItem
            icon={Shield}
            title="Privacy & Security"
            subtitle="Manage your privacy settings"
            onPress={() => Alert.alert('Privacy & Security')}
            iconColor="#34C759"
          />
          <View style={styles.separator} />

          <SettingItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => Alert.alert('Help & Support')}
            iconColor="#007AFF"
          />
          <View style={styles.separator} />

          <SettingItem
            icon={Info}
            title="About"
            subtitle="App version and information"
            onPress={() => Alert.alert('NewsApp v1.0.0')}
            iconColor="#8E8E93"
          />
        </SettingSection>

        <SettingSection title="ACCOUNT">
          <SettingItem
            icon={LogOut}
            title="Logout"
            subtitle="Sign out of your account"
            onPress={handleLogout}
            showChevron={false}
            iconColor="#FF3B30"
          />
        </SettingSection>

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.subtitle }]}>NewsApp Version 1.0.0</Text>
          <Text style={[styles.versionSubtext, { color: colors.subtitle }]}>Built with React Native</Text>
        </View>
      </ScrollView>

      <Modal visible={languageModalVisible} transparent animationType="slide" onRequestClose={() => setLanguageModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {['English', 'Hindi', 'Spanish'].map(lang => (
              <TouchableOpacity key={lang} onPress={() => setLanguageModalVisible(false)}>
                <Text style={styles.modalOption}>{lang}</Text>
              </TouchableOpacity>
            ))}
            <Pressable onPress={() => setLanguageModalVisible(false)} style={{ marginTop: 15 }}>
              <Text style={{ color: 'red' }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  headerText: { marginLeft: 15 },
  headerTitle: { fontSize: 28, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 16, marginTop: 2 },
  scrollView: { flex: 1 },
  section: { marginTop: 35 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: 20,
    marginBottom: 8,
  },
  sectionContent: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 60,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: { flex: 1 },
  settingTitle: { fontSize: 16, fontWeight: '400', lineHeight: 20 },
  settingSubtitle: { fontSize: 13, marginTop: 2, lineHeight: 16 },
  settingRight: { alignItems: 'center', justifyContent: 'center' },
  separator: { height: 0.5, backgroundColor: '#E5E5EA', marginLeft: 60 },
  versionContainer: { alignItems: 'center', paddingVertical: 30 },
  versionText: { fontSize: 13, fontWeight: '500' },
  versionSubtext: { fontSize: 12, marginTop: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  modalOption: { fontSize: 16, paddingVertical: 8 },
});

export default SettingScreen;
