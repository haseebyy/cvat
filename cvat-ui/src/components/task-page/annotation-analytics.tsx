// CVAT Task Analytics: real server data; no fixture or hardcoded counts.
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Alert from 'antd/lib/alert';
import Spin from 'antd/lib/spin';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type ClassCount = { label: string; count: number };
type AnalyticsData = {
    task_id: number;
    total_annotations: number;
    classes_count: number;
    counts: ClassCount[];
    counting_scope: string;
};

export default function AnnotationAnalytics({ taskId }: { taskId: number }): JSX.Element {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');
    const [reload, setReload] = useState(0);

    useEffect(() => {
        let active = true;
        setLoading(true);
        setError('');
        axios.get<AnalyticsData>(`/api/test/tasks/${taskId}/annotation-counts/`, {
            withCredentials: true,
        }).then(({ data: result }) => {
            if (active) setData(result);
        }).catch((err) => {
            if (active) {
                setData(null);
                const status = err.response?.status;
                setError(status === 403 ? 'You do not have permission to view these counts.'
                    : status === 401 ? 'Please sign in to view annotation counts.'
                        : status === 404 ? 'Task or analytics endpoint not found.'
                            : 'Could not load annotations. Check that the API is running.');
            }
        }).finally(() => {
            if (active) setLoading(false);
        });
        return () => { active = false; };
    }, [taskId, reload]);

    const rows = useMemo(() => (data?.counts || []).filter(
        (item) => item.label.toLowerCase().includes(filter.trim().toLowerCase()),
    ), [data, filter]);

    const chartData = {
        labels: rows.map((row) => row.label),
        datasets: [{
            label: 'Annotations',
            data: rows.map((row) => row.count),
            backgroundColor: '#1677ff',
        }],
    };

    return (
        <Card title='Annotation analytics by class' style={{ margin: '16px 0' }}
            extra={<Button onClick={() => setReload((n) => n + 1)} disabled={loading}>Refresh</Button>}>
            {loading ? <Spin tip='Loading annotations...' /> : null}
            {!loading && error ? <Alert type='error' showIcon message={error} /> : null}
            {!loading && !error && data ? (
                <>
                    <p><strong>{data.total_annotations}</strong> shapes in <strong>{data.classes_count}</strong> classes.</p>
                    <p style={{ color: '#777' }}>Scope: {data.counting_scope}</p>
                    <Input placeholder='Filter classes' aria-label='Filter classes'
                        value={filter} onChange={(e) => setFilter(e.target.value)}
                        style={{ maxWidth: 320, marginBottom: 12 }} />
                    {rows.length === 0 ? <Alert type='info' message={data.counts.length ?
                        'No class matches your filter.' : 'No shape annotations exist in this task.'} /> : (
                            <div style={{ height: Math.max(260, rows.length * 25), maxHeight: 1000, overflowY: 'auto' }}>
                                <Bar data={chartData} options={{
                                    indexAxis: 'y' as const,
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: { x: { beginAtZero: true } },
                                }} />
                            </div>
                        )}
                </>
            ) : null}
        </Card>
    );
}
