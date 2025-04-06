import { useWebSocket } from "ahooks";

const MyWebSocketComponent = () => {
  const { latestMessage, sendMessage, connect, disconnect, readyState } =
    useWebSocket("wss://your-websocket-url", {
      onOpen: () => console.log("WebSocket connection opened"),
      onClose: () => console.log("WebSocket connection closed"),
      onMessage: (message) => console.log("Received message:", message),
      onError: (error) => console.log("WebSocket error:", error),
      reconnectLimit: 3,
      reconnectInterval: 3000,
    });

  return (
    <div>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
      <button onClick={() => sendMessage("Hello WebSocket!")}>
        Send Message
      </button>
      <p>Connection Status: {readyState}</p>
      <p>Latest Message: {latestMessage?.data}</p>
    </div>
  );
};

export default MyWebSocketComponent;
