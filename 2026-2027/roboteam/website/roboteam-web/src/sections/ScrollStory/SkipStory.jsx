import Button from '../../components/Button/Button.jsx'
import { skipStory } from '../../data/story.js'
import styles from './ScrollStory.module.css'

// Bottom-right, above the sol counter: jumps straight past the story to the about section.
export default function SkipStory({ shown }) {
  return (
    <div className={`${styles.skip} ${shown ? styles.shown : ''}`}>
      <Button href={skipStory.href} variant="ghost" small>
        {skipStory.label} ↓
      </Button>
    </div>
  )
}
