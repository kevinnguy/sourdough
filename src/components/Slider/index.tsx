import React from 'react';
import Slider from '@react-native-community/slider';

export default function CustomSlider({ defaultValue = 0, maximumValue = 1000 }) {
  return (
    <Slider
      style={{height: 40}}
      minimumValue={0}
      maximumValue={maximumValue}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      value={defaultValue}
    />
  )
}
