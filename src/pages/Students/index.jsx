import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import axios from '../../services/axios';
import axiosErrorsHandlerRequest from '../../store/modules/axiosErrorsHandler/actions';
import { Container } from '../../styles/globalStyles';
import { StudentContainer, ProfilePicture, NewStudent } from './styled';
import Loading from '../../components/Loading';

export default function Students() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(0);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/students');
      setStudents(response.data);
      setIsLoading(false);
    }

    getData();
  }, [loadingStudents]);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDeleteConfirm = async (id) => {
    if (isLoggedIn) {
      try {
        setIsLoading(true);
        await axios.delete(`/students/${id}`);
        setLoadingStudents(loadingStudents + 1);
      } catch (err) {
        if (!dispatch(axiosErrorsHandlerRequest({ err }))) {
          toast.error('Erro ao excluir aluno');
        }
        setIsLoading(false);
      }
    } else {
      toast.error('Você deve estar logado para excluir aluno');
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <NewStudent to="/student">Novo aluno</NewStudent>

      <StudentContainer>
        {students.map((student) => (
          <div key={String(student.email)}>
            <ProfilePicture>
              {get(student, 'Photos[0].url', false) ? (
                <img crossOrigin="" src={student.Photos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span>{student.name}</span>
            <span>{student.email}</span>

            <Link to={`/student/${student.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link
              onClick={handleDeleteAsk}
              to={`/student/${student.id}/delete`}
            >
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              onClick={() => handleDeleteConfirm(student.id)}
              size={16}
              display="none"
              cursor="pointer"
            />
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
