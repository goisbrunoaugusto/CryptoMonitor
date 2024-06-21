import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';
import Register from './Register';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
    };


    return (
        <div className='bg-slate-300 max-w-fit p-5'>
            <h2 className='text-center '>Login</h2>
            <br />
            <form onSubmit={handleSubmit} >
                <label>

                    <Input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
                </label>
                <br />
                <label>

                    <Input type="password" value={password} onChange={handlePasswordChange} placeholder="Senha" />
                </label>
                <br />
                <Button type="submit" className='bg-gray-600 p-2 px-4 m-4'>Log In</Button>
                <Button asChild className='bg-gray-600 p-2 px-4 m-4'>
                    <Link to="/register">Register</Link>
                </Button>

            </form>
        </div>
    );
};

export default LogIn;