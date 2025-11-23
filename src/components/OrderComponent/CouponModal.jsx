import React from 'react';
import { Modal } from 'antd';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './CouponModal.css';

const coupons = [
  {
    id: 1,
    code: 'SAVE05',
    discount: 'Flat $5 OFF',
    minOrder: 'Minimum order: $50',
    desc: 'Save $5 instantly on checkout!',
    validDate: '01 February 2025',
    bgIconColor: '#E5672C',
  },
  {
    id: 2,
    code: 'SAVE10',
    discount: 'Flat $10 OFF',
    minOrder: 'Minimum order: $100',
    desc: 'Save $10 instantly on checkout!',
    validDate: '01 February 2025',
    bgIconColor: '#E5672C',
  },
  {
    id: 3,
    code: 'SAVE10',
    discount: 'Flat $10 OFF',
    minOrder: 'Minimum order: $100',
    desc: 'Save $10 instantly on checkout!',
    validDate: '01 February 2025',
    bgIconColor: '#E5672C',
  },
  {
    id: 4,
    code: 'SAVE10',
    discount: 'Flat $10 OFF',
    minOrder: 'Minimum order: $100',
    desc: 'Save $10 instantly on checkout!',
    validDate: '01 February 2025',
    bgIconColor: '#E5672C',
  },
];

const CouponModal = ({ open, onCancel, onApply }) => {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="coupon-modal-wrapper"
      centered
    >
      <div className="coupon-container">

        <div className="coupon-header">
            <div className="header-top">
                <h2 className="coupon-title">Your Coupons & Offers</h2>
                <div className="support-link">
                    <div className="support-icon"><QuestionCircleOutlined /></div>
                    <span>support</span>
                </div>
            </div>
            
            <div className="divider-line"></div>

            <div className="search-bar-container">
                <div className="search-input-box">
                    <input type="text" placeholder="Enter your discount code" />
                </div>
                <button className="search-btn">
                    Search
                </button>
            </div>
        </div>

        <div className="coupon-list">
            {coupons.map((coupon) => (
                <div key={coupon.id} className="coupon-card">

                    <div className="card-top">
                        <div className="card-top-content">
                            <div className="icon-bg-white">
                                <div className="inner-icon" style={{ background: coupon.bgIconColor }}></div>
                            </div>
                            <div className="code-info">
                                <div className="discount-text">{coupon.discount}</div>
                                <div className="code-text">{coupon.code}</div>
                            </div>
                        </div>

                        <div className="card-meta">
                            <span>Code: {coupon.id === 1 ? '1235' : '1236'}</span>
                            <span>Valid: {coupon.validDate}</span>
                        </div>
                    </div>

                    <div className="card-bottom">
                        <div className="card-details">
                            <div className="min-order">{coupon.minOrder}</div>
                            <div className="desc">{coupon.desc}</div>
                            <div className="terms">*Terms & conditions applicable</div>
                        </div>

                        <button 
                            className="btn-apply"
                            onClick={() => onApply(coupon)} 
                        >
                            Apply Code
                        </button>
                    </div>

                </div>
            ))}
        </div>

      </div>
    </Modal>
  );
};

export default CouponModal;