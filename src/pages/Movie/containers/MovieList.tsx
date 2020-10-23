import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { List, Empty, Button, Modal, Form, Input } from 'antd';
import { NavLink } from 'react-router-dom';

import GET_MOVIE_LIST from '../../../graphql/moovie/getMovieList';
import ADD_MOVIE from '../../../graphql/moovie/addMovie';
import DELETE_MOVIE from '../../../graphql/moovie/deleteMovie';

const MovieList = () => {
  const { data } = useQuery(GET_MOVIE_LIST);
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
        data: { movies: data.movies.filter((el: movieType) => +el.id !== +deleteMovie.id) }
      });
    },
  });

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  type movieType = {
    id: string,
    name: string,
    genre: string,
  }

  const handleOk = () => {
    const formValues = form.getFieldsValue();
    const values = { id: 9, directorId: 2, ...formValues };

    addMovie({ variables: { ...values } });
    setVisible(false);
  };

  const remove = (id: string) => {
    deleteMovie({
      variables: { id },
    });
  };

  return (
    <>
      <div className="container">
        {movies && movies.length ?
          <List
            header={<div className="flex jc-sb ai-c"><h2>Movies:</h2> <Button type="primary" onClick={() => setVisible(true)}>Add new</Button></div>}
            bordered
            dataSource={data.movies}
            renderItem={(item: movieType) => (
              <List.Item actions={[<Button type="primary" onClick={() => remove(item.id)}>Delete</Button>]}>
                <div>
                  <p>{item.name}</p>
                  <Button type="default"><NavLink to={`/movie/${item.id}`}>Go to movie</NavLink></Button>
                </div>
              </List.Item>
            )}
          /> : <Empty />}
      </div>

      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Form name="movie" onFinish={handleOk} layout="vertical" form={form}>
          <Form.Item label="Name:" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Genre:" name="genre">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MovieList;
