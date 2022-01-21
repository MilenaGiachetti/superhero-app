import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Home from './views/Home';
import Hero from './views/Hero';
import { Suspense } from 'react';
import NotFound from './views/NotFound';
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
  }
  img {
    vertical-align: bottom;
  }
  ul {
    list-style: none;
  }
  button {
    border: none;
    background: none;
  }
`;

const Header = styled.header`
  background-color: #000;
  color: #fff;
  max-width: 2200px;
	margin: 0 auto;
`

const TitleContainer = styled.div`
  max-width: 1200px;
  padding: 1rem 1rem;
  margin: 0 auto;
`

const Title = styled(Link)`
  color: #fff;
  display:inline-block;
  font-size: 0.75rem;
  text-decoration: none;
  &:visited, &:active {
    color: #fff;
  }
`

const Main = styled.main`
  min-height: calc(100vh - 119px);
`

const Footer = styled.footer`
  background-color: #000;
  color: #fff;
  max-width: 2200px;
	margin: 0 auto;
`
const FooterContent = styled.p`
  text-align: right;
  max-width: 1200px;
  padding: 1rem 1rem;
  margin: 0 auto;
`

const CustomLink = styled.a`
  color: #EE964B;
  &:visited, &:active {
    color: rgba(238, 150, 75, 0.95);
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header>
        <TitleContainer>
          <Title to="/">
            <h1>Superhero App</h1>
          </Title>
        </TitleContainer>
      </Header>
      <Main>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<>...</>}>
              <Home />
            </Suspense>
          }/>
          <Route path="/hero/:id" element={
            <Suspense fallback={<>...</>}>
              <Hero />
            </Suspense>
          }/>
          <Route path="*" element={
            <Suspense fallback={<>...</>}>
              <NotFound />
            </Suspense>
          }/>
        </Routes>
      </Main>
      <Footer>
        <FooterContent>
          Developed by <CustomLink href='https://www.linkedin.com/in/milena-giachetti/' rel='no-rel' target='_blank'>Milena Giachetti</CustomLink>
        </FooterContent>
      </Footer>
    </>
  );
}

export default App;