import React from 'react';
import Slider from 'react-native-slider';

export default function CustomSlider({ defaultValue = 0, maximumValue = 1000, onChange, style }) {
  return (
    <Slider
      style={style}
      minimumValue={0}
      maximumValue={maximumValue}
      minimumTrackTintColor="#000000"
      maximumTrackTintColor="#888"
      onValueChange={onChange}
      step={10}
      value={defaultValue}
    />
  )
}
