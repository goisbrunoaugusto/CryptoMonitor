import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavigationBar from '@/components/ui/navigation-bar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f1f5f9;
`;

const FixedNavigationBar = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000; /* Para garantir que a barra fique acima de outros elementos */
  background-color: #ffffff; /* Cor de fundo da barra de navegação */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra para dar destaque */
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1; /* Para ocupar o espaço disponível */
  padding-top: 60px; /* Espaço para a barra de navegação fixa */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #cbd5e1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  margin: 0 20px;

  @media (min-width: 600px) {
    padding: 40px;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

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
            username: username
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
        <>
            <FixedNavigationBar>
                <NavigationBar />
            </FixedNavigationBar>
            <PageWrapper>
                <ContentWrapper>
                    <Container>
                        <Title>Register</Title>
                        <Form onSubmit={handleSubmit}>
                            <InputGroup>
                                <Input type="text" value={firstName} onChange={handleFirstNameChange} placeholder="Nome" />
                            </InputGroup>
                            <InputGroup>
                                <Input type="text" value={lastName} onChange={handleLastNameChange} placeholder="Sobrenome" />
                            </InputGroup>
                            <InputGroup>
                                <Input type="text" value={username} onChange={handleUsernameChange} placeholder="Nome de usuário" />
                            </InputGroup>
                            <InputGroup>
                                <Input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
                            </InputGroup>
                            <InputGroup>
                                <Input type="password" value={password} onChange={handlePasswordChange} placeholder="Senha" />
                            </InputGroup>
                            <ButtonGroup>
                                <Button type="submit" className='bg-gray-600 p-2 px-4'>Register</Button>
                                <Button asChild className='bg-gray-600 p-2 px-4'>
                                    <Link to="/">Voltar</Link>
                                </Button>
                            </ButtonGroup>
                        </Form>
                    </Container>
                </ContentWrapper>
            </PageWrapper>
        </>
    );
}

export default Register;
