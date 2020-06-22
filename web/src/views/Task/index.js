import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

/* Api */
import api from '../../services/api';

/* Components */
import Header from '../../components/Header';
import Footer from '../../components/Footer';

/* Icons */
import typeIcons from '../../utils/typeIcons';

/* Styles */
import {
  Container,
  Form,
  TypeIcons,
  Input,
  TextArea,
  Options,
  Save,
} from './styles';
import GlobalStyles from '../../styles/global';
import theme from '../../styles/themes/theme';

import isConnected from '../../utils/isConnected';

function Task({ match }) {
  const [type, setType] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();

  const history = useHistory();

  async function removeTask() {
    const res = window.confirm('Deseja realmente remover a tarefa?');

    if (res) {
      await api
        .delete(`/task/${match.params.id}`)
        .then((response) => {
          history.push('/');
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  async function handleSave() {
    // Validação dos dados

    if (!title) return alert('Você precisa informar o título da tarefa');
    else if (!description)
      return alert('Você precisa informar a descrição da tarefa');
    else if (!type) return alert('Você precisa selecionar o tipo da tarefa');
    else if (!date)
      return alert('Você precisa escolher uma data para a tarefa');
    else if (!hour)
      return alert('Você precisa escolher um horário para a tarefa');

    if (match.params.id) {
      await api
        .put(`/task/${match.params.id}/${isConnected}`, {
          macaddress: isConnected,
          done,
          type,
          title,
          description,
          when: `${date}T${hour}:00.000`,
        })
        .then(history.push('/'))
        .catch((error) => {
          alert(error);
        });
    } else {
      await api
        .post(`/task`, {
          macaddress: '11:11:11:11:11:11',
          type,
          title,
          done,
          description,
          when: `${date}T${hour}:00.000`,
          userId: parseInt(isConnected, 10),
        })
        .then((response) => {
          history.push('/');
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  useEffect(() => {
    async function LoadTaskDetail() {
      await api
        .get(`/task/${match.params.id}`)
        .then((response) => {
          setType(parseInt(response.data.type), 10);
          setDone(response.data.done);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setDate(format(new Date(response.data.when), 'yyyy-MM-dd'));
          setHour(format(new Date(response.data.when), 'HH:mm'));
        })
        .catch((error) => {
          alert(error);
        });
    }
    if (match.params.id) {
      LoadTaskDetail();
    }
  }, [match.params.id]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>
          <Header />

          <Form>
            <TypeIcons>
              {typeIcons.map(
                (icon, index) =>
                  index > 0 && (
                    <button
                      key={index}
                      type='button'
                      onClick={() => setType(index)}
                    >
                      <img
                        src={icon}
                        alt='Tipo da Tarefa'
                        className={type && type !== index ? 'inative' : ''}
                      />
                    </button>
                  )
              )}
            </TypeIcons>

            <Input>
              <span></span>
              <input
                type='text'
                placeholder='Tutulo da Tarefa'
                onChange={(e) => setTitle(e.target.value)}
                value={title || ''}
              />
            </Input>

            <TextArea>
              <span></span>
              <textarea
                rows={5}
                placeholder='Detalhes da Tarefa'
                onChange={(e) => setDescription(e.target.value)}
                value={description || ''}
              />
            </TextArea>

            <Input>
              <span></span>
              <input
                type='date'
                placeholder='Data'
                onChange={(e) => setDate(e.target.value)}
                value={date || ''}
              />
            </Input>

            <Input>
              <span></span>
              <input
                type='time'
                placeholder='Relógio'
                onChange={(e) => setHour(e.target.value)}
                value={hour || ''}
              />
            </Input>

            <Options>
              <div>
                <input
                  type='checkbox'
                  checked={done}
                  onChange={() => setDone(!done)}
                />
                <span>CONCLUÍDO</span>
              </div>

              {match.params.id && (
                <button onClick={removeTask} type='button'>
                  EXCLUIR
                </button>
              )}
            </Options>

            <Save>
              <button onClick={handleSave} type='button'>
                SALVAR
              </button>
            </Save>
          </Form>

          <Footer />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Task;
