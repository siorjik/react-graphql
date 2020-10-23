import { gql } from '@apollo/client';

export default gql`
  query MovieData($id: ID!) {
    movie(id: $id) {
      id
      name
      genre
    }
  }
`;
