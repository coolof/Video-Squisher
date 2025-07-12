import { FC } from 'react';

type FileRorProps = {
  progress: number;
  name: string;
  onDelete: () => void;
};

const FileRow: FC<FileRorProps> = ({ progress, name, onDelete }) => {
  return (
    <div className="relative bg-slate-400 p-2 rounded overflow-hidden">
      <div
        className="absolute h-full left-0 top-0 bg-green-400"
        style={{ width: `${progress}%` }}
      ></div>

      <div className="flex items-center relative">
        {name}
        <button onClick={onDelete} className="ml-auto">
          Ta bort
        </button>
      </div>
    </div>
  );
};

export default FileRow;
