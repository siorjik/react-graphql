import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
import { Card, Breadcrumb, Button, Modal, Form } from 'antd';
import { NavLink } from 'react-router-dom';

import GET_MOVIE from '../../../graphql/moovie/getMovie';
import UPDATE_MOVIE from '../../../graphql/moovie/updateMovie';

import MovieForm from '../components/MovieForm';

type MatchParams = { id: string };

const Info = (props: RouteComponentProps<MatchParams>) => {
  const { match: { params } } = props;

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { data } = useQuery(GET_MOVIE, {
    variables: { id: params.id },
  });

  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    update: (cache, { data: { updateMovie } }) => {
      cache.writeQuery({
        query: GET_MOVIE,
        data: { movie: updateMovie }
      });
    },
  });

  const movie = data && data.movie;

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        updateMovie({ variables: { id: params.id, ...values } });
        setVisible(false);
      })
      .catch(info => {
        console.log(info);
      });
  };

  const showModal = () => {
    form.setFieldsValue({
      name: movie.name,
      genre: movie.genre,
      directorId: movie.director.id,
    });

    setVisible(true);
  };

  return (
    <>
      <div className="container">
        <Breadcrumb>
          <Breadcrumb.Item><NavLink to="/">List</NavLink></Breadcrumb.Item>
          <Breadcrumb.Item>Info</Breadcrumb.Item>
        </Breadcrumb>


        {
          movie && <Card title="Movie info:" extra={<Button type="primary" onClick={showModal}>Edit</Button>}>
            <p>Name: {movie.name}</p>
            <p>Genre: {movie.genre}</p>
            <p>Director: {movie.director.name}</p>
          </Card>
        }
      </div>

      <Modal
        title="Edit Movie"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleOk}
      >
        <MovieForm onFinish={handleOk} form={form} />
      </Modal>
    </>
  );
};

export default withRouter(Info);
