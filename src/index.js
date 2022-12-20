import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Provider } from "react-redux";
import getStore from "./store";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`Graphql error, message: ${message}, location: ${location}, path: ${path}`);
    });
  } else if (networkError){
    console.log("Network error: ", networkError);
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

getStore.then((store) => {
  root.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <App />
          </Layout>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
});
