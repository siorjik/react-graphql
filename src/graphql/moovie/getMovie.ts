import { gql } from '@apollo/client';

export default gql`
  query movieData($id: ID!) {
    movie(id: $id) {
      id
      name
      genre
      director {
        id
        name
        age
      }
    }
  }
`;
