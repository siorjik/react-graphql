import React from 'react';
import { withRouter } from 'react-router';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
import { Card, Breadcrumb } from 'antd';
import { NavLink } from 'react-router-dom';

import GET_MOVIE from '../../../graphql/moovie/getMovie';

type matchParams = {
  id: string;
}

const Info = (props: RouteComponentProps<matchParams>) => {
  const { match: { params } } = props;
  const { data } = useQuery(GET_MOVIE, {
    variables: { id: params.id },
  });

  const movie = data && data.movie;

  return (
    <>
      <div className="container">
        <Breadcrumb>
          <Breadcrumb.Item><NavLink to="/">List</NavLink></Breadcrumb.Item>
          <Breadcrumb.Item>Info</Breadcrumb.Item>
        </Breadcrumb>


        {movie && <Card title="Movie info:">
          <p>Name: {movie.name}</p>
          <p>Genre: {movie.genre}</p>
          <p>Director: {movie.director.name}</p>
        </Card>}
      </div>
    </>
  );
};

export default withRouter(Info);
