import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Typography, Row, Col } from "antd";
import { BasicModalProps } from "../../models/types";
import QrScanner from "qr-scanner";

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
      width={1400}
      open={isOpen}
      onOk={closeSelf}
      onCancel={closeSelf}
      confirmLoading={isLoading}
      footer={null}
    >
      {/* <Row>
        <Col span={24}>
          <Button
            style={{ marginTop: 10 }}
            onClick={toggleScanning}
            type="primary"
          >
            {isScanning ? "Pause Scanning" : "Resume Scanning"}
          </Button>
        </Col>
        <Col span={24}>
          <Text style={{ marginTop: 10 }}>Scanned QR Content: {qrResult}</Text>
        </Col>
        <Col span={24} style={{ minHeight: "478px" }}>
          <Scanner
            styles={{ video: { width: "100%" } }}
            onError={handleError}
            onScan={handleScan}
            paused={!isScanning}
          />
        </Col>
      </Row> */}
      <video
        ref={videoRef}
        className="w-full max-w-xs aspect-square rounded-lg"
      />
      {qrResult && <p className="mt-4 text-green-600">QR Code: {qrResult}</p>}
    </Modal>
  );
};

export default QRModal;
