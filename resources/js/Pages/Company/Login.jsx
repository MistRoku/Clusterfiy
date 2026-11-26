import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        company_code: '',
        email: '',
        password: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/company/login');
    }

    return (
        <div style={{ maxWidth: 360, margin: '80px auto', fontFamily: 'sans-serif' }}>
            <Head title="Company Login" />
            <h1>Company Login</h1>

            <form onSubmit={submit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Company Code *</label><br />
                    <input
                        type="text"
                        value={data.company_code}
                        onChange={(e) => setData('company_code', e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                    {errors.company_code && <span style={{ color: 'red' }}>{errors.company_code}</span>}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Email *</label><br />
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label>Password *</label><br />
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button type="submit" disabled={processing} style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {processing ? 'Logging in...' : 'Log In'}
                </button>
            </form>
        </div>
    );
}
