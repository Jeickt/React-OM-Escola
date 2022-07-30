import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import { Title, Form } from './styled';
import axios from '../../services/axios';
import { rootNavigate } from '../../services/history';
import axiosErrorsHandlerRequest from '../../store/modules/axiosErrorsHandler/actions';
import { Container } from '../../styles/globalStyles';
import Loading from '../../components/Loading';

export default function Fotos() {
  const dispatch = useDispatch();
  const location = useLocation();
  const prevPath = get(location.state, 'prevPath', '/');

  const id = get(useParams(), 'id', 0);

  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);
        setPhoto(get(data, 'Photos[0].url', ''));
        setIsLoading(false);
      } catch (err) {
        if (!dispatch(axiosErrorsHandlerRequest({ err }))) {
          toast.error('Erro ao obter imagem');
        }
      }
      rootNavigate(prevPath);
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const photoURL = URL.createObjectURL(file);

    setPhoto(photoURL);

    const formData = new FormData();
    formData.append('studentId', id);
    formData.append('photo', file);

    try {
      setIsLoading(true);

      await axios.post('/photo/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso!');
      rootNavigate(prevPath);
    } catch (err) {
      if (!dispatch(axiosErrorsHandlerRequest({ err }))) {
        toast.error('Erro ao obter imagem');
      }
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {photo ? <img src={photo} crossOrigin="" alt="Foto" /> : 'Selecionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}
