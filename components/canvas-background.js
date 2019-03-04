import React from 'react';
import Trianglify from 'trianglify';
import { MediaQueryConsumer } from '../components/media-query';
import styled from 'styled-components';

const Container = styled.div`
  background: black;
  height: 100%;
  width: 100%;
  color: white;
  position: fixed;
  z-index: 0;
`;

export default class extends React.PureComponent {
  componentDidMount() {
    this.resetBg();
    this.internal = setInterval(() => this.switchPattern(this.props.isMobile), 60000);
    this.notifyColorChanged(this.pattern.polys);
    document.body.addEventListener('resize', this.resetBg())
  }
  componentWillUnmount() {
    clearInterval(this.internal);
  }

  resetBg() {
    this.pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cell_size: window.innerWidth / 10,
    });
    this.pattern.canvas(this.bg1);
    this.notifyColorChanged(this.pattern.polys);
  }

  notifyColorChanged(polys) {
    if (this.props.onBackgroundChanged) {
      this.props.onBackgroundChanged(polys[0]);
    }
  }

  switchPattern(isMobile) {
    if (isMobile) {
      if (!this.pattern2) {
        this.pattern2 = Trianglify({
          width: window.innerWidth,
          height: window.innerHeight,
          cell_size: this.pattern.opts.cell_size < 120? 120 : this.pattern.opts.cell_size,
        });
        this.pattern2.canvas(this.bg2);
        this.notifyColorChanged(this.pattern2.polys);
      }
    } else {
      this.resetBg();
    }
  }

  render() {
    return (
      <MediaQueryConsumer>
        {({ isMobile }) => {
          if(typeof window !== 'undefined') {
            console.log(window.innerHeight + '_' + window.innerWidth);
            this.switchPattern(isMobile);
          }
          return <Container>
            <canvas ref={e => (this.bg1 = e)} className={`bg ${isMobile? 'hidden': ''}`} style={{ zIndex: 1 }}></canvas>
            <canvas ref={e => (this.bg2 = e)} className={`bg ${!isMobile? 'hidden': ''}`} style={{ zIndex: 0 }}></canvas>
            <style jsx>
              {`
                .bg {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  z-index: 0;
                  opacity: 1;
                  transition: 1s ease all;
                }
                .bg.hidden {
                  display: none;
                  opacity: 0;
                }
              `}
            </style>
          </Container>
        }}
      </MediaQueryConsumer>
    )
  }
}