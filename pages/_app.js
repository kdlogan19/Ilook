import '../styles/global.css'
import cookies from 'next-cookies'

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
    return <Component {...pageProps} />
  }
