import classNames from 'classnames';
import { FC, ReactNode } from 'react';

type SquishButtonProps = {
  disabled?: boolean;
  slim?: boolean;
  iconOnly?: boolean;
  round?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
};

const SquishButton: FC<SquishButtonProps> = ({ disabled, onClick, className, children }) => {
  const styleClasses = classNames(
    'flex items-center justify-center font-semibold',
    'bg-squish-button-surface text-white shadow-(--squish-button-shadow)',
    'hover:bg-squish-button-surface-hover',
    'disabled:bg-squish-button-surface-disabled disabled:hover:bg-squish-button-surface-disabled disabled:shadow-none disabled:ring-inset disabled:ring-1 disabled:ring-white/10 disabled:font-medium',
    'rounded-md',
    'h-12',
    'px-4',
    className
  );

  return (
    <button className={styleClasses} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default SquishButton;
