import { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';


export default function Waveform({ url }) {

  const wavesurfer = useRef(null);
  const waveformRef = useRef(null);

  const [playing, setPlaying] = useState(false);

  const wavesurferOptions = (ref) => ({
    container: ref,
    responsive: true,
    waveColor: '#1890ff',
    progressColor: '#0050b3',
  });

  const destroyWaveform = () => {
    if (wavesurfer.current && typeof wavesurfer.current.destroy === 'function') {
      wavesurfer.current.destroy();
    }
  };

  const playPause = () => {
    wavesurfer.current.playPause();
  };

  useEffect(() => {
    destroyWaveform();
    const options = wavesurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);
    wavesurfer.current.on('seek', () => wavesurfer.current.play());
    wavesurfer.current.on('play', () => setPlaying(true));
    wavesurfer.current.on('pause', () => setPlaying(false));
    wavesurfer.current.on('destroy', () => setPlaying(false));

    return destroyWaveform;
  }, [url]);

  return (
    <div>
      <div ref={waveformRef} />
      <div>
        <button type="button" onClick={playPause}>
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};