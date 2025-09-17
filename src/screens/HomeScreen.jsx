import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Bell, Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const CATEGORIES = ['All', 'Politics', 'Science', 'Sport', 'Entertainment', 'Technology', 'Medical'];
const API_BASE = 'https://newsdata.io/api/1/news?apikey=pub_d694d4797fb94d148943dfe07bba279d&country=in&language=en&image=1';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [breakingNews, setBreakingNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef(null);

  const { colors, isDarkMode } = useTheme();

  const fetchNews = async () => {
    try {
      const categoryParam = selectedCategory !== 'All' ? `&category=${selectedCategory.toLowerCase()}` : '';
      const queryParam = query.length > 1 ? `&q=${encodeURIComponent(query)}` : '';

      const res = await fetch(`${API_BASE}${categoryParam}${queryParam}`);
      const json = await res.json();

      const rawResults = (json?.results || []).filter(item => item.image_url && item.title);

      const uniqueNews = rawResults.filter(
        (v, i, a) => a.findIndex(t => t.title === v.title) === i
      );

      const breaking = uniqueNews.slice(0, 5);
      const trending = uniqueNews.filter(item => !breaking.some(b => b.title === item.title)).slice(0, 20);

      setBreakingNews(breaking);
      setTrendingNews(trending);
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, query]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  const handleSearchChange = (text) => {
    setQuery(text);
  };

  const handleMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / (width - 32));
    setCurrentSlide(newIndex);
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => navigation.navigate('DetailsNewsScreen', { news: item })}
    >
      <Image source={{ uri: item.image_url }} style={styles.newsImage} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={[styles.newsCategory, { color: colors.accent }]}>
          {item.category?.[0] || 'Top'}
        </Text>
        <Text style={[styles.newsTitle, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.newsSource, { color: colors.subtitle }]}>{item.source_id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Search & Bell */}
      <View style={styles.searchRow}>
        <View style={[styles.searchBox, { backgroundColor: isDarkMode ? '#333' : '#F0F0F5' }]}>
          <Search size={18} color={colors.subtitle} />
          <TextInput
            placeholder="Search"
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={colors.subtitle}
            value={query}
            onChangeText={handleSearchChange}
          />
        </View>
        <TouchableOpacity
          style={[styles.bellIcon, { backgroundColor: isDarkMode ? '#333' : '#F5F5F5' }]}
          onPress={() => navigation.navigate('NotificationScreen')}
        >
          <Bell size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Breaking News */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Breaking News</Text>
      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.carousel}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {(breakingNews.length > 0 ? breakingNews : new Array(5).fill({})).map((item, index) => (
          <View key={index} style={styles.carouselCard}>
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.carouselImage} />
            ) : (
              <View style={[styles.carouselImage, { backgroundColor: '#ddd' }]} />
            )}
            <View style={styles.carouselTextContainer}>
              <Text style={styles.carouselSource}>{item.source_id || 'Loading...'}</Text>
              <Text style={styles.carouselHeadline} numberOfLines={2}>
                {item.title || '...'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Dot Indicators */}
      <View style={styles.dotContainer}>
        {[...Array(5).keys()].map((i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: currentSlide % 5 === i ? colors.accent : '#999' },
            ]}
          />
        ))}
      </View>

      {/* Categories */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Trending Right Now</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                {
                  borderColor: isDarkMode ? '#555' : '#ddd',
                  backgroundColor: selectedCategory === cat ? colors.accent : 'transparent',
                },
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={{
                  color:
                    selectedCategory === cat
                      ? '#fff'
                      : isDarkMode
                      ? '#ccc'
                      : '#333',
                  fontWeight: selectedCategory === cat ? '600' : '400',
                  fontSize: 14,
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* News List */}
      {trendingNews.length === 0 ? (
        <ActivityIndicator size="large" color={colors.accent} />
      ) : (
        <FlatList
          data={trendingNews}
          keyExtractor={(item, index) => item.title + index}
          renderItem={renderNewsItem}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    flex: 1,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
  bellIcon: {
    marginLeft: 12,
    padding: 8,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 16,
  },
  carousel: { height: 200 },
  carouselCard: {
    width: width - 32,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 10,
  },
  carouselImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  carouselTextContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
  },
  carouselSource: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  carouselHeadline: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    fontWeight: 'bold',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  newsImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  newsCategory: {
    fontSize: 12,
    marginBottom: 2,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  newsSource: {
    fontSize: 12,
    marginTop: 4,
  },
});
