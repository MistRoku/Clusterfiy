import { Head } from '@inertiajs/react';

export default function Dashboard({ companies }) {
    return (
        <div style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'sans-serif' }}>
            <Head title="Master Admin Dashboard" />
            <h1>Companies</h1>

            {companies.length === 0 ? (
                <p>No companies yet. The next process will add the Create Company button.</p>
            ) : (
                <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Active</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company) => (
                            <tr key={company.id}>
                                <td>{company.name}</td>
                                <td>{company.status}</td>
                                <td>{company.is_active ? 'Yes' : 'No'}</td>
                                <td>{company.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
