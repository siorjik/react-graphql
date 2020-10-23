import { gql } from '@apollo/client';

export default gql`
  query MovieList {
    movies {
      id
      name
      genre
    }
  }
`;
