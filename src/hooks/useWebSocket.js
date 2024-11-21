// src/hooks/useWebSocket.js
import { useState, useEffect, useCallback } from 'react';

export const useWebSocket = (url) => {
    const [ws, setWs] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    const connect = useCallback(() => {
        try {
            const websocket = new WebSocket(url);

            websocket.onopen = () => {
                setIsConnected(true);
                setError(null);
            };

            websocket.onclose = () => {
                setIsConnected(false);
                // 연결이 끊어지면 3초 후 재연결 시도
                setTimeout(connect, 3000);
            };

            websocket.onerror = (error) => {
                setError('WebSocket error occurred');
                console.error('WebSocket error:', error);
            };

            setWs(websocket);
        } catch (error) {
            setError('Failed to connect to WebSocket');
            console.error('WebSocket connection error:', error);
        }
    }, [url]);

    useEffect(() => {
        connect();
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [connect]);

    const sendMessage = useCallback((message) => {
        if (ws && isConnected) {
            ws.send(JSON.stringify(message));
        }
    }, [ws, isConnected]);

    return { sendMessage, isConnected, error };
};
