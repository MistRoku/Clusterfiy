import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.login.store'));
    }

    return (
        <div style={{ maxWidth: 360, margin: '80px auto', fontFamily: 'sans-serif' }}>
            <Head title="Master Admin Login" />
            <h1>Master Admin Login</h1>

            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

            <form onSubmit={submit}>
                <p>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                </p>
                <p>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                </p>
                <button type="submit" disabled={processing}>
                    Log in
                </button>
            </form>
        </div>
    );
}
