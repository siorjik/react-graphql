import { gql } from '@apollo/client';

export default gql`
  query directorList {
    directors {
      id
      name
      age
    }
  }
`;
