import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import useAppState from 'react-native-appstate-hook';

import GramInput from '../components/GramInput';
import Slider from '../components/Slider';

import getBakerRatio, {
  TOTAL_FLOUR,
  getGramFromPercent,
  getPercentFromGram,
} from '../utils/bakerRatio';
import { isWeb, styleForPlatform } from '../utils/platform';

const STORAGE_KEY = 'sourdough_storage';

const WHOLE_WHEAT = 'Whole wheat flour';
const WATER = 'Water';
const STARTER = 'Starter';
const SALT = 'Salt';
const DEFAULT_INGREDIENTS = {
  [TOTAL_FLOUR]: {
    id: TOTAL_FLOUR,
    percent: 100,
    gram: 400,
  },
  [WHOLE_WHEAT]: {
    id: WHOLE_WHEAT,
    percent: 15,
    gram: 60,
  },
  [WATER]: {
    id: WATER,
    percent: 75,
    gram: 300,
  },
  [STARTER]: {
    id: STARTER,
    percent: 15,
    gram: 60,
  },
  [SALT]: {
    id: SALT,
    percent: 3,
    gram: 12,
  },
};

export default function App() {
  // useState
  const [totalFlour, setTotalFlour] = useState(DEFAULT_INGREDIENTS[TOTAL_FLOUR]);
  const [wholeWheat, setWholeWheat] = useState(DEFAULT_INGREDIENTS[WHOLE_WHEAT]);
  const [water, setWater] = useState(DEFAULT_INGREDIENTS[WATER]);
  const [starter, setStarter] = useState(DEFAULT_INGREDIENTS[STARTER]);
  const [salt, setSalt] = useState(DEFAULT_INGREDIENTS[SALT]);

  useAppState({
    onChange: (newAppState) => console.warn('App state changed to ', newAppState),
    onForeground: () => {
      console.warn('App went to Foreground');
      AsyncStorage.getItem(STORAGE_KEY)
        .then((jsonString) => {
          ingredients = JSON.parse(jsonString);
          console.warn('setting state from storage', ingredients);
          setTotalFlour(ingredients[TOTAL_FLOUR]);
          setWholeWheat(ingredients[WHOLE_WHEAT]);
          setWater(ingredients[WATER]);
          setStarter(ingredients[STARTER]);
          setSalt(ingredients[SALT]);
        })
        .catch((e) => {
          console.warn('could not retrieve data', e);
        });
    },
    onBackground: () => {
      console.warn('App went to background');
      const data = JSON.stringify(getIngredients());
      AsyncStorage.setItem(STORAGE_KEY, data);
    },
  });

  const getIngredients = () => ({
    [totalFlour.id]: totalFlour,
    [wholeWheat.id]: wholeWheat,
    [water.id]: water,
    [starter.id]: starter,
    [salt.id]: salt,
  });

  // onChange events
  const onChangeTotalFlour = (totalValueGram) => {
    if (!totalValueGram) {
      totalValueGram = 0;
    }

    setTotalFlour({ ...totalFlour, gram: totalValueGram });
    const bakerRatio = getBakerRatio(getIngredients());

    setWholeWheat(bakerRatio[wholeWheat.id]);
    setWater(bakerRatio[water.id]);
    setStarter(bakerRatio[starter.id]);
    setSalt(bakerRatio[salt.id]);
  };

  const onChangeIngredient = (value, type, ingredientId) => {
    value = Number(value.replace('%', ''));

    let updatedType;
    let updatedValue;
    if (type === 'percent') {
      updatedType = 'gram';
      updatedValue = getGramFromPercent(value, totalFlour);
    } else if (type === 'gram') {
      updatedType = 'percent';
      updatedValue = getPercentFromGram(value, totalFlour);
    }

    const updatedIngredient = {
      id: ingredientId,
      [type]: value,
      [updatedType]: updatedValue,
    };

    switch (ingredientId) {
      case WHOLE_WHEAT:
        setWholeWheat(updatedIngredient);
        break;

      case WATER:
        setWater(updatedIngredient);
        break;

      case STARTER:
        setStarter(updatedIngredient);
        break;

      case SALT:
        setSalt(updatedIngredient);
        break;

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <GramInput
          editablePercent={false}
          title={totalFlour.id}
          percentValue={totalFlour.percent}
          gramValue={totalFlour.gram}
          onChange={onChangeTotalFlour}
        />
        <GramInput
          title={wholeWheat.id}
          percentValue={wholeWheat.percent}
          gramValue={wholeWheat.gram}
          onChange={onChangeIngredient}
        />
        <GramInput
          title={water.id}
          percentValue={water.percent}
          gramValue={water.gram}
          onChange={onChangeIngredient}
        />
        <GramInput
          title={starter.id}
          percentValue={starter.percent}
          gramValue={starter.gram}
          onChange={onChangeIngredient}
        />
        <GramInput
          title={salt.id}
          percentValue={salt.percent}
          gramValue={salt.gram}
          onChange={onChangeIngredient}
        />
      </ScrollView>
      <Slider
        style={styles.slider}
        defaultValue={300}
        onChange={onChangeTotalFlour}
      />
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
        alignItems: 'center',
      },
    }),
  },
  slider: {
    flex: 1,
    marginVertical: 20,
  },
});
