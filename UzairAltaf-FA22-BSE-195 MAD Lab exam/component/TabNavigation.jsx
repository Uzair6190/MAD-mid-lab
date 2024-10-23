import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const NavigationTabs = () => {
  return (
    <View style={tw`flex-row justify-around items-center mt-4 border-b border-gray-300 mb-5`}>
      {/* Surah Tab */}
      <View style={tw`items-center`}>
        <Text style={tw`text-purple-700 font-bold`}>Surah</Text>
        <View style={tw`w-full h-1 bg-purple-700 mt-1`} />
      </View>

      {/* Para Tab */}
      <View style={tw`items-center`}>
        <Text style={tw`text-gray-600`}>Para</Text>
      </View>

      {/* Page Tab */}
      <View style={tw`items-center`}>
        <Text style={tw`text-gray-600`}>Page</Text>
      </View>

      {/* Hijb Tab */}
      <View style={tw`items-center`}>
        <Text style={tw`text-gray-600`}>Hijb</Text>
      </View>
    </View>
  );
};

export default NavigationTabs;
