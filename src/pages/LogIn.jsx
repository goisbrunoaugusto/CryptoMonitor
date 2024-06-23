import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from 'react-router-dom';

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer login.');
            }
            
            // Redirecionar ou executar outra ação após o login bem-sucedido
            navigate('/home'); // Exemplo de redirecionamento para a página inicial
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Credenciais inválidas. Por favor, tente novamente.');
        }
    };

    return (
        <div className='bg-slate-300 max-w-fit p-5'>
            <h2 className='text-center'>Login</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <label>
                    <Input type="text" value={username} onChange={handleUsernameChange} placeholder="Usuário" />
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
}

export default LogIn;
