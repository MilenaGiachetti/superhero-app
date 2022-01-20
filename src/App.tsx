import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Home from './views/Home';
import Hero from './views/Hero';

const Header = styled.header`
  background-color: #d62828;
  color: #fff;
`

const TitleContainer = styled.div`
  max-width: 1200px;
  padding: 1rem 1rem;
  margin: 0 auto;
`

const Title = styled(Link)`
  color: #fff;
  display:inline-block;
  text-decoration: none;
  &:visited, &:active {
    color: #fff;
  }
`

const Main = styled.main`
  min-height: calc(100vh - 129px);
  max-width: 1200px;
  padding: 0 1rem;
  margin: 0 auto;
`

const Footer = styled.footer`
  background-color: #000;
  color: #fff;
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
      <Header>
        <TitleContainer>
          <Title to="/">
            <h1>Superhero App</h1>
          </Title>
        </TitleContainer>
      </Header>
      <Main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/hero/:id" element={<Hero />}/>
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