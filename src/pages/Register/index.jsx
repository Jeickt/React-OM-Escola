import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';

import * as actions from '../../store/modules/register/actions';
import { Container } from '../../styles/globalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';

export default function Register() {
  const dispatch = useDispatch();
  const {
    id,
    name: nameStored,
    email: emailStored,
    isLoading,
  } = useSelector((state) => state.auth.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');

  useEffect(() => {
    if (id) {
      setName(nameStored);
      setEmail(emailStored);
      setOriginalEmail(emailStored);
    }
  }, [id, nameStored, emailStored]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('O nome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('A senha precisa ter entre 6 e 50 caracteres');
    }

    if (!formErrors) {
      dispatch(
        actions.registerRequest({ id, name, email, password, originalEmail })
      );
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar dados da conta' : 'Crie sua conta'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>
        <button type="submit">
          {id ? 'Editar conta' : 'Criar minha conta'}
        </button>
      </Form>
    </Container>
  );
}
