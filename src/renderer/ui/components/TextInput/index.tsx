import classNames from 'classnames';
import { FC } from 'react';

type TextInputProps = {
  value: string;
  placeholder?: string;
  onChange: (e: any) => void;
  disabled?: boolean;
  className?: string;
  theme?: 'default' | 'success' | 'delete';
};

const TextInput: FC<TextInputProps> = ({
  value,
  placeholder,
  onChange,
  disabled,
  className,
  theme,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={classNames(
        'bg-surface border-1 border-accent text-white font-base h-10 px-4 rounded-md',
        'font-medium',
        //'caret-button-accent',
        'focus:outline-2 focus:outline-button-accent/40',
        className
      )}
      placeholder={placeholder}
      data-theme={theme}
    />
  );
};

export default TextInput;
