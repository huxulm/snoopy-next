import React from 'react';
import Head from 'next/head';
import { animated, Trail } from 'react-spring/renderprops.cjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

const SendButton = styled.button`
  font-size: 48px;
  color: #fff;
  background: rgba(0, 0, 0, 0.85);
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
    background: rgba(0, 0, 0, 0.15);
  }
`;

const SendInput = styled.input`
  background: rgba(255, 255, 255, 0.4);
  padding: 0 0.75rem;
  border: none;
  cursor: text;
  box-sizing: border-box;
  width: 100%;
  font-size: 2em;
`;

const SendText = styled.textarea`
  background: rgba(255, 255, 255, 0.4);
  padding: 0 0.75rem;
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
    // this.initLocation();
    this.initLocationAMap();
  }

  componentWillUnmount() {
    window.document.body.removeEventListener('wheel', this.onWheel);
    window.document.body.removeEventListener('touchstart', this.onTouchStart);
    window.document.body.removeEventListener('scroll', this.onTouchStart);
    window.document.body.removeEventListener('resize', this.onResize);
  }

  initLocation() {
    // 百度地图API功能
    var map = new BMap.Map('mapContainer');
    var point = new BMap.Point(116.783848, 31.309519);
    map.centerAndZoom(point, 15);
    var marker = new BMap.Marker(point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    var opts = {
      width: 160, // 信息窗口宽度
      height: 25, // 信息窗口高度
      // title : "Contact"  // 信息窗口标题
    };
    var infoWindow = new BMap.InfoWindow('TEL: 18616777015', opts); // 创建信息窗口对象
    map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口
  }

  initLocationAMap() {
    if (typeof AMap === 'undefined') return;
    var map = new AMap.Map('aMapContainer', {
      center: [116.783848, 31.309519],
      zoom: 12,
      features: ['bg', 'road', 'building', 'point'],
    });
    var marker = new AMap.Marker({
      position: new AMap.LngLat(116.777454, 31.34034),
      title: '万佛湖镇',
    });
    marker.setMap(map);
  }

  onTouchStart = event => {
    this.onWheel(event);
  };

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
    const showIntrotext = scrollTop >= 30 * 80 + 20;
    return (
      <>
        <script
          type="text/javascript"
          src="https://webapi.amap.com/maps?v=1.4.13&key=f676a2d54c6f60886e0c5bdfbd235e74"
        />
        <div className="page3" ref={e => (this.pageRef = e)}>
          <h1 key={'c_' + 0}>Contact</h1>
          <div className="info-wrapper">
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
                      {item.key === 0 && <h3 key={'c_' + 0}>Send Message</h3>}
                      {item.key === 1 && (
                        <div key={'c_' + 1} className="send-msg">
                          <div className="input">
                            <h3>Name</h3>
                            <SendInput />
                            <h3>E-mail</h3>
                            <SendInput />
                            <h3>Message</h3>
                            <SendText rows={5} />
                          </div>
                          <SendButton className="send-btn">
                            <FontAwesomeIcon
                              icon={faLocationArrow}
                              style={{
                                color: 'white',
                                height: '50%',
                                width: '50%',
                              }}
                              size={'xs'}
                            />
                          </SendButton>
                        </div>
                      )}
                    </animated.div>
                  )}
                </Trail>
              )}
            </div>
            <div className="loc-info">
              <h3>My Location</h3>
              {/* <div id="mapContainer"></div> */}
              <div id="aMapContainer" />
            </div>
          </div>
          <style jsx>
            {`
             {
              .page1,
              .page2,
              .page3 {
                width: 100%;
                height: 100%;
              }
              .page3 {
                height: auto;
                min-height: 100vh;
                background: rgba(255, 255, 255, .4);
                overflow: auto;
              }
              .page3 h1 {
                color: white;
                padding: 5% 0 0 5%;
              }
              .info-wrapper {
                width: 100%;
                height: 100%;
                display: inline-flex;
                justify-content: center;
              }
              .contact {
                position: relative;
                top: 0;
                width: 50%;
                margin-left: 5%;
                margin-right: 2.5%;
              }
              .contact h3, .loc-info h3 {
                color: white;
                padding: 1rem;
              }
              .input h3 {
                padding: 0;
              }
              .send-msg {
                width: 100%;
                padding: 5%;
                // height: 20rem;
                background: rgba(255, 255, 255, .5);
                overflow: hidden;
                box-sizing: border-box;
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
              .loc-info {
                width: 50%;
                margin-right: 5%;
                height: 100%;
              }
              .loc-info h3 {
              }
              #mapContainer {
                widht: 100%;
                height: 15rem;
                margin-bottom: 5rem;
              }
              #aMapContainer {
                width: 100%;
                height: 15rem;
                margin-bottom: 2rem;
              }
              @media(max-width: 764px) {
                .info-wrapper {
                  flex-direction: column;
                }
                .contact {
                  width: 100%;
                  margin-right: 0;
                  margin-left: 0;
                }
                .send-msg {
                  width: 100%;
                }
                .contact h1, .introtext {
                  padding: 0rem;
                }
                .introtext .desc {
                  width: '100%', text-align: 'center', margin: '0 auto'
                }
                .loc-info {
                  width: 100%;
                  margin: 0;
                }
              }
            }
          `}
          </style>
        </div>
      </>
    );
  };
}
