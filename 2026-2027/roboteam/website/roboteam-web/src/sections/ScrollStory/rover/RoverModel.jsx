import Wheel from './Wheel.jsx'
import Suspension from './Suspension.jsx'
import Chassis from './Chassis.jsx'
import Mast from './Mast.jsx'
import Arm from './Arm.jsx'
import { PIVOTS, WHEELS } from './geometry.js'

// The whole rover, assembled. The rocker joint carries both wheels, so they tilt together.
export default function RoverModel() {
  return (
    <>
      <g data-joint="rocker" data-pivot={PIVOTS.rocker.join(' ')}>
        <Suspension />
        <Wheel x={WHEELS.rear} />
        <Wheel x={WHEELS.front} />
      </g>
      <Chassis />
      <Mast />
      <Arm />
    </>
  )
}
