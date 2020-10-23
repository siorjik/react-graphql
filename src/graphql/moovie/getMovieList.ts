import { gql } from '@apollo/client';

export default gql`
  query movieList {
    movies {
      id
      name
      genre
    }
  }
`;
