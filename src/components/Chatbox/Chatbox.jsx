import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Spin } from 'antd';
import { SendOutlined, RobotOutlined, CloseOutlined } from '@ant-design/icons';
import { askChatBot } from '../../services/chatService';
import './Chatbox.css';

const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('chat_history');
        if (saved) {
            return JSON.parse(saved);
        }
        return [
            { sender: 'AI', text: "Chào bạn! Mình là trợ lý ảo HealthCare. Mình có thể giúp gì cho bạn hôm nay? 🥰" }
        ];
    });

    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        localStorage.setItem('chat_history', JSON.stringify(messages));
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMessage = { sender: 'User', text: inputText };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setLoading(true);

        try {
            const response = await askChatBot(inputText);
            if (response && response.answer) {
                const aiMessage = { sender: 'AI', text: response.answer };
                setMessages(prev => [...prev, aiMessage]);
            } else {
                setMessages(prev => [...prev, { sender: 'AI', text: "Xin lỗi, mình đang gặp chút trục trặc. Bạn thử lại sau nhé! 😓" }]);
            }
        } catch (error) {
            console.error("Chatbot Error:", error);
            setMessages(prev => [...prev, { sender: 'AI', text: "Hệ thống đang bảo trì. Vui lòng quay lại sau!" }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const formatMessage = (text) => {
        return text.split('\n').map((line, index) => {
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
                <div key={index} style={{ marginBottom: '4px' }}>
                    {parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i}>{part.slice(2, -2)}</strong>;
                        }
                        return <span key={i}>{part}</span>;
                    })}
                </div>
            );
        });
    };

    return (
        <div className="chatbox-wrapper">
            {!isOpen && (
                <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
                    <RobotOutlined style={{ fontSize: '24px' }} />
                </button>
            )}

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="chat-header-title">
                            <RobotOutlined style={{ marginRight: '8px' }} />
                            AI Assistant
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button
                                type="text"
                                icon={<CloseOutlined style={{ color: 'white' }} />}
                                onClick={() => setIsOpen(false)}
                                className="btn-close-chat"
                            />
                        </div>
                    </div>

                    <div className="chat-body">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-message ${msg.sender === 'User' ? 'user-message' : 'ai-message'}`}>
                                <div className="message-bubble">
                                    {msg.sender === 'AI' ? formatMessage(msg.text) : msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="chat-message ai-message">
                                <div className="message-bubble loading-bubble">
                                    <Spin size="small" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-footer">
                        <Input
                            placeholder="Hỏi gì đó đi..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onPressEnter={handleKeyPress}
                            disabled={loading}
                            suffix={
                                <Button
                                    type="text"
                                    icon={<SendOutlined style={{ color: '#2859C5' }} />}
                                    onClick={handleSend}
                                    disabled={loading}
                                />
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbox;