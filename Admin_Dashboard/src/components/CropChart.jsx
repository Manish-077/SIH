import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../services/api';

const CropChart = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        fetchAnalytics().then(data => setAnalytics(data));
    }, []);

    // Render chart using analytics data
    return (
        <div>
            {/* Render chart here */}
            {analytics && <pre>{JSON.stringify(analytics, null, 2)}</pre>}
        </div>
    );
};

export default CropChart;