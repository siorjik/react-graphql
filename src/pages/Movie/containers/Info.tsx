import React from 'react';
import { withRouter } from 'react-router';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';

import getMovie from '../../../graphql/moovie/getMovie';

interface MatchParams {
  id: string;
}

const Info = (props: RouteComponentProps<MatchParams>) => {
  const { match: { params } } = props;
  const { data: movieData } = useQuery(getMovie, {
    variables: { id: params.id },
  });

  return (
    <>
      <div>
        <p>{movieData && movieData.movie.name} / {movieData && movieData.movie.genre}</p>
      </div>
    </>
  );
};

export default withRouter(Info);
