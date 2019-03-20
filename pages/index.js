import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Spring, animated, interpolate } from 'react-spring/renderprops.cjs';
import Page from '../components/page';
import { MediaQueryConsumer } from '../components/media-query';
import CanvasBackground from '../components/canvas-background';
import Intro from '../components/home/intro';
import Profile from '../components/home/profile';
import Contact from '../components/home/contact';
import Footer from '../components/footer';

const MainContainer = styled.div`
  z-index: 1;
`;

const ColorBlock = styled.div`
  height: auto;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  background: ${props => props.color || 'rgba(0, 0, 0, .5)'};
  z-index: 1;
`;

export default class extends React.PureComponent {

  render = () => {
    return (
      <Page title="Bruce Xu">
        <MediaQueryConsumer>
          {({ isMobile }) => (
            <>
            <CanvasBackground isMobile={isMobile}/>
            <MainContainer>
              <ColorBlock color="rgba(255, 56, 255, .2)">
                <Intro isMobile={isMobile} />
              </ColorBlock>
              <ColorBlock color="rgba(124, 124, 124, .2)">
                <Profile isMobile={isMobile} />
              </ColorBlock>
              <ColorBlock color="rgba(78, 128, 33, 0)">
                <Contact isMobile={isMobile}/>
              </ColorBlock>
              <Footer />
            </MainContainer>
            </>
          )}
        </MediaQueryConsumer>
      </Page>
    );
  }
};
