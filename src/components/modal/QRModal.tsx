import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Typography, Row, Col } from "antd";
import { BasicModalProps } from "../../models/types";
import QrScanner from "qr-scanner";
import "./QRModal.css"; // Import the new CSS file

const { Text } = Typography;

const QRModal: React.FC<BasicModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [qrResult, setQrResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        setQrResult(result.data);
        // onClose();
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScanner.start().catch(console.error);
    qrScannerRef.current = qrScanner;

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, [isOpen]);

  const closeSelf = () => {
    onClose();
    setIsLoading(false);
    setQrResult(null); // Clear QR result on close
  };

  return (
    <Modal
      title="Scan QR Code"
      width={600} // Adjust modal width for better presentation
      open={isOpen}
      onOk={closeSelf}
      onCancel={closeSelf}
      confirmLoading={isLoading}
      footer={null}
      bodyStyle={{ padding: "20px" }} // Add padding for better spacing
    >
      <div className="qr-modal-content">
        {/* Add a container for layout */}
        <video ref={videoRef} className="responsive-video" />
        {qrResult && <p className="qr-result-text">QR Code: {qrResult}</p>}
      </div>
    </Modal>
  );
};

export default QRModal;
