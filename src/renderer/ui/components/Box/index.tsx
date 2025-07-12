import classNames from 'classnames';
import { FC, ReactNode } from 'react';

type BoxProps = {
  number: string;
  children: ReactNode;
  theme?: 'default' | 'success' | 'delete';
  className?: string;
};

const Box: FC<BoxProps> = ({ number, children, theme = 'default', className }) => {
  return (
    <div
      className={classNames(
        'relativep-6 bg-surface relative rounded-lg',
        'border-2 border-accent',
        //'ring-2 ring-accent',
        'overflow-hidden',
        className
      )}
      data-theme={theme}
    >
      <h2 className="absolute z-0 top-2 left-auto right-4 font-display font-bold text-number leading-[1em] text-accent pointer-events-none">
        {number}
      </h2>

      {children}
    </div>
  );
};

export default Box;
