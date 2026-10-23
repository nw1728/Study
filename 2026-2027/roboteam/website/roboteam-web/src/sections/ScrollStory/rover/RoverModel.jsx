import Wheel from './Wheel.jsx'
import Suspension from './Suspension.jsx'
import Chassis from './Chassis.jsx'
import Mast from './Mast.jsx'
import Arm from './Arm.jsx'
import { PIVOTS, WHEELS } from './geometry.js'

// The whole rover, assembled. The legs are nested so each joint carries the wheels below it.
export default function RoverModel() {
  return (
    <>
      <g data-joint="rocker" data-pivot={PIVOTS.rocker.join(' ')}>
        <Suspension kind="rocker" />
        <Wheel x={WHEELS.front} />
        <g data-joint="bogie" data-pivot={PIVOTS.bogie.join(' ')}>
          <Suspension kind="bogie" />
          <Wheel x={WHEELS.rear} />
          <Wheel x={WHEELS.middle} />
        </g>
      </g>
      <Chassis />
      <Mast />
      <Arm />
    </>
  )
}
