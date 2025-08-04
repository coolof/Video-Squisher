import { useCallback, useEffect, useState } from 'react';
import FileRow from './ui/components/fileRow';
import Box from './ui/components/Box';
import Button from './ui/components/Button';
import TextInput from './ui/components/TextInput';
import folder from '@/assets/folder.png';
import badge from '@/assets/badge.png';
import graceLogo from '@/assets/grace-logo.svg';
import { LeftConnectrion, MiddleConnectrion, RightConnectrion } from './ui/components/Connector';
import { BurgerIcon, CheckBigIcon, CrossIcon, FolderIcon } from './ui/components/icons';
import SquishButton from './ui/components/SquishButton';
import classNames from 'classnames';
import Settings from './ui/compositions/Settings';

export function App() {
  const [files, setFiles] = useState<string[]>([]);
  const [outputDir, setOutputDir] = useState<string | null>(null);
  const [suffix, setSuffix] = useState('-squished');
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('');
  const [showFiles, setShowFiles] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [step, setStep] = useState('start');

  const doneCount = Object.values(progress).filter(p => p === 100).length;
  const totalCount = files.length;

  useEffect(() => {
    window.electronAPI.onProgress(({ file, percent }) => {
      setProgress(prev => ({ ...prev, [file]: percent }));
    });
  }, []);

  const handleSelectFiles = useCallback(async () => {
    const selected = await window.electronAPI.selectMultipleFiles();
    if (selected) {
      setFiles(prev => [...prev, ...selected]);
    }
  }, []);

  const handleSelectOutput = async () => {
    const out = await window.electronAPI.selectOutputDir();
    if (out) setOutputDir(out);
  };

  const handleCompress = async () => {
    if (isRunning || files.length === 0) return;

    setIsRunning(true);
    setProgress({}); // rensa progress
    setStatus('Startar komprimering...');

    for (const file of files) {
      setProgress(prev => ({ ...prev, [file]: 0 }));
      setStatus(`Komprimerar ${file}`);
      try {
        await window.electronAPI.compress({
          inputPath: file,
          outputDir: outputDir ?? undefined,
          suffix,
        });
        setProgress(prev => ({ ...prev, [file]: 100 }));
      } catch (err) {
        console.error(`Fel vid komprimering av ${file}`, err);
        setStatus(`Fel: ${file}`);
      }
    }

    setStatus('Alla filer färdiga');
    setIsDone(true);
    setIsRunning(false);
  };

  const handleRemove = (file: string) => {
    setFiles(prev => prev.filter(f => f !== file));
    setProgress(prev => {
      const p = { ...prev };
      delete p[file];
      return p;
    });
  };

  const handleClear = () => {
    setFiles([]);
    setIsDone(false);
  };

  const squishButtonLabel = () => {
    if (!files.length && !outputDir) {
      return 'Select files and save location';
    }

    if (!outputDir) {
      return 'Select save location';
    }

    if (!files.length) {
      return 'Select files';
    }

    return 'Squish videos!';
  };

  return (
    <>
      <main className="bg-background text-white font-base text-base p-6 h-dvh flex-flex-col">
        <div className="absolute z-[200] left-0 top-0 w-full h-9 drag-bar bg-surface border-b-1 border-b-accent/50"></div>

        <header className="pt-12 flex justify-between mb-8 items-baseline">
          <h1 className="text-2xl font-semibold">Video Squisher</h1>

          <img src={graceLogo} width={117} height={24} />
        </header>

        <Settings
          onClickFiles={handleSelectFiles}
          onClickOutput={handleSelectOutput}
          onClickFilesList={() => setShowFiles(true)}
          onChangeSuffix={e => setSuffix(e.target.value)}
          files={files}
          outputDir={outputDir}
          textInputValue={suffix}
          disabled={isRunning}
        />

        <SquishButton
          onClick={handleCompress}
          disabled={!files.length || !outputDir}
          className="absolute z-20 bottom-6 left-6 right-6 flex h-12 mt-10"
        >
          {squishButtonLabel()}
        </SquishButton>

        <LeftConnectrion
          className="absolute right-[calc(50%-1px)] bottom-18"
          active={files.length > 0}
        />
        <MiddleConnectrion
          className="absolute left-1/2 -translate-x-1/2 bottom-18"
          active={outputDir !== null}
        />
        <RightConnectrion className="absolute left-[calc(50%-1px)] bottom-18" active />

        {/* <div className="mt-4 flex">
          {status}

          {isRunning && (
            <div className="ml-auto flex gap-4">
              <div>
                {doneCount} / {totalCount} filer klara
              </div>

              <div className="w-4 h-4 bg-black rounded-sm animate-spin"></div>
            </div>
          )}
        </div> */}
      </main>

      {/* All files modal */}
      <div
        className={classNames(
          'fixed top-0 left-0 z-50 w-full h-full overflow-auto',
          'bg-black text-white',
          'flex px-4 py-4 pt-14',
          'transition-opacity duration-300',
          showFiles ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className={classNames(
            'rounded-lg w-full min-h-full',
            'p-6 bg-surface inset-shadow-window',
            'transition-all duration-300',
            showFiles ? 'translate-y-0' : 'translate-y-20'
          )}
        >
          <header className="flex justify-between items-center mb-6">
            <h2 className="font-deisplay font-semibold text-2xl">Selected files</h2>

            <Button onClick={() => setShowFiles(false)} iconOnly round>
              <CrossIcon />
            </Button>
          </header>

          {files.length ? (
            <>
              <div className="flex flex-col border-2 border-accent bg-surface rounded-md overflow-hidden mb-4">
                {files.map(file => (
                  <FileRow
                    name={file}
                    progress={progress[file] ?? 0}
                    onDelete={() => handleRemove(file)}
                  />
                ))}
              </div>

              <div
                className="p-[0.375rem] bg-surface border-2 border-accent flex justify-end rounded-md"
                data-theme="delete"
              >
                <Button onClick={() => setFiles([])} slim>
                  Delete all
                </Button>
              </div>
            </>
          ) : (
            <div className="border-2 border-accent rounded-lg p-8 flex flex-col gap-4 items-center justify-center">
              <div>No videos files selected</div>
              <Button onClick={handleSelectFiles}>Select files...</Button>
            </div>
          )}
        </div>
      </div>

      {/* Running */}
      <div
        className={classNames(
          'fixed z-50 left-0 top-0 w-full h-full bg-background p-6',
          'transition-opacity',
          isRunning ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <h2 className="font-display font-semibold text-2xl text-center py-10">
          Squishing video {doneCount + 1} / {totalCount}
        </h2>

        <div
          className="absolute top-1/2 left-0 w-full p-6 flex flex-col gap-2 transition-all duration-300"
          style={{ transform: `translateY(${doneCount * -56}px)` }}
        >
          {files.map((file, index) => (
            <div
              className={classNames(
                'relative h-12 px-4 rounded-md overflow-hidden ring-inset ring-2 bg-surface ring-accent',
                'flex items-center',
                'text-md whitespace-nowrap overflow-ellipsis',
                'transition-all',
                doneCount === index ? 'shadow-(--squishing-shadow) my-4' : 'scale-90'
              )}
              data-theme={progress[file] >= 100 ? 'success' : 'default'}
            >
              <div
                className={classNames(
                  'absolute left-0 top-0 w-full h-full',
                  'bg-surface border-2 border-accent transition-all',
                  progress[file] ? 'opacity-100' : 'opacity-0',
                  progress[file] >= 100 ? 'rounded-md' : 'rounded-l-md'
                )}
                style={{ width: `${Math.round(progress[file])}%` }}
                data-theme="success"
              ></div>
              <div className="relative max-w-full overflow-ellipsis">{file}</div>

              {progress[file] && (
                <div className="absolute left-auto right-2 top-1/2 -translate-y-1/2 text-sm p-2 bg-surface">
                  {Math.round(progress[file])}%
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Done */}
      {isDone && (
        <div className={classNames('fixed z-50 left-0 top-0 w-full h-full bg-background p-8')}>
          <div
            className={classNames(
              'absolute left-1/2 top-1/2 -translate-1/2',
              'flex flex-col items-center'
            )}
          >
            <button className="absolute left-1/2 -translate-x-1/2 top-[-112px] pr-[210px]">
              <img
                src={badge}
                width={130}
                height={130}
                alt="Benchmark badge"
                className="block max-w-none w-[130px] h-[130px] cursor-pointer"
                onClick={(e: any) => {
                  e.preventDefault();
                  window.electronAPI.openUrl('https://videosize.gracestudio.io/');
                }}
              />
            </button>
            <div
              className={classNames(
                'bg-surface border-2 border-accent',
                'flex items-center justify-center',
                'w-20 h-20 mb-6 rounded-full'
              )}
              data-theme="success"
            >
              <CheckBigIcon />
            </div>

            <h2 className="font-display font-semibold text-2xl text-center mb-10 whitespace-nowrap">
              {files.length > 1 ? (
                <>All {totalCount} videos squished!</>
              ) : (
                'The video was squished!'
              )}
            </h2>

            {outputDir && (
              <Button onClick={() => window.electronAPI.openPath(outputDir)} className="gap-2">
                <FolderIcon />
                Open save folder
              </Button>
            )}
          </div>

          <div className="absolute left-0 bottom-0 w-full p-6 flex justify-center gap-4">
            <button
              className={classNames(
                'h-10 border-1 border-accent px-4 rounded-md font-semibold',
                'hover:bg-button-surface-hover'
              )}
              onClick={() => setIsDone(false)}
            >
              Just close
            </button>

            <Button onClick={() => handleClear()}>Close and clear files</Button>
          </div>
        </div>
      )}
    </>
  );
}
