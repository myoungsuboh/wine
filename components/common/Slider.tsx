import * as React from 'react';
import MaterialSlider, {SliderValueLabelProps} from '@mui/material/Slider';
import {Tooltip} from '@mui/material';

interface SliderType {
  className?: string;
  style?: object;
  defaultValue: number;
  min?: number;
  max?: number;
  onChange: (event: React.SyntheticEvent | Event, value: number | number[]) => void;
}

export default function Slider({className, style, defaultValue = 50, min = 0, max = 100, onChange, ...props}: SliderType) {
  function ValueLabelComponent(props: SliderValueLabelProps) {
    const {children, value} = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  return (
    <MaterialSlider
      className={className}
      style={Object.assign({color: '#6A42DB'}, style)}
      track={false}
      defaultValue={defaultValue}
      valueLabelDisplay="auto"
      slots={{
        valueLabel: ValueLabelComponent,
      }}
      min={min}
      max={max}
      onChangeCommitted={onChange}
      {...props}
    />
  );
}
