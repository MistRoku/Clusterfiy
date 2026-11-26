import { Head, useForm } from '@inertiajs/react';

export default function Dashboard({ user, company }) {
    const { post, processing } = useForm({});

    function logout(e) {
        e.preventDefault();
        post('/company/logout');
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <Head title="Company Dashboard" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Welcome, {user.first_name}!</h1>
                <form onSubmit={logout}>
                    <button
                        type="submit"
                        disabled={processing}
                        style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        {processing ? 'Logging out...' : 'Log Out'}
                    </button>
                </form>
            </div>

            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
                <h2>Your Company</h2>
                <p><strong>Name:</strong> {company.name}</p>
                <p><strong>Code:</strong> {company.company_code}</p>
                <p><strong>Package:</strong> {company.package_tier}</p>
                <p><strong>Status:</strong> {company.status}</p>
            </div>
        </div>
    );
}
