import { gql } from "@apollo/client";

export const getCategories = gql`
  query getCategories {
    categories {
      name
    }
  }
`;

export const getCurrencies = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;
