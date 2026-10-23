import RoverModel from './RoverModel.jsx'
import Planet from './Planet.jsx'
import Samples from './Samples.jsx'
import { NARROW_SCREEN, PLANET, ROVER_ANCHOR, ROVER_SCALE } from './geometry.js'
import styles from './StoryRover.module.css'

// The part of the scene that's visible: phones zoom in on the rover so it isn't tiny.
const VIEW = NARROW_SCREEN ? '300 230 400 300' : '0 -70 1000 700'

// The whole drawing: the planet with the rover standing on top. StoryDirector.js animates it.
export default function StoryScene() {
  const roverMount = `translate(${PLANET.cx} ${PLANET.cy - PLANET.r}) scale(${ROVER_SCALE}) translate(${-ROVER_ANCHOR[0]} ${-ROVER_ANCHOR[1]})`

  return (
    <svg
      className={styles.svg}
      viewBox={VIEW}
      preserveAspectRatio={NARROW_SCREEN ? 'xMidYMid meet' : 'xMidYMax meet'}
      role="img"
      aria-label="Line drawing of the RoboTeam Twente Mars rover driving on a small planet"
    >
      <g data-scene>
        <Planet />
        {/* the orbit group lets the rover drive around the planet at the end */}
        <g data-orbit>
          <g transform={roverMount}>
            <g data-ghost className={styles.ghost} aria-hidden="true">
              <RoverModel />
            </g>
            <g data-rover>
              <RoverModel />
              <Samples />
              <text data-bubble className={styles.bubble} x="200" y="40" textAnchor="middle" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
