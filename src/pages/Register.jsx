import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Adicionado para capturar o nome de usuário

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            username: username // Incluído no envio
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Erro ao registrar usuário.');
            }

            alert('Usuário cadastrado com sucesso!');
            // Redirecionar ou executar outra ação após o registro bem-sucedido
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            alert('Ocorreu um erro ao tentar registrar. Por favor, tente novamente.');
        }
    };

    return (
        <div className='bg-slate-300 w-3/12'>
            <h2 className="p-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <Input type="text" value={firstName} onChange={handleFirstNameChange} className="m-4 w-10/12" placeholder='Nome' />
                <Input type="text" value={lastName} onChange={handleLastNameChange} className="m-4 w-10/12" placeholder='Sobrenome' />
                <Input type="text" value={username} onChange={handleUsernameChange} className="m-4 w-10/12" placeholder='Nome de usuário' />
                <Input type="email" value={email} onChange={handleEmailChange} className="m-4 w-10/12" placeholder='Email' />
                <Input type="password" value={password} onChange={handlePasswordChange} className="m-4 w-10/12" placeholder='Senha' />
                <Button type="submit" className='bg-gray-600 p-4 px-4 m-4'>Register</Button>
                <Button asChild className='bg-gray-600 p-2 px-4 m-4'>
                    <Link to="/">Voltar</Link>
                </Button>
            </form>
        </div>
    );
}

export default Register;
