import React from 'react'
import styles from './index.module.css'

const Header = () => {
  return (
      <section className={styles.headerContainer}>
      <h2 className={styles.header}> Natural Event Tracker</h2>
      <span className={styles.disc}>(powered by NASA)</span>
      </section>
  )
}

export default Header