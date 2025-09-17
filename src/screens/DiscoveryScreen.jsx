import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, Filter, Tag } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext'; // ⬅️ Import Theme Context

const DiscoveryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme(); // ⬅️ Access theme

  const categories = [
    { id: 1, name: 'Technology', color: '#007AFF', count: 156 },
    { id: 2, name: 'Business', color: '#FF9500', count: 89 },
    { id: 3, name: 'Sports', color: '#34C759', count: 203 },
    { id: 4, name: 'Entertainment', color: '#FF3B30', count: 124 },
    { id: 5, name: 'Health', color: '#5856D6', count: 67 },
    { id: 6, name: 'Science', color: '#00C7BE', count: 91 },
  ];

  const trendingTopics = [
    'AI Revolution',
    'Climate Action',
    'Space Exploration',
    'Cryptocurrency',
    'Renewable Energy',
    'Mental Health',
  ];

  const CategoryCard = ({ category }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        {
          borderColor: category.color,
          backgroundColor: colors.card,
          shadowColor: isDarkMode ? 'transparent' : '#000',
        },
      ]}
      onPress={() =>
        navigation.navigate('ListScreen', {
          type: 'category',
          value: category.name,
        })
      }
    >
      <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
        <Tag size={20} color="#FFFFFF" />
      </View>
      <Text style={[styles.categoryName, { color: colors.text }]}>
        {category.name}
      </Text>
      <Text style={[styles.categoryCount, { color: colors.subtitle }]}>
        {category.count} articles
      </Text>
    </TouchableOpacity>
  );

  const TrendingChip = ({ topic }) => (
    <TouchableOpacity
      style={[
        styles.trendingChip,
        { backgroundColor: isDarkMode ? '#333' : '#F2F2F7' },
      ]}
      onPress={() =>
        navigation.navigate('ListScreen', {
          type: 'search',
          value: topic,
        })
      }
    >
      <Text style={[styles.trendingText, { color: colors.accent }]}>
        #{topic}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: isDarkMode ? '#333' : '#E5E5EA',
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Discover
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.subtitle }]}>
          Explore topics that interest you
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Section */}
        <View
          style={[
            styles.searchSection,
            { backgroundColor: colors.card },
          ]}
        >
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: isDarkMode ? '#333' : '#F2F2F7',
              },
            ]}
          >
            <Search
              size={20}
              color={isDarkMode ? '#bbb' : '#8E8E93'}
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search news, topics, sources..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => {
                if (searchQuery.trim()) {
                  navigation.navigate('ListScreen', {
                    type: 'search',
                    value: searchQuery.trim(),
                  });
                }
              }}
              placeholderTextColor={isDarkMode ? '#888' : '#8E8E93'}
            />
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color={colors.accent} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Categories
          </Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </View>
        </View>

        {/* Trending Topics */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Trending Topics
          </Text>
          <View style={styles.trendingContainer}>
            {trendingTopics.map((topic, index) => (
              <TrendingChip key={index} topic={topic} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  scrollView: { flex: 1 },
  searchSection: {
    padding: 15,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    padding: 5,
  },
  section: {
    padding: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  categoryCount: {
    fontSize: 12,
  },
  trendingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  trendingChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  trendingText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default DiscoveryScreen;
