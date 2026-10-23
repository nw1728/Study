import styles from './StoryRover.module.css'

const SAMPLE_COUNT = 5

// Soil dots that fly from the scoop into the sample box. StoryDirector moves them.
export default function Samples() {
  return Array.from({ length: SAMPLE_COUNT }, (_, i) => (
    <circle key={i} data-sample className={styles.sample} cx="0" cy="0" r="4" />
  ))
}
