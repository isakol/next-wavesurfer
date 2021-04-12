import dynamic from 'next/dynamic';

const WaveSurfer = dynamic(
  () => import('../components/wavesurfer'),
  {
    ssr: false,
  },
);

//Sample MP3 file
const url = 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3';

export default function Home() {
  return (
    <WaveSurfer url={url} />
  );
}
