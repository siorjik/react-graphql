import { gql } from '@apollo/client';

export default gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      id
      name
      genre
    }
  }
`;
