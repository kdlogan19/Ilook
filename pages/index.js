import Head from 'next/head'
import Link from 'next/link'
import 'react-bootstrap';
import {Button} from 'react-bootstrap'
import Router from 'next/router'
import Cookie from 'js-cookie'


//Importing Common components
import NavbarHome from '../components/layout/navbar-home'
import FooterHome from '../components/layout/footer-home'

export default function Home() {

  const token = Cookie.get('token')
  Cookie.set('name','user1')
  return (
    <div className="container">
      {/* Adding a header */}
      <NavbarHome />
      <div>
        <Link href="./user-pages/user-profile"><a>User Profile</a></Link>
      </div>
      <main>
        <Button onClick={() => Router.push('/timeline/idea-form')}> + Post an Idea</Button>
        <p>sjdjsd</p><p>sdjsd</p>
      </main>

      {/* Add a footer */}
      <FooterHome />

    </div>
  )
}
