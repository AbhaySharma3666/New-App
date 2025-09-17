import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext'; // 🟡 Add this

const API_KEY = 'pub_d694d4797fb94d148943dfe07bba279d';
const BASE_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en&image=1`;

export default function ListScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { type, value } = route.params;
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { colors, isDarkMode } = useTheme(); // 🟡 Dark mode context
  const styles = getStyles(colors, isDarkMode); // 🟡 Use dynamic styles

  const fetchNews = async () => {
    try {
      let url = BASE_URL;
      if (type === 'search') {
        url += `&q=${encodeURIComponent(value)}`;
      } else if (type === 'category') {
        url += `&category=${value.toLowerCase()}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      const results = (json?.results || []).filter(
        item => item.image_url && item.title
      );

      const unique = results.filter(
        (v, i, a) => a.findIndex(t => t.title === v.title) === i
      );

      setNewsList(unique);
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [type, value]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => navigation.navigate('DetailsNewsScreen', { news: item })}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.category}>{item.category?.[0] || 'Top'}</Text>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.source}>{item.source_id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {type === 'search' ? `Search: "${value}"` : `Category: ${value}`}
        </Text>
      </View>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={newsList}
          keyExtractor={(item, index) => item.title + index}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}


const getStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    backButton: {
      padding: 6,
      backgroundColor: isDarkMode ? '#333' : '#F1F1F1',
      borderRadius: 8,
      marginRight: 12,
    },
    headerText: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      flexShrink: 1,
    },
    newsItem: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    category: {
      fontSize: 12,
      color: colors.accent,
    },
    title: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    source: {
      fontSize: 12,
      color: colors.subtitle,
      marginTop: 4,
    },
  });

