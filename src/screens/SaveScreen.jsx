import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Trash2 } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

export default function SaveScreen() {
  const [savedNews, setSavedNews] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    if (isFocused) {
      loadSavedNews();
    }
  }, [isFocused]);

  const loadSavedNews = async () => {
    try {
      const data = await AsyncStorage.getItem('savedNews');
      if (data) {
        setSavedNews(JSON.parse(data));
      } else {
        setSavedNews([]);
      }
    } catch (err) {
      console.error('Failed to load saved news:', err);
    }
  };

  const deleteNewsItem = async (title) => {
    const filtered = savedNews.filter(item => item.title !== title);
    setSavedNews(filtered);
    await AsyncStorage.setItem('savedNews', JSON.stringify(filtered));
  };

  const renderItem = ({ item }) => (
    <View style={styles.newsItem}>
      <TouchableOpacity
        style={{ flexDirection: 'row', flex: 1 }}
        onPress={() => navigation.navigate('DetailsNewsScreen', { news: item })}
      >
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={[styles.category, { color: colors.accent }]}>
            {item.category?.[0] || 'Top'}
          </Text>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.source, { color: colors.subtitle }]}>
            {item.source_id}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => deleteNewsItem(item.title)}
        style={[
          styles.deleteBtn,
          { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' },
        ]}
      >
        <Trash2 size={20} color={colors.accent} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Saved News</Text>
      {savedNews.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.subtitle }]}>
          No saved news yet.
        </Text>
      ) : (
        <FlatList
          data={savedNews}
          keyExtractor={(item, index) => item.title + index}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  category: {
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  source: {
    fontSize: 12,
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  deleteBtn: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 8,
  },
});
