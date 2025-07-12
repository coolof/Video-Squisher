import { useCallback, useEffect, useState } from 'react';
import FileRow from './ui/components/fileRow';
import Box from './ui/components/Box';
import Button from './ui/components/Button';
import TextInput from './ui/components/TextInput';
import folder from '@/assets/folder.png';

export function App() {
  const [files, setFiles] = useState<string[]>([]);
  const [outputDir, setOutputDir] = useState<string | null>(null);
  const [suffix, setSuffix] = useState('-squished');
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('');
  const [showFiles, setShowFiles] = useState(false);
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

  return (
    <>
      <main className="bg-background text-white font-base text-base p-6 h-dvh flex-flex-col">
        <div className="absolute left-0 top-0 w-full h-8 drag-bar"></div>

        <header className="pt-10">
          <h1 className="text-2xl font-semibold mb-4">Video Squisher</h1>
        </header>

        <section className="flex gap-14">
          <Box
            number="01"
            className="w-full h-box-height"
            theme={files.length ? 'success' : 'default'}
          >
            {files.length > 0 && (
              <>
                <div className="absolute z-10 left-auto right-4 -top-2 flex flex-col gap-2">
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
              <Button className="w-full" onClick={handleSelectFiles}>
                Select files...
              </Button>
              {files.length ? (
                <Button iconOnly onClick={() => setShowFiles(true)} className="flex-none">
                  F
                </Button>
              ) : null}
            </div>
          </Box>
          <Box
            number="02"
            className="w-full h-box-height"
            theme={outputDir ? 'success' : 'default'}
          >
            {outputDir && (
              <div className="absolute left-4 top-auto bottom-20">
                <img src={folder} width={36} height={36} alt="Folder icon" className="mb-2" />
                <div className="font-medium pl-1">{outputDir}</div>
              </div>
            )}

            <div className="absolute top-auto left-0 bottom-0 w-full p-4 flex gap-4">
              <Button className="w-full" onClick={handleSelectOutput}>
                Save location...
              </Button>
            </div>
          </Box>
          <Box number="03" theme="success" className="w-full h-box-height">
            <div className="font-display font-normal text-xl text-white/60 absolute bottom-20 right-4 left-auto text-right whitespace-nowrap">
              file<span className="text-white font-semibold">{suffix}</span>.mp4
            </div>

            <div className="absolute top-auto left-0 bottom-0 w-full p-4 flex gap-4">
              <TextInput
                value={suffix}
                onChange={e => setSuffix(e.target.value)}
                disabled={isRunning}
                className="block w-full"
                placeholder="File suffix"
                theme="default"
              />
            </div>
          </Box>
        </section>

        <Button
          onClick={handleCompress}
          disabled={!files.length || !outputDir}
          className="absolute z-20 bottom-6 left-6 right-6 flex h-12 mt-10"
        >
          Squish videos!
        </Button>

        {/* <div className="mb-4 space-y-4">
        <button
          onClick={handleSelectFiles}
          disabled={isRunning}
          className="bg-blue-600 p-2 rounded"
        >
          Välj filer
        </button>
        <button
          onClick={handleSelectOutput}
          disabled={isRunning}
          className="bg-amber-600 p-2 rounded"
        >
          Välj output-mapp
        </button>
        <input
          type="text"
          value={suffix}
          onChange={e => setSuffix(e.target.value)}
          disabled={isRunning}
          className="text-black p-1"
          placeholder="Suffix, t.ex. -web"
        />
        <button
          onClick={handleCompress}
          disabled={isRunning || files.length === 0}
          className="bg-green-600 p-2 rounded"
        >
          Komprimera alla
        </button>
      </div>

      {outputDir && <p className="text-sm text-gray-300 mb-2">Output: {outputDir}</p>} */}

        <div className="mt-4 flex">
          {status}

          {isRunning && (
            <div className="ml-auto flex gap-4">
              <div>
                {doneCount} / {totalCount} filer klara
              </div>

              <div className="w-4 h-4 bg-black rounded-sm animate-spin"></div>
            </div>
          )}
        </div>
      </main>

      {showFiles && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/75 text-white overflow-auto flex px-4 pt-14">
          <div className="rounded-t-lg w-full min-h-full p-6 bg-surface">
            <h2 className="font-deisplay font-semibold font-3xl">Selected files</h2>
            <Button onClick={() => setShowFiles(false)} iconOnly>
              X
            </Button>

            <div className="flex flex-col gap-2">
              {files.map(file => (
                <FileRow
                  name={file}
                  progress={progress[file] ?? 0}
                  onDelete={() => handleRemove(file)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
