import { useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = forwardRef(({ onScanSuccess }, ref) => {
  const scannerRef = useRef(null);
  const scannerId = 'qr-reader';
  const isStartingRef = useRef(false);

  const startScanner = async () => {
    if (isStartingRef.current) return;
    isStartingRef.current = true;

    try {
      const scanner = new Html5Qrcode(scannerId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          onScanSuccess(decodedText);
        },
        () => {}
      );
    } catch (err) {
      console.error('Gagal memulai scanner:', err);
    } finally {
      isStartingRef.current = false;
    }
  };

const stopScanner = async () => {
  try {
    const scanner = scannerRef.current;
    if (!scanner) return;

    if (scanner._isScanning) {
      await scanner.stop();
      console.log('🛑 Scanner stopped');
    }
    await new Promise((res) => setTimeout(res, 200));
    const video = document.querySelector(`#${scannerId} video`);
    if (video && video.readyState >= 2 && video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
      console.log('🎥 Video stream dihentikan');
    }


    scannerRef.current = null;

    console.log('✅ Kamera berhasil dihentikan');
  } catch (err) {
    console.error('❌ Gagal menghentikan scanner/kamera:', err.message || err);
  }
};

  useImperativeHandle(ref, () => ({
    start: startScanner,
    stop: stopScanner,
  }));

  return <div id={scannerId} className="w-full max-w-md mx-auto" />;
});
export default QRScanner;
