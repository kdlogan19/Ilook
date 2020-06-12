import Head from 'next/head'
import Link from 'next/link'
import 'react-bootstrap';
import userProfile from './user-profile'

//Importing Common components
import NavbarHome from '../components/layout/navbar-home'
import FooterHome from '../components/layout/footer-home'

export default function Home() {
  return (
    <div className="container">
      {/* Adding a header */}
      <NavbarHome />
      <div>
        <Link href="./user-profile"><a>User Profile</a></Link>
      </div>
      <main>

      </main>

      {/* Add a footer */}
      <FooterHome />

    </div>
  )
}
