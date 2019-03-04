import React from 'react';
import { Spring, animated, interpolate } from 'react-spring/renderprops.cjs';

export default class extends React.PureComponent {
  state = { screenHeight: 0, screenWidth: 0, pageHeight: 0, pageWidth: 0, scrollTop: 0 };

  componentDidMount() {
    window.document.body.addEventListener('wheel', this.onWheel);
    window.document.body.addEventListener('touchstart', this.onTouchStart);
    window.document.body.addEventListener('resize', this.onResize);
    this.onWheel();
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('wheel', this.onWheel);
    window.document.body.removeEventListener('touchstart', this.onTouchStart);
    window.document.body.removeEventListener('resize', this.onResize);
  }

  onTouchStart = event => {
    this.onWheel(event);
  }

  onWheel = event => {
    this.setState({
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
      pageOffsetTop: this.pageRef.offsetTop,
      pageHeight: this.pageRef.clientHeight,
      scrollTop: window.pageYOffset,
    })
  };

  onResize = event => {
    this.setState({
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
      pageHeight: this.pageRef.clientHeight,
      pageWidth: this.pageRef.clientWidth,
      scrollTop: 0
    })
  }

  render = ({ isMobile } = this.props) => {

    return (
      <div className="page1" ref={e => (this.pageRef = e)}>
        <Spring native from={
          {
            value: 1,
            opacity: 0,
          }
        }
          to={
            {
              value: 0,
              opacity: 1,
            }
          }
          delay={500}>
          {({ value, opacity }) => (
            <animated.div
              style={{
                transform: interpolate([value], v => `translateY(${-v * 100}%) rotateX(${-v * 90}deg)`),
                transformOrigin: 'center',
                opacity: interpolate([opacity], s => s),
                width: isMobile ? '100%' : '30%',
                margin: '0 auto',
                top: '50%',
                background: 'rgba(255, 255, 255, .4)',
              }}
            >
              <h1
                className="desctext"
                style={{
                  color: '#FFF',
                }}
              >
                Hi, I am Bruce Xu!
          </h1>
            </animated.div>
          )}
        </Spring>
        <style jsx>
          {`
             {
              .page1,
              .page2,
              .page3 {
                width: 100%;
                height: 100%;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .desctext {
                line-height: 4rem;
                text-align: center;
                cursor: pointer;
              }
            }
          `}
        </style>
      </div>
    );
  };
}
