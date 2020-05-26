import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import { isWeb, styleForPlatform } from '../utils/platform';

import GramInput from '../components/GramInput';
import Slider from '../components/Slider';

const TOTAL_FLOUR = 'Total flour';
const WHOLE_WHEAT = 'Whole wheat flour';
const WATER = 'Water';
const STARTER = 'Starter';
const SALT = 'Salt';

const calculateBakerRatio = (ingredients) => {
  const { percent: totalPercent, gram: totalGram } = ingredients[TOTAL_FLOUR];

  return Object.keys(ingredients).reduce((acc, key) => {
    if (key === TOTAL_FLOUR) {
      acc[TOTAL_FLOUR] = {
        id: TOTAL_FLOUR,
        percent: totalPercent,
        gram: totalGram,
      };

      return acc;
    }

    let { percent, gram } = ingredients[key];
    // percent = Number(((gram / totalGram) * totalPercent).toFixed(1));
    gram = Number(((percent / totalPercent) * totalGram).toFixed(1));

    acc[key] = {
      id: key,
      percent,
      gram,
    };

    return acc;
  }, {});
};

let DEFAULT_INGREDIENTS = {
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

DEFAULT_INGREDIENTS = calculateBakerRatio(DEFAULT_INGREDIENTS);

export default function App() {
  const [totalFlour, setTotalFlour] = useState(
    DEFAULT_INGREDIENTS[TOTAL_FLOUR],
  );
  const [wholeWheat, setWholeWheat] = useState(
    DEFAULT_INGREDIENTS[WHOLE_WHEAT],
  );
  const [water, setWater] = useState(DEFAULT_INGREDIENTS[WATER]);
  const [starter, setStarter] = useState(DEFAULT_INGREDIENTS[STARTER]);
  const [salt, setSalt] = useState(DEFAULT_INGREDIENTS[SALT]);

  const onChangeTotalFlour = (totalValueGram) => {
    if (!totalValueGram) {
      totalValueGram = 0;
    }

    setTotalFlour({ ...totalFlour, gram: totalValueGram });

    const ingredients = {
      [totalFlour.id]: totalFlour,
      [wholeWheat.id]: wholeWheat,
      [water.id]: water,
      [starter.id]: starter,
      [salt.id]: salt,
    };
    const bakerRatio = calculateBakerRatio(ingredients);

    setWholeWheat(bakerRatio[wholeWheat.id]);
    setWater(bakerRatio[water.id]);
    setStarter(bakerRatio[starter.id]);
    setSalt(bakerRatio[salt.id]);
  };

  const onChangeIngredient = (value, type, ingredientId) => {
    value = Number(value.replace('%', ''));
    console.log(value, type, ingredientId);
    const { percent: totalPercent, gram: totalGram } = totalFlour;

    let updatedType;
    let updatedValue;
    if (type === 'percent') {
      updatedType = 'gram';
      updatedValue = Number(((value / totalPercent) * totalGram).toFixed(1));
    } else if (type === 'gram') {
      updatedType = 'percent';
      updatedValue = Number(((value / totalGram) * totalPercent).toFixed(1));
    }

    const updatedIngredient = {
      id: ingredientId,
      [type]: value,
      [updatedType]: updatedValue,
    };

    console.log(updatedIngredient);
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
