import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {
  render() {
    return (
      <html lang="zh">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}