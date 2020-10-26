import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { List, Empty, Button, Modal, Form, Input, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

import GET_MOVIE_LIST from '../../../graphql/moovie/getMovieList';
import ADD_MOVIE from '../../../graphql/moovie/addMovie';
import DELETE_MOVIE from '../../../graphql/moovie/deleteMovie';
import GET_DIRECTOR_LIST from '../../../graphql/director/getDirectorList';

const { Option } = Select;

const MovieList = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const { data } = useQuery(GET_MOVIE_LIST);
  const movies = data && data.movies;

  const { data: directorList } = useQuery(GET_DIRECTOR_LIST);
  const directors = directorList && directorList.directors;

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

  type MovieType = {
    id: string,
    name: string,
    genre: string,
  }

  type DirectorType = {
    id: string,
    name: string,
    age: string,
  }

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
        {movies && movies.length ?
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
          /> : <Empty />}
      </div>

      <Modal
        title="Basic Modal"
        visible={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        onOk={handleOk}
      >
        <Form name="movie" onFinish={handleOk} layout="vertical" form={form}>
          <Form.Item label="Name:" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Genre:" name="genre" rules={[{ required: true, message: 'Please input genre!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Director:" name="directorId" rules={[{ required: true, message: 'Please input director!' }]}>
            <Select>
              {
                directors && directors.map((el: DirectorType) => <Option key={el.id} value={el.id}>{el.name}</Option>)
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MovieList;
