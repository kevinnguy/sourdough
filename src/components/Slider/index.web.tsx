import React from 'react';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

export default function CustomSlider({ defaultValue = 0, maximumValue = 1000 }) {
  return (
    <Slider min={0} max={maximumValue} defaultValue={defaultValue} />
  )
}
