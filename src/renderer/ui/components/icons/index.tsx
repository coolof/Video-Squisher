import classNames from 'classnames';
import { FC } from 'react';

type iconProps = {
  className?: string;
};

export const BurgerIcon: FC<iconProps> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={classNames('stroke-current', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 5H12" stroke-width="1.5" stroke-linecap="round" />
      <path d="M4 8H12" stroke-width="1.5" stroke-linecap="round" />
      <path d="M4 11H12" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  );
};

export const CrossIcon: FC<iconProps> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={classNames('stroke-current', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 5L11 11" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 5L5 11" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export const FolderIcon: FC<iconProps> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={classNames('stroke-current', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7V4C4 3.44772 4.44772 3 5 3H8C8.55228 3 9 3.44772 9 4V4C9 4.55228 9.44772 5 10 5H13C13.5523 5 14 5.44772 14 6V12C14 12.5523 13.5523 13 13 13H11.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.43874 8.31623C2.2229 7.6687 2.70487 7 3.38743 7H11.2792C11.7097 7 12.0918 7.27543 12.2279 7.68377L13.5613 11.6838C13.7771 12.3313 13.2951 13 12.6126 13H4.72076C4.29033 13 3.90819 12.7246 3.77208 12.3162L2.43874 8.31623Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CheckCircleIcon: FC<iconProps> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={classNames('fill-current', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1ZM11.3857 4.35645C11.0527 4.15679 10.6268 4.24602 10.3994 4.55078L10.3564 4.61426L7.25195 9.79004L5.53027 8.06934C5.23743 7.7767 4.76257 7.7767 4.46973 8.06934C4.1769 8.36216 4.17703 8.83697 4.46973 9.12988L6.87012 11.5303C7.03332 11.6934 7.26221 11.7722 7.49121 11.7441C7.72043 11.7159 7.92415 11.5838 8.04297 11.3857L11.6436 5.38574L11.6797 5.31836C11.8413 4.9743 11.7187 4.55624 11.3857 4.35645Z" />
    </svg>
  );
};

export const CheckBigIcon: FC<iconProps> = ({ className }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={classNames('stroke-current', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M39 15L21 33L12 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
