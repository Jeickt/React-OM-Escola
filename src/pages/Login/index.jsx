import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { isEmail } from 'validator';

import * as actions from '../../store/modules/auth/actions';
import axiosErrorsHandlerRequest from '../../store/modules/axiosErrorsHandler/actions';
import { Container } from '../../styles/globalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const prevPath = get(location.state, 'prevPath', '/');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('A senha precisa ter entre 6 e 50 caracteres');
    }

    if (!formErrors) {
      try {
        dispatch(actions.loginRequest({ email, password, prevPath }));
      } catch (err) {
        if (!dispatch(axiosErrorsHandlerRequest({ err }))) {
          toast.error('Falha no acesso de usuário');
        }
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
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
        <button type="submit">Acessar minha conta</button>
      </Form>
    </Container>
  );
}
