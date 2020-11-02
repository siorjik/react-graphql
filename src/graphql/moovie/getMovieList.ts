import { gql } from '@apollo/client';

export default gql`
  query movieList($name: String) {
    movies(name: $name) {
      id
      name
      genre
    }
  }
`;
