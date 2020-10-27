import { gql } from '@apollo/client';

export default gql`
  mutation updateMovie($id: ID!, $name: String!, $genre: String!, $directorId: ID!) {
    updateMovie(id: $id, name: $name, genre: $genre, directorId: $directorId) {
      id
      name
      genre
      director {
        name
        age
      }
    }
  }
`;
