import React from 'react';
import { useQuery } from '@apollo/client';
import { List } from 'antd';
import { NavLink } from 'react-router-dom';

import getMovieList from '../../../graphql/moovie/getMovieList';

const MovieList = () => {
  const { data } = useQuery(getMovieList);

  type movieType = {
    id: string,
    name: string,
    genre: string,
  }

  return (
    <>
      <List
        header={<h3>Movies:</h3>}
        bordered
        dataSource={data && data.movies}
        renderItem={(item: movieType) => (
          <List.Item>
            <div>
              <p>Name: {item.name}</p>
              <p>Genre: {item.genre}</p>
              <NavLink to={`/movie/${item.id}`}>Go to movie --{">"}</NavLink>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default MovieList;
