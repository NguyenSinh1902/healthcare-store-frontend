
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './NotFoundPage.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="not-found-image">
                    <img
                        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
                        alt="404 Not Found"
                    />
                </div>
                <h1 className="not-found-title">Oops! Page not found</h1>
                <p className="not-found-desc">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Button
                    type="primary"
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    className="btn-back-home"
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage;
