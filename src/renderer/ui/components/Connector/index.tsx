import classNames from 'classnames';
import { FC } from 'react';

type ConnectorProps = {
  active?: boolean;
  className?: string;
};

export const LeftConnectrion: FC<ConnectorProps> = ({ active, className }) => {
  return (
    <svg
      width="332"
      height="118"
      viewBox="0 0 332 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      //preserveAspectRatio="none"
      data-theme={active ? 'success' : 'default'}
      className={classNames(active ? 'z-1' : 'z-0', className)}
    >
      <path d="M1.5 0.5C1.5 117.5 331 0.5 331 117.5" strokeWidth="2" className="stroke-accent" />
    </svg>
  );
};

export const RightConnectrion: FC<ConnectorProps> = ({ active, className }) => {
  return (
    <svg
      width="332"
      height="118"
      viewBox="0 0 332 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      //preserveAspectRatio="none"
      data-theme={active ? 'success' : 'default'}
      className={classNames(active ? 'z-10' : 'z-0', className)}
    >
      <path d="M330.5 0.5C330.5 117.5 1 0.5 1 117.5" strokeWidth="2" className="stroke-accent" />
    </svg>
  );
};

export const MiddleConnectrion: FC<ConnectorProps> = ({ active, className }) => {
  return (
    <svg
      width="2"
      height="117"
      viewBox="0 0 2 117"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      //preserveAspectRatio="none"
      data-theme={active ? 'success' : 'default'}
      className={classNames(active ? 'z-10' : 'z-0', className)}
    >
      <path d="M1 117V0.5" strokeWidth="2" className="stroke-accent" />
    </svg>
  );
};
