import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import { FaUserCircle, FaEdit, FaLock } from 'react-icons/fa';

import { Form, ProfilePicture, Locker } from './styled';
import axios from '../../services/axios';
import { rootNavigate } from '../../services/history';
import axiosErrorsHandlerRequest from '../../store/modules/axiosErrorsHandler/actions';
import { Container } from '../../styles/globalStyles';
import Loading from '../../components/Loading';

export default function Student() {
  const dispatch = useDispatch();

  const id = get(useParams(), 'id', 0);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (id) {
        try {
          setIsLoading(true);
          const student = await (await axios.get(`/students/${id}`)).data;
          setName(student.name);
          setLastName(student.lastName);
          setEmail(student.email);
          setAge(student.age);
          setHeight(student.height);
          setWeight(student.weight);
          setPhoto(get(student, 'Photos[0].url', ''));
          setIsLoading(false);
        } catch (err) {
          if (!dispatch(axiosErrorsHandlerRequest({ err }))) {
            toast.error('Falha no carregamento do aluno');
          }
          setIsLoading(false);
          rootNavigate('/');
        }
      }
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('O nome deve ter entre 3 e 255 caracteres');
    }

    if (lastName.length < 3 || lastName.length > 255) {
      formErrors = true;
      toast.error('O sobrenome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido');
    }

    if (!isInt(String(age))) {
      formErrors = true;
      toast.error('A idade precisa ser um número inteiro');
    }

    if (!isFloat(String(height))) {
      formErrors = true;
      toast.error('A altura precisa ser um número');
    }

    if (!isFloat(String(weight))) {
      formErrors = true;
      toast.error('O peso precisa ser um número');
    }

    if (!formErrors) {
      try {
        setIsLoading(true);

        if (id) {
          await axios.put(`/students/${id}`, {
            name,
            lastName,
            email,
            age,
            height,
            weight,
          });
          toast.success('Aluno(a) editado(a) com sucesso!');
        } else {
          await axios.post(`/students`, {
            name,
            lastName,
            email,
            age,
            height,
            weight,
          });
          toast.success('Aluno(a) criado(a) com sucesso!');
        }

        rootNavigate('/');
      } catch (err) {
        if (!dispatch(axiosErrorsHandlerRequest({ err }))) {
          if (id) {
            toast.error('Erro na edição de aluno');
          } else {
            toast.error('Erro ao cadastrar aluno');
          }
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar aluno:' : 'Novo aluno:'}</h1>

      <ProfilePicture>
        {photo ? (
          <img src={photo} crossOrigin="" alt={name} />
        ) : (
          <FaUserCircle size={180} />
        )}
        {id ? (
          <Link to={`/photo/${id}`}>
            <FaEdit size={24} />
          </Link>
        ) : (
          <Locker>
            <FaLock size={24} />
          </Locker>
        )}
      </ProfilePicture>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Informe o nome"
          />
        </label>
        <label htmlFor="lastName">
          Sobrenome:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Informe o sobrenome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Informe o e-mail"
          />
        </label>
        <label htmlFor="age">
          Idade:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Informe a idade"
          />
        </label>
        <label htmlFor="height">
          Altura:
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value.replace(',', '.'))}
            placeholder="Informe a altura"
          />
        </label>
        <label htmlFor="age">
          Peso:
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value.replace(',', '.'))}
            placeholder="Informe o peso"
          />
        </label>
        <button type="submit">{id ? 'Editar aluno' : 'Cadastrar aluno'}</button>
      </Form>
    </Container>
  );
}
