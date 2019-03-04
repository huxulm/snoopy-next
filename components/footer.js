import React from 'react';

export default () => {
  return (
    <>
      <div className="ft">
        <div></div>
        <div className="cp">Snoopy @Copyright 2017-2019.</div>
      </div>
      <style jsx>
        {`
          {
            .ft {
              position: relative;
              color: white;
              font-weight: 400;
              height: 5rem;
              text-align: center;
              display: flex;
              justify-content: center;
              background: rgba(122, 122, 122, .2);
              z-index: 1;
              box-shadow: -5px -35px 95px 96px rgba(122, 122, 122, 0.31);
            }
            .ft .cp {
              position: absolute;
              bottom: 2rem;
              font-weight: 300;
              font-size: .8em;
            }
          }
        `}
      </style>
    </>
  );
}