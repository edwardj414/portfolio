import { useEffect, useRef } from 'react';
import { startScanEngine } from '../scanEngine';
import './ScanBeam.css';

export default function ScanBeam() {
  const ref = useRef(null);

  useEffect(() => {
    const cleanup = startScanEngine(ref.current);
    return cleanup;
  }, []);

  return (
    <div className="sbeam" ref={ref} aria-hidden>
      <div className="sbeam__glow" />
      <div className="sbeam__line sbeam__line--main" />
      <div className="sbeam__line sbeam__line--echo" />
    </div>
  );
}
