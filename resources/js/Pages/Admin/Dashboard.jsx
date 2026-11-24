import { Head, useForm, usePage } from '@inertiajs/react';

export default function Dashboard({ companies }) {
    // useForm handles the data for our "Create Company" form
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        industry: '',
        package_tier: 'basic',
    });

    // usePage gets the flash message (the success message) from Laravel
    const { flash } = usePage().props;

    function submit(e) {
        e.preventDefault();
        // Send the form data to the /admin/companies route
        post(route('admin.companies.store'), {
            onSuccess: () => reset(), // Clear the form if it worked
        });
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <Head title="Master Admin Dashboard" />
            <h1>Master Admin Dashboard</h1>

            {/* Show success message if it exists */}
            {flash && flash.success && (
                <div style={{ color: 'green', marginBottom: '20px' }}>
                    {flash.success}
                </div>
            )}

            {/* The Form */}
            <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '40px' }}>
                <h2>Create New Company</h2>
                <form onSubmit={submit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Company Name *</label><br />
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label>Industry</label><br />
                        <input
                            type="text"
                            value={data.industry}
                            onChange={(e) => setData('industry', e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <label>Package Tier *</label><br />
                        <select
                            value={data.package_tier}
                            onChange={(e) => setData('package_tier', e.target.value)}
                        >
                            <option value="basic">Basic</option>
                            <option value="pro">Pro</option>
                            <option value="enterprise">Enterprise</option>
                        </select>
                        {errors.package_tier && <span style={{ color: 'red' }}>{errors.package_tier}</span>}
                    </div>

                    <button type="submit" disabled={processing}>
                        {processing ? 'Creating...' : 'Create Company'}
                    </button>
                </form>
            </div>

            {/* The List */}
            <h2>Existing Companies</h2>
            {companies.length === 0 ? (
                <p>No companies yet. Create one above!</p>
            ) : (
                <ul>
                    {companies.map((company) => (
                        <li key={company.id} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                            <strong>{company.name}</strong> ({company.package_tier}) - {company.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
