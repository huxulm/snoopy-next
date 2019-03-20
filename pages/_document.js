import Document, { Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag';
export default class extends Document {
  render() {
    return (
      <html lang="zh">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
          <meta name="mobile-web-app-capable" content="yes" />
          {/* <script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=MaBzXM5DIMpEBDL8bQbLSPqzTruINegz" /> */}
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <link rel="icon" type="image/png" href="/static/favicon.ico" />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}');
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
