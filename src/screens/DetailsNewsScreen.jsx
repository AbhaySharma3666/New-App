import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

export default function DetailsNewsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { news } = route.params;
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    checkIfSaved();
  }, []);

  const checkIfSaved = async () => {
    const savedItems = await AsyncStorage.getItem('savedNews');
    const parsed = savedItems ? JSON.parse(savedItems) : [];
    const exists = parsed.some(item => item.title === news.title);
    setSaved(exists);
  };

  const toggleSaveNews = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('savedNews');
      const parsed = savedItems ? JSON.parse(savedItems) : [];
      const exists = parsed.some(item => item.title === news.title);

      if (exists) {
        const updated = parsed.filter(item => item.title !== news.title);
        await AsyncStorage.setItem('savedNews', JSON.stringify(updated));
        setSaved(false);
        showToast('Removed from bookmarks');
      } else {
        const newSaved = [...parsed, news];
        await AsyncStorage.setItem('savedNews', JSON.stringify(newSaved));
        setSaved(true);
        showToast('Saved to bookmarks');
      }
    } catch (err) {
      showToast('Action failed');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${news.title}\n\n${news.link || news.image_url || ''}`,
      });
    } catch (error) {
      showToast('Failed to share');
    }
  };

  const showToast = (message) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <ArrowLeft size={22} color="#000" />
        </TouchableOpacity>
        <View style={styles.rightButtons}>
          <TouchableOpacity onPress={handleShare} style={styles.iconBtn}>
            <Share2 size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSaveNews} style={styles.iconBtn}>
            <Bookmark size={22} color={saved ? '#FF3B30' : '#000'} />
          </TouchableOpacity>
        </View>
      </View>

      {news.image_url && (
        <Image source={{ uri: news.image_url }} style={styles.image} />
      )}

      <Text style={styles.title}>{news.title}</Text>
      <Text style={styles.source}>{news.source_id}</Text>
      <Text style={styles.date}>
        {new Date(news.pubDate).toLocaleDateString()}{' '}
        {new Date(news.pubDate).toLocaleTimeString()}
      </Text>
      <Text style={styles.description}>
        {news.description || 'No description available.'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    padding: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginLeft: 8,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  source: {
    fontSize: 14,
    color: '#FF3B30',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#777',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
});
