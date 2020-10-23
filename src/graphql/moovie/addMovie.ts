import { gql } from '@apollo/client';

export default gql`
  mutation addMovie($id: ID!, $name: String!, $genre: String!, $directorId: ID!) {
    addMovie(id: $id, name: $name, genre: $genre, directorId: $directorId) {
      id
      name
      genre
    }
  }
`;
