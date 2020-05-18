import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, View } from 'react-native';

import { isWeb, styleForPlatform } from '../utils/platform';

import GramInput from '../components/GramInput';
import Slider from '../components/Slider';

const TOTAL_FLOUR = 'Total flour';
const WHOLE_WHEAT = 'Whole wheat';
const WATER = 'Water';
const STARTER = 'Starter';
const SALT = 'Salt';

const DEFAULT_INGREDIENTS = {
  [TOTAL_FLOUR]: {
    percent: 100,
    gram: 300,
  },
  [WHOLE_WHEAT]: {
    percent: 15,
  },
  [WATER]: {
    percent: 75,
  },
  [STARTER]: {
    percent: 15,
  },
  [SALT]: {
    percent: 3,
  }
};

const calculateBakerRatio = (ingredients) => {
  const { percent: totalPercent, gram: totalGram } = ingredients[TOTAL_FLOUR];

  return Object.keys(ingredients).map(key => {
    if (key === TOTAL_FLOUR) {
      return {
        title: TOTAL_FLOUR,
        percent: totalPercent,
        gram: totalGram,
      }
    }

    let { percent, gram } = ingredients[key];
    if (!percent && !gram) {
      return {
        title: key,
        percent: 0,
        gram: 0
      }
    }

    if (!percent) {
      percent = Number(((gram / totalGram) * totalPercent).toFixed(1));
    }

    if (!gram) {
      gram = Number(((percent / totalPercent) * totalGram).toFixed(1));
    }

    return {
      title: key,
      percent,
      gram,
    }
  });
}

export default function App() {
  const bakerRatio = calculateBakerRatio(DEFAULT_INGREDIENTS);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {bakerRatio.map(({ title, percent, gram }) => (
          <GramInput key={title} title={title} percentValue={percent} gramValue={gram} />
        ))}
        <Slider defaultValue={300} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: isWeb ? 40 : 60,
    ...styleForPlatform({
      mobile: {
        marginHorizontal: 20,
      },
      web: {
        marginTop: 40,
        alignItems: 'center'
      }
    })
  },
});
