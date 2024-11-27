import React, { useState } from "react";
import { Modal, Button, Typography } from "antd";
import { BasicModalProps } from "../../models/types";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

const { Text } = Typography;

const ConfirmModal: React.FC<BasicModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true); // Manage scan state

  const handleScan = (data: IDetectedBarcode[]) => {
    if (data.length != 0) {
      setQrResult(data[0].rawValue); // Set the QR result from the scanner
      console.log("Scanned QR Content:", data); // Log the result
    }
  };

  const handleError = (err: any) => {
    console.error("QR Scan Error:", err);
  };

  const closeSelf = () => {
    onClose();
    setIsLoading(false);
    setQrResult(null); // Clear QR result on close
    setIsScanning(false); // Reset scanning state when modal closes
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
      {isScanning ? (
        <>
          <Scanner
            styles={{ video: { width: "100%" } }}
            onError={handleError}
            onScan={handleScan}
          />
        </>
      ) : (
        <div>
          <Text>QR Scanning Paused</Text>
        </div>
      )}
      <Text style={{ marginTop: 10 }}>Scanned QR Content: {qrResult}</Text>
      <br />
      <Button style={{ marginTop: 10 }} onClick={toggleScanning} type="primary">
        {isScanning ? "Pause Scanning" : "Resume Scanning"}
      </Button>
    </Modal>
  );
};

export default ConfirmModal;
