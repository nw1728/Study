import { Component } from 'react'
import styles from './ErrorBoundary.module.css'

/**
 * The last net under the whole site.
 *
 * When a component throws while rendering, React unmounts everything above it
 * — a blank page on every address, not just the one that broke. This catches
 * that and shows one quiet panel with a way out instead.
 *
 * A class, because getDerivedStateFromError has no hook equivalent.
 */
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    // Visitors get the panel; whoever is debugging gets the real thing.
    console.error('[site] a component threw while rendering', error, info)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <main className={styles.panel}>
        <p className={styles.label}>RoboTeam Twente</p>
        <h1 className={styles.title}>Something went wrong on this page.</h1>
        <p className={styles.lead}>
          Sorry — that is on us, not on you. Reloading often fixes it.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.button} onClick={() => window.location.reload()}>
            Reload the page
          </button>
          <a className={styles.link} href="/">
            Back to the front page
          </a>
        </div>
      </main>
    )
  }
}
