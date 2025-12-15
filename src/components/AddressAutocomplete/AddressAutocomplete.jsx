import React, { useState, useEffect } from 'react';
import { AutoComplete, Input } from 'antd';
import axios from 'axios';

const AddressAutocomplete = ({ value, onChange, placeholder = "Enter your address" }) => {
    const [options, setOptions] = useState([]);
    const [searchValue, setSearchValue] = useState(value || '');

    useEffect(() => {
        setSearchValue(value || '');
    }, [value]);

    const handleSearch = async (query) => {
        if (!query) {
            setOptions([]);
            return;
        }

        const LOCATIONIQ_API_KEY = "pk.38028b3d02aa69f417bada347799cd05";

        try {
            const response = await axios.get(`https://api.locationiq.com/v1/autocomplete`, {
                params: {
                    key: LOCATIONIQ_API_KEY,
                    q: query,
                    limit: 5,
                    countrycodes: 'vn',
                    format: 'json'
                }
            });

            const results = response.data.map((item) => ({
                value: item.display_name,
                label: (
                    <div style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                        <strong>{item.display_name.split(',')[0]}</strong>
                        <div style={{ fontSize: '12px', color: '#888' }}>{item.display_name}</div>
                    </div>
                ),
            }));

            setOptions(results);
        } catch (error) {
            console.error("LocationIQ Search Error:", error);
        }
    };

    let timeoutId;
    const onSearch = (val) => {
        setSearchValue(val);
        onChange(val);

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            handleSearch(val);
        }, 500);
    };

    const onSelect = (val) => {
        setSearchValue(val);
        onChange(val);
    };

    return (
        <AutoComplete
            value={searchValue}
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
            style={{ width: '100%' }}
            dropdownStyle={{ zIndex: 99999 }}
        >
            <Input.TextArea
                placeholder={placeholder}
                rows={3}
                className="ant-input"
            />
        </AutoComplete>
    );
};

export default AddressAutocomplete;
