import React, { useState } from "react";

interface ToggleProps {
  label: string;
  toggled: boolean;
  onClick: (isToggled: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = (props) => {
  const [isToggled, toggle] = useState(props.toggled);
  const callback = () => {
    const newToggled = !isToggled;
    toggle(newToggled);
    props.onClick(newToggled);
  };

  return (
    <label>
      <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
      {props.label}
    </label>
  );
};

export default Toggle;
