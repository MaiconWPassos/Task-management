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

/* Importação de temas e css default */
import GlobalStyles from '../../styles/global';
import theme from '../../styles/themes/theme';

/* Verifica se o usuário já esta logado */
import isConnected from '../../utils/isConnected';

/* Datepicker e Timepicker */
import TimeKeeper from 'react-timekeeper';
import { DatePicker } from '@atlaskit/datetime-picker';

/* Swal, notificações */
import Swal from 'sweetalert2';

import * as Yup from 'yup';

function Task({ match }) {
  const [type, setType] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [showTime, setShowTime] = useState();

  const history = useHistory();

  async function removeTask() {
    Swal.fire({
      title: 'Deseja ralmente deletar esta tarefa?',
      text: 'O processo não poderá ser desfeito!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        api.delete(`/task/${match.params.id}`).then((response) => {
          Swal.fire({
            timer: 1000,
            icon: 'success',
            title: 'Tarefa excluída.',
          });
          history.push('/');
        });
      }
    });
  }

  async function handleSave() {
    // Validação dos dados
    let ValidationSchema = Yup.object().shape({
      title: Yup.string().required('Titulo é obrigatório!'),
      description: Yup.string().required('Descrição é obrigatória!'),
      type: Yup.number().required('Tipo é obrigatório!'),
      date: Yup.string().required('Data é obrigatória!'),
      hour: Yup.string().required('Hora é obrigatória!'),
    });

    ValidationSchema.isValid({
      title,
      description,
      type,
      date,
      hour,
    }).then((valid) => {
      console.log(valid);
      if (valid) {
        if (match.params.id) {
          api
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
          api
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
            });
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Preencha todos os campos!',
        });
      }
    });
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
          <span>Selecione o tipo da tarefa</span>
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

            <Input placeholder={date ? date : 'Data'}>
              <span></span>

              <DatePicker
                id='datepicker'
                onChange={(date) => setDate(date)}
                testId={'datePicker'}
                dateFormat='DD/MM/YYYY'
                selectProps={{
                  placeholder: `${date ? date : 'Data'}`,
                }}
                value={date}
                hideIcon
                locale='pt-BR'
              />
            </Input>

            <Input>
              <span></span>
              <input
                onClick={() => setShowTime(true)}
                type='text'
                placeholder={hour ? hour : 'Hora'}
              />
              {showTime && (
                <TimeKeeper
                  time={hour}
                  onChange={(hour) => setHour(hour.formatted24)}
                  hour24Mode
                  switchToMinuteOnHourSelect
                  closeOnMinuteSelect
                  onDoneClick={() => setShowTime(false)}
                  doneButton={(newTime) => (
                    <div
                      style={{
                        color: '#707070',
                        textAlign: 'center',
                        padding: '10px 0',
                      }}
                      onClick={() => setShowTime(false)}
                    >
                      Fechar
                    </div>
                  )}
                />
              )}
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
