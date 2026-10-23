import { missionLog } from '../../data/story.js'
import { petAvailable } from '../../lib/petAvailable.js'
import styles from './ScrollStory.module.css'

const VISIBLE_LINES = 4

// The mission log: commands sent to the rover and its replies, typed out as you scroll.
export default function MissionLog({ count }) {
  const lines = missionLog.slice(0, count).slice(-VISIBLE_LINES)

  return (
    <div className={styles.log} aria-live="polite">
      <div className={styles.logTitle}>
        <span className={styles.liveDot} /> mission log
      </div>
      {lines.map((line) => {
        // without a rover pet (phones), some lines have their own wording
        const command = (!petAvailable && line.commandWithoutPet) || line.command
        const reply = (!petAvailable && line.replyWithoutPet) || line.reply
        return (
          <div key={line.at} className={styles.logLine}>
            <span className={styles.sol}>SOL {String(line.sol).padStart(3, '0')}</span>
            <span className={styles.command} style={{ '--chars': command.length + 2 }}>
              &gt; {command}
            </span>
            <span className={styles.reply}>{reply}</span>
          </div>
        )
      })}
    </div>
  )
}
