import React from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import classes from './Layout.module.scss'

type Props = {
  children: React.ReactNode
}

export const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={classes.content}>{children}</div>
      <Footer />
    </div>
  )
}
