import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { List, Empty, Button, Modal, Form, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

import GET_MOVIE_LIST from '../../../graphql/moovie/getMovieList';
import ADD_MOVIE from '../../../graphql/moovie/addMovie';
import DELETE_MOVIE from '../../../graphql/moovie/deleteMovie';

import MovieForm from '../components/MovieForm';

import { MovieType } from '../../../utils/types';

const MovieList = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { data, loading } = useQuery(GET_MOVIE_LIST);
  const movies = data && data.movies;

  const [addMovie] = useMutation(ADD_MOVIE, {
    update: (cache, { data: { addMovie } }) => {
      cache.writeQuery({
        query: GET_MOVIE_LIST,
        data: { movies: [...data.movies, addMovie] }
      });
    },
  });

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    update: (cache, { data: { deleteMovie } }) => {
      cache.writeQuery({
        query: GET_MOVIE_LIST,
        data: { movies: data.movies.filter((el: MovieType) => +el.id !== +deleteMovie.id) }
      });
    },
  });

  const randomId = Math.floor(Math.random() * 101);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        addMovie({ variables: { id: randomId, ...values } });
        setVisible(false);
      })
      .catch(info => {
        console.log(info);
      });
  };

  const remove = (id: string) => {
    deleteMovie({ variables: { id } });
  };

  return (
    <>
      <div className="container">
        {loading && <div className="middle"><Spin /></div>}

        {!loading && movies && movies.length ?
          <List
            header={<div className="flex jc-sb ai-c"><h2>Movies:</h2> <Button type="primary" onClick={() => setVisible(true)}>Add new</Button></div>}
            bordered
            dataSource={data.movies}
            renderItem={(item: MovieType) => (
              <List.Item actions={[<DeleteOutlined className="icon" onClick={() => remove(item.id)} />]}>
                <div>
                  <p>{item.name}</p>
                  <Button type="default"><NavLink to={`/movie/${item.id}`}>Go to movie</NavLink></Button>
                </div>
              </List.Item>
            )}
          /> : <div className="middle"><Empty /></div>}
      </div>

      <Modal
        title="Add Movie"
        visible={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        onOk={handleOk}
      >
        <MovieForm onFinish={handleOk} form={form} />
      </Modal>
    </>
  );
};

export default MovieList;
