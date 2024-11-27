import React, { useState } from "react";
import { Modal, Button, Typography, Row, Col } from "antd";
import { BasicModalProps } from "../../models/types";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

const { Text } = Typography;

const QRModal: React.FC<BasicModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);

  const handleScan = (data: IDetectedBarcode[]) => {
    if (data.length !== 0) {
      setQrResult(data[0].rawValue); // Set the QR result from the scanner
      console.log(
        "Scanned QR Content:",
        data.map((e) => e.rawValue)
      ); // Log the result
    }
  };

  const handleError = (err: any) => {
    console.error("QR Scan Error:", err);
  };

  const closeSelf = () => {
    onClose();
    setIsLoading(false);
    setQrResult(null); // Clear QR result on close
    setIsScanning(false); // Ensure scanning stops when modal closes
  };

  const toggleScanning = () => {
    setIsScanning((prev) => !prev); // Toggle scan state (start/stop scanning)
  };

  return (
    <Modal
      title="Scan QR Code"
      open={isOpen}
      onOk={closeSelf}
      onCancel={closeSelf}
      confirmLoading={isLoading}
      footer={null}
    >
      <Row>
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
      </Row>
    </Modal>
  );
};

export default QRModal;
