import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your registration logic here
    };

    return (
        <div className='bg-slate-300 w-3/12'>
            <h2 className="p-4 ">Register</h2>
            <form onSubmit={handleSubmit}>
                <Input type="text" value={name} onChange={handleNameChange} className="m-4 w-11/12" placeholder='Nome' />
                <Input type="text" value={name} onChange={handleNameChange} className="m-4 w-11/12" placeholder='SobreNome' />

                <Input type="email" value={email} onChange={handleEmailChange} className="m-4 w-11/12" placeholder='Email' />

                <Input type="password" value={password} onChange={handlePasswordChange} className="m-4 w-11/12" placeholder='Senha' />

                <Button type="submit" className='bg-gray-600 p-4 px-4 m-4'>Register </Button>

                <Button asChild className='bg-gray-600 p-2 px-4 m-4'>
                    <Link to="/">Voltar</Link>
                </Button>
            </form>
        </div>
    );
}

export default Register;