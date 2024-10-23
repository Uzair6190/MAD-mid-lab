import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

const useFetchQuran = () => {
  const [quranInfo, setQuranInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getQuranData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('quranData');
        if (savedData) {
          setQuranInfo(JSON.parse(savedData));
          setIsLoading(false);
        } else {
          const response = await fetch('https://api.alquran.cloud/v1/quran/en.asad');
          const result = await response.json();
          await AsyncStorage.setItem('quranData', JSON.stringify(result.data));
          setQuranInfo(result.data);
          setIsLoading(false);
        }
      } catch (error) {
        setFetchError('Failed to load Quran data');
        setIsLoading(false);
      }
    };

    getQuranData();
  }, []);

  return { quranInfo, isLoading, fetchError };
};

const QuranAppUI = () => {
  const { quranInfo, isLoading, fetchError } = useFetchQuran();
  const [openSurah, setOpenSurah] = useState(null);

  const toggleSurahDetails = (surahName) => {
    setOpenSurah(openSurah === surahName ? null : surahName);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="purple" />;
  }

  if (fetchError) {
    return <Text style={tw`text-red-500`}>{fetchError}</Text>;
  }

  return (
    <View style={tw`flex-1 bg-purple-100 p-4`}>
      <View style={tw`flex-row justify-between items-center mb-6`}>
        <Text style={tw`text-lg font-bold text-purple-800`}>Quran App</Text>
        <FontAwesome name="search" size={24} color="purple" />
      </View>

      <Text style={tw`text-lg font-semibold text-gray-800 mb-4`}>Asalamu-O-Alaikum</Text>
      <Text style={tw`text-2xl font-bold text-purple-900 mb-8`}>Tanvir Ahasan</Text>

      <View style={tw`bg-purple-200 rounded-lg p-4 mb-6 overflow-hidden shadow-lg`}>
        <Image 
          source={{ uri: 'https://i.pinimg.com/736x/81/94/7f/81947f27675dab378e9e73c7d988f659.jpg' }} 
          style={[tw`absolute bottom-[0.1] left-0 w-100 h-40`, { opacity: 0.6 }]}  
          resizeMode="cover" 
        />
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-sm text-purple-800`}>Last Read</Text>
        </View>
        <Text style={tw`text-lg font-bold text-purple-900 mt-2`}>Al-Fatihah</Text>
        <Text style={tw`text-sm text-purple-700`}>Ayah No: 1</Text>
      </View>

      <ScrollView>
        <View style={tw`flex-row justify-around items-center mt-4 border-b border-gray-300 mb-5`}>
          <View style={tw`items-center`}>
            <Text style={tw`text-purple-700 font-bold`}>Surah</Text>
            <View style={tw`w-full h-1 bg-purple-700 mt-1`} />
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`text-gray-600`}>Para</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`text-gray-600`}>Page</Text>
          </View>
          <View style={tw`items-center`}>
            <Text style={tw`text-gray-600`}>Hijb</Text>
          </View>
        </View>

        {quranInfo && quranInfo.surahs.map((surah) => (
          <TouchableOpacity key={surah.number} onPress={() => toggleSurahDetails(surah.englishName)} style={tw`bg-white rounded-lg p-4 mb-4 shadow-sm`}>
            <View style={tw`flex-row justify-between items-center`}>
              <View>
                <Text style={tw`text-lg font-semibold text-gray-800`}>{surah.englishName}</Text>
                <Text style={tw`text-sm text-gray-600`}>{surah.revelationType} - {surah.ayahs.length} Verses</Text>
              </View>
              <Text style={tw`text-purple-800 text-xl`}>{surah.name}</Text>
            </View>

            {openSurah === surah.englishName && (
              <View style={tw`mt-4`}>
                {surah.ayahs.map((ayah) => (
                  <Text key={ayah.number} style={tw`text-sm text-gray-800 mb-2`}>
                    {ayah.number}. {ayah.text}
                  </Text>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={tw`flex-row justify-around mt-auto bg-white py-4 shadow-sm`}>
        <FontAwesome name="home" size={24} color="purple" />
        <FontAwesome name="book" size={24} color="purple" />
        <FontAwesome name="bell" size={24} color="purple" />
      </View>
    </View>
  );
};

export default QuranAppUI;
