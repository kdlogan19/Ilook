import '../styles/global.css'
import cookies from 'next-cookies'
import Head from 'next/head'

// export default class extends App {

//   static async getInitialProps ({ Component, router, ctx }) {
//     let pageProps = {};
//     const c = cookies(ctx);
//     console.log("*********c*****:",c);
    
//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx)
//     }
//     return {star:"cool"}
//   }
//   render () {
//     return <Component {...pageProps} />
//   }
// }

export default function App({ Component, pageProps }) {    
    return (
      <>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
