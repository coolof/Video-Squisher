import { FC } from 'react';
import Button from '../Button';
import { CheckCircleIcon, CrossIcon, FolderIcon } from '../icons';

type FileRorProps = {
  progress: number;
  name: string;
  onDelete: () => void;
};

const FileRow: FC<FileRorProps> = ({ progress, name, onDelete }) => {
  return (
    <div
      className="relative border-b-accent bg-surface border-b-2 last:border-b-0 p-[0.375rem] pl-3"
      data-theme={progress === 100 ? 'success' : 'default'}
    >
      <div className="flex items-center relative gap-2">
        {progress === 100 && (
          <div className="flex-none">
            <CheckCircleIcon />
          </div>
        )}

        <div className="flex-auto overflow-ellipsis">{name}</div>

        <Button
          slim
          iconOnly
          className="flex-none"
          onClick={() => window.electronAPI.showInFolder(name)}
        >
          <FolderIcon />
        </Button>

        <Button slim iconOnly onClick={onDelete} className="flex-none">
          <CrossIcon />
        </Button>
      </div>
    </div>
  );
};

export default FileRow;
