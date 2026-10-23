// Content of the scroll story at the top of the page.
// `start` / `at` = how far through the story (0 to 1) something appears.
// PLACEHOLDER TEXT: check the wording and facts with the team.

// The big headline in the middle; each one lasts until the next starts.
export const phases = [
  {
    id: 'build',
    start: 0.08,
    title: 'Designed by students.',
    text: 'Mechanical, electrical, embedded, control and software students design every part of the rover together at Future Factory.',
  },
  {
    id: 'drive',
    start: 0.3,
    title: 'Built for rough ground.',
    text: 'Mars has no roads. The rover crosses rocks and slopes on its own, keeping all six wheels on the ground.',
  },
  {
    id: 'science',
    start: 0.56,
    title: 'It brings back samples.',
    text: 'Like a real planetary mission, the robotic arm collects soil and the rover analyses its environment.',
  },
  {
    id: 'mission',
    start: 0.8,
    title: 'Next stop: ERC 2026.',
    text: 'University teams from around the world meet at the European Rover Challenge, in a simulated Martian environment.',
    cta: { label: 'Join the team', href: '/join' },
  },
]

// The mission log in the corner: commands sent to the rover and its replies.
export const missionLog = [
  { at: 0, sol: 0, command: 'connect future-factory.enschede', reply: 'link established' },
  { at: 0.09, sol: 1, command: 'assemble rover', reply: '✓ chassis  ✓ six wheels  ✓ mast  ✓ arm' },
  { at: 0.31, sol: 14, command: 'drive crater_rim', reply: 'rock ahead … climbing' },
  { at: 0.48, sol: 19, command: 'status', reply: 'all six wheels on the ground' },
  { at: 0.6, sol: 27, command: 'collect sample --site crater_rim', reply: 'arm deploying …' },
  { at: 0.77, sol: 28, command: 'check sample_box', reply: 'sample stored ♥' },
  { at: 0.81, sol: 31, command: 'zoom out', reply: 'that is a small planet' },
  {
    at: 0.9,
    sol: 33,
    command: 'release rover --to cursor',
    reply: 'the rover is yours. click anywhere.',
    // phones have no cursor, so there's no rover pet to hand over to
    commandWithoutPet: 'park rover',
    replyWithoutPet: 'rover parked. see you on Mars.',
  },
]

// Which phase is showing at this progress; -1 means the intro.
export const phaseAt = (progress) => phases.findLastIndex((phase) => progress >= phase.start)

// How many log lines have appeared at this progress.
export const logLinesAt = (progress) => missionLog.filter((line) => progress >= line.at).length
