import Box from '@/ui/components/Box';
import Button from '@/ui/components/Button';
import { BurgerIcon, FolderIcon } from '@/ui/components/icons';
import { FC } from 'react';
import folder from '@/assets/folder.png';
import TextInput from '@/ui/components/TextInput';

type SettingsProps = {
  onClickFiles: () => void;
  onClickFilesList: () => void;
  onClickOutput: () => void;
  onChangeSuffix: (e: any) => void;
  textInputValue: string;
  files: string[];
  outputDir: string | null;
  disabled?: boolean;
};

const Settings: FC<SettingsProps> = ({
  onClickFiles,
  onClickFilesList,
  onClickOutput,
  onChangeSuffix,
  textInputValue,
  files,
  outputDir,
  disabled,
}) => {
  return (
    <section className="relative z-20 flex gap-14">
      <Box number="01" className="w-full h-box-height" theme={files.length ? 'success' : 'default'}>
        {files.length > 0 && (
          <>
            <div className="absolute z-10 left-auto right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 pb-16">
              {files.map(file => (
                <div className="bg-button-surface/60 backdrop-blur-xl border-1 border-white/10 rounded-md px-2 h-10 overflow-hidden flex items-center justify-end text-lg whitespace-nowrap">
                  {file}
                </div>
              ))}
            </div>

            <div className="absolute z-20 left-0 top-auto bottom-0 h-2/3 w-full bg-linear-to-t from-surface from-40% to-surface/0"></div>
          </>
        )}

        <div className="absolute z-40 top-auto left-0 bottom-0 w-full p-4 flex gap-4">
          <Button className="w-full" onClick={onClickFiles} disabled={disabled}>
            Select files...
          </Button>
          {files.length ? (
            <Button iconOnly onClick={onClickFilesList} className="flex-none">
              <BurgerIcon />
            </Button>
          ) : null}
        </div>
      </Box>
      <Box number="02" className="w-full h-box-height" theme={outputDir ? 'success' : 'default'}>
        {outputDir && (
          <div className="absolute left-4 top-auto bottom-20">
            <img src={folder} width={36} height={36} alt="Folder icon" className="mb-2" />
            <div className="font-medium pl-1">{outputDir}</div>
          </div>
        )}

        <div className="absolute z-40 top-auto left-0 bottom-0 w-full p-4 flex gap-4">
          <Button className="w-full" onClick={onClickOutput} disabled={disabled}>
            Save location...
          </Button>
          {outputDir && (
            <Button
              iconOnly
              onClick={() => window.electronAPI.openPath(outputDir)}
              className="flex-none"
              disabled={disabled}
            >
              <FolderIcon />
            </Button>
          )}
        </div>
      </Box>
      <Box number="03" theme="success" className="w-full h-box-height">
        <div className="font-display font-normal text-lg text-white/60 absolute bottom-20 right-4 left-auto text-right whitespace-nowrap">
          {files.length ? String(files[0]).replace(/\.[^/.]+$/, '') : 'file'}
          <span className="text-white font-semibold">{textInputValue}</span>.mp4
        </div>

        <div className="absolute top-auto left-0 bottom-0 w-full p-4 flex gap-4">
          <TextInput
            value={textInputValue}
            onChange={onChangeSuffix}
            disabled={disabled}
            className="block w-full"
            placeholder="File suffix"
            theme="default"
          />
        </div>
      </Box>
    </section>
  );
};

export default Settings;
