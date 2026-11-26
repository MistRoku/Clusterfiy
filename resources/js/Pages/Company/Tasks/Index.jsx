import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ tasks }) {
    const { flash } = usePage().props;

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <Head title="My Tasks" />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1>Company Tasks</h1>
                <Link href="/company/tasks/create" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
                    + New Task
                </Link>
            </div>

            {flash?.success && <div style={{ color: 'green', marginBottom: '15px' }}>{flash.success}</div>}

            {tasks.length === 0 ? (
                <p>No tasks yet. Create one to get started!</p>
            ) : (
                <div style={{ display: 'grid', gap: '15px' }}>
                    {tasks.map((task) => (
                        <div key={task.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                            <h3 style={{ margin: '0 0 10px 0' }}>{task.title}</h3>
                            <p style={{ margin: '0 0 10px 0', color: '#666' }}>{task.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#555' }}>
                                <span>Status: <strong>{task.status}</strong></span>
                                <span>Due: {task.due_date || 'No date'}</span>
                                <span>Assigned to: {task.assignees.map(u => u.first_name).join(', ')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
