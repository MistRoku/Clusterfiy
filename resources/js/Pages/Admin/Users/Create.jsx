import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ companies }) {
    const { data, setData, post, processing, errors } = useForm({
        company_id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: 'employee',
        job_title: '',
        phone_number: '',
        id_number: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/admin/users');
    }
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
            <Head title="Create User" />

            <Link href={route('admin.dashboard')} style={{ textDecoration: 'none', color: 'blue' }}>
                ← Back to Dashboard
            </Link>

            <h1>Create New User</h1>

            <form onSubmit={submit}>
                {/* Company Selection */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Company *</label><br />
                    <select
                        value={data.company_id}
                        onChange={(e) => setData('company_id', e.target.value)}
                        required
                    >
                        <option value="">-- Select a Company --</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                    {errors.company_id && <span style={{ color: 'red' }}>{errors.company_id}</span>}
                </div>

                {/* Names */}
                <div style={{ marginBottom: '10px' }}>
                    <label>First Name *</label><br />
                    <input type="text" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} required />
                    {errors.first_name && <span style={{ color: 'red' }}>{errors.first_name}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Last Name *</label><br />
                    <input type="text" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} required />
                    {errors.last_name && <span style={{ color: 'red' }}>{errors.last_name}</span>}
                </div>

                {/* Email & Password */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Email *</label><br />
                    <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Password * (min 8 characters)</label><br />
                    <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                </div>

                {/* Role */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Role *</label><br />
                    <select value={data.role} onChange={(e) => setData('role', e.target.value)}>
                        <option value="employee">Employee</option>
                        <option value="company_admin">Company Admin</option>
                    </select>
                </div>

                {/* Optional Fields */}
                <div style={{ marginBottom: '10px' }}>
                    <label>Job Title</label><br />
                    <input type="text" value={data.job_title} onChange={(e) => setData('job_title', e.target.value)} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Phone Number</label><br />
                    <input type="text" value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>ID Number</label><br />
                    <input type="text" value={data.id_number} onChange={(e) => setData('id_number', e.target.value)} />
                </div>

                <button type="submit" disabled={processing}>
                    {processing ? 'Creating...' : 'Create User'}
                </button>
            </form>
        </div>
    );
}
