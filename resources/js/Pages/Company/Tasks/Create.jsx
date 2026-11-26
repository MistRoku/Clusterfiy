import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ users }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        status: 'pending',
        due_date: '',
        assignees: [],
    });

    function submit(e) {
        e.preventDefault();
        post('/company/tasks');
    }

    function toggleUser(userId) {
        if (data.assignees.includes(userId)) {
            setData('assignees', data.assignees.filter(id => id !== userId));
        } else {
            setData('assignees', [...data.assignees, userId]);
        }
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
            <Head title="Create Task" />
            <Link href="/company/tasks" style={{ textDecoration: 'none', color: 'blue' }}>← Back to Tasks</Link>
            <h1>Create New Task</h1>

            <form onSubmit={submit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Title *</label><br />
                    <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} required style={{ width: '100%', padding: '8px' }} />
                    {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Description</label><br />
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} style={{ width: '100%', padding: '8px', height: '100px' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Status *</label><br />
                    <select value={data.status} onChange={(e) => setData('status', e.target.value)} style={{ width: '100%', padding: '8px' }}>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Due Date</label><br />
                    <input type="date" value={data.due_date} onChange={(e) => setData('due_date', e.target.value)} style={{ width: '100%', padding: '8px' }} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Assign To *</label><br />
                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                        {users.map((user) => (
                            <div key={user.id} style={{ marginBottom: '5px' }}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={data.assignees.includes(user.id)}
                                        onChange={() => toggleUser(user.id)}
                                    />
                                    {' '}{user.first_name} {user.last_name} ({user.role})
                                </label>
                            </div>
                        ))}
                    </div>
                    {errors.assignees && <span style={{ color: 'red' }}>{errors.assignees}</span>}
                </div>

                <button type="submit" disabled={processing} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
                    {processing ? 'Creating...' : 'Create Task'}
                </button>
            </form>
        </div>
    );
}
