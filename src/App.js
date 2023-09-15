import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

// page & layout imports
import Homepage from './pages/Homepage'
import ReviewDetails from './pages/ReviewDetails'
import Category from './pages/Category'
import SiteHeader from "./components/SiteHeader"

// apollo client
const client = new ApolloClient({
  uri: process.env.REACT_APP_DB_URL,
  cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes>
          <Route path="/" element={<SiteHeader />} >
            <Route index element={<Homepage />}/>
            <Route path="details">
              <Route path=':id' element={<ReviewDetails />} />
            </Route>
            <Route path="category">
              <Route path=':id' element={<Category />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App