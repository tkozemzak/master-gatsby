import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import "normalize.css";
import GlobalStyles from '../styles/GlobalStyles';
import Typography from "../styles/Typography";
import { styled } from 'styled-components';

const ContentStyles = styled.div`

`;

const Layout = ({ children }) => {
  return (
    <div>
      <GlobalStyles/>
      <Typography/>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
