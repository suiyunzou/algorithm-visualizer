import React from 'react';

interface AnimationControlsProps {
  onStart: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  disabled: boolean;
}

const AnimationControls: React.FC<AnimationControlsProps> = ({
  onStart,
  onReset,
  onSpeedChange,
  disabled,
}) => {
  return (
    <div className="animation-controls">
      <button onClick={onStart} disabled={disabled}>
        Start
      </button>
      <button onClick={onReset} disabled={disabled}>
        Reset
      </button>
      <label>
        Speed:
        <input
          type="range"
          min="1"
          max="10"
          defaultValue="1"
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          disabled={disabled}
        />
      </label>
    </div>
  );
};

export default AnimationControls;