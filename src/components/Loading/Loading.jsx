import React from 'react';
import { Spin } from 'antd';
import './Loading.css';

const Loading = ({
    size = 'large',
    tip = 'Loading...',
    fullscreen = false,
    spinning = true
}) => {
    if (fullscreen) {
        return (
            <div className="loading-overlay">
                <div className="loading-content">
                    <Spin size={size} tip={tip} spinning={spinning} />
                </div>
            </div>
        );
    }

    return (
        <div className="loading-inline">
            <Spin size={size} tip={tip} spinning={spinning} />
        </div>
    );
};

export default Loading;
