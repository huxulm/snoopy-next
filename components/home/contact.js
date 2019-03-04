import React from 'react';
import { Spring, animated, interpolate, Trail, Transition } from 'react-spring/renderprops.cjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

const SendButton = styled.button`
  font-size: 48px;
  color: #FFF;
  background: rgba(0, 0, 0, .85);
  transition: 500ms ease all;
  padding: 4px;
  border: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  float: right;
  width: 120px;
  height: 48px;
  :hover {
    color: #000;
    background: rgba(0, 0, 0, .15);
  }
`;

const SendInput = styled.input`
  background: rgba(255, 255, 255, .4);
  padding: 0 .75rem;
  border: none;
  cursor: text;
  box-sizing: border-box;
  width: 100%;
  font-size: 2em;
`;

const SendText = styled.textarea`
  background: rgba(255, 255, 255, .4);
  padding: 0 .75rem;
  border: none;
  cursor: text;
  box-sizing: border-box;
  width: 100%;
  font-size: 1em;
`;

export default class extends React.PureComponent {
  state = { screenHeight: 0, screenWidth: 0, pageHeight: 0, pageWidth: 0, scrollTop: 0 };
  componentDidMount() {
    window.document.body.addEventListener('wheel', this.onWheel);
    window.document.body.addEventListener('touchstart', this.onTouchStart);
    window.document.body.addEventListener('scroll', this.onTouchStart);
    window.document.body.addEventListener('resize', this.onResize);
    this.onWheel();
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('wheel', this.onWheel);
    window.document.body.removeEventListener('touchstart', this.onTouchStart);
    window.document.body.removeEventListener('scroll', this.onTouchStart);
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
    });
  };

  onResize = event => {
    this.setState({
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
      pageHeight: this.pageRef.clientHeight,
      pageOffsetTop: this.pageRef.offsetTop,
      scrollTop: 0,
    });
  };

  render = ({ isMobile } = this.props) => {
    const { scrollTop, pageOffsetTop } = this.state;
    const showContact = scrollTop >= this.state.pageHeight + 300;
    const showIntrotext = scrollTop >= 30 * 10 + 20;
    return (
      <div className="page3" ref={e => (this.pageRef = e)}>
        <div className="contact">
          {showContact && (
            <Trail
              items={[0, 1].map(e => ({ key: e }))}
              keys={[0, 1]}
              native
              from={{
                transform: 'translateY(180px)',
                opacity: 0,
              }}
              to={{
                transform: 'translateY(0)',
                opacity: 1,
              }}
            >
              {item => props => (
                <animated.div
                  style={{
                    ...props,
                  }}
                  key={item.key}
                >
                  {item.key === 0 && <h1 key={'c_' + 0}>Contact</h1>}
                  {item.key === 1 && <div key={'c_' + 1} className="send-msg">
                    <div className="input">
                      <h3>Name</h3>
                      <SendInput />
                      <h3>E-mail</h3>
                      <SendInput />
                      <h3>Message</h3>
                      <SendText rows={5}/>
                    </div>
                    <SendButton className="send-btn">
                      <FontAwesomeIcon icon={faLocationArrow} style={{
                        color: 'white', height: '50%',
                        width: '50%'
                      }} size={'xs'} />
                    </SendButton>
                  </div>}
                </animated.div>
              )}
            </Trail>
          )}
        </div>
        <style jsx>
          {`
             {
              .page1,
              .page2,
              .page3 {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .page3 {
                height: auto;
                min-height: 100vh;
                background: rgba(255, 255, 255, .4);
              }
              .contact {
                position: absolute;
                top: 0;
                width: 100%;
                height: 500px;
                // display: flex;
              }

              .send-msg {
                width: 50%;
                margin: 0 auto;
                padding: 5%;
                // height: 20rem;
                background: rgba(255, 255, 255, .5);
                overflow: hidden;
                box-sizing: border-box;
              }

              @media(max-width: 764px) {
                .send-msg {
                  width: 100%;
                }  
              }

              .contact h1 {
                color: white;
                padding: 5%;
              }

              .introtext {
                height: 15em;
                // background: rgba(255, 255, 255, .4);
                width: 100vw;
                top: 15em;
                position: absolute;
                padding: 5%;
                box-sizing: border-box;
                display: flex;
              }

              @media(max-width: 764px) {
                .contact h1, .introtext {
                  padding: 2rem;
                  // padding: 5%;
                }
                .introtext .desc {
                  width: '100%', text-align: 'center', margin: '0 auto'
                }
              }
              
            }
          `}
        </style>
      </div>
    );
  };
}
