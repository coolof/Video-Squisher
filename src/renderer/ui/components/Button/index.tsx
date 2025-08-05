import classNames from 'classnames';
import { FC, ReactNode } from 'react';

type ButtonProps = {
  disabled?: boolean;
  slim?: boolean;
  iconOnly?: boolean;
  round?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({
  disabled,
  slim,
  iconOnly,
  round,
  onClick,
  className,
  children,
}) => {
  const styleClasses = classNames(
    'flex items-center justify-center font-semibold',
    'bg-button-surface text-white shadow-(--button-shadow)',
    'hover:bg-button-surface-hover',
    'disabled:opacity-50 disabled:hover:bg-button-surface',
    round ? ' rounded-full' : slim ? 'rounded-sm' : 'rounded-md',
    slim ? 'h-8' : 'h-10',
    iconOnly ? (slim ? 'w-8' : 'w-10') : 'px-4',
    'button-shadow',
    className
  );

  return (
    <button className={styleClasses} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
