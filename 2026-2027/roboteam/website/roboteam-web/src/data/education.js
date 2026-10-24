// The /education page: the two blocks of loose text, and the activities
// grouped into tabs.
export const educationPage = {
  intro:
    'RoboTeam Twente aims to innovate and inspire. We make technology accessible to everyone through hands-on workshops and engaging activities.',
  note: 'As our team is mostly international students, Dutch versions may take longer to arrange.',
}

export const activityGroups = [
  {
    id: 'workshops',
    label: 'Workshops',
    activities: [
      {
        title: 'Cards Workshop',
        level: 'Beginner',
        duration: '30–60 min',
        capacity: '10–30',
        language: 'NL / EN',
        text: 'A fun and accessible introduction to robotics. Participants complete small challenges using a card-based system.',
        points: ['No programming experience required', 'Uses visual coding', 'Logic & structuring focus', 'Light competitive element'],
        tagline: 'Perfect for a first introduction.',
      },
      {
        title: 'Line Follower',
        level: 'Intermediate / Advanced',
        duration: '45–90 min',
        capacity: '10–30',
        language: 'NL / EN',
        text: 'Participants program robots to follow a track on the ground using sensors and control logic.',
        points: ['Visual or C programming', 'Learn sensors & debugging', 'Guided with example code', 'Collaborative focus'],
        tagline: 'Great next step for experience.',
      },
      {
        title: 'Sumo Workshop',
        level: 'Intermediate / Advanced',
        duration: '45–90 min',
        capacity: '10–20',
        language: 'NL / EN',
        text: 'Build and program robots to compete in a sumo-wrestling match, pushing opponents out of the ring.',
        points: ['Strategy & testing', 'Transition to C logic', 'Final tournament', 'Optional computer vision'],
        tagline: 'Great for competitive teams.',
      },
      {
        title: 'Future Factory Tour',
        level: 'All ages',
        duration: '20–35 min',
        capacity: '10–20',
        language: 'EN / NL',
        text: 'Step inside the Future Factory to explore robots, drones and electric vehicles in development.',
        points: ['Explore real-world engineering', 'See rapid prototyping', 'Bridge theory and practice', 'Multidisciplinary insights'],
        tagline: 'Inspiring intro to STEM.',
      },
    ],
  },
  {
    id: 'demonstrations',
    label: 'Demonstrations',
    activities: [
      {
        title: 'Robot Soccer Demo',
        duration: 'Custom',
        language: 'NL / EN',
        text: 'An interactive demo where visitors can control real robot soccer players using a controller.',
        points: ['Hands-on experience', 'Compact playing field', 'Highly visible setup', 'Natural crowd attraction'],
        tagline: 'Perfect for drawing attention.',
      },
      {
        title: '1v1 Experience',
        duration: 'Custom',
        language: 'NL / EN',
        text: 'A competitive version of our demo where visitors go head-to-head controlling robots.',
        points: ['Direct competition', 'Fast-paced action', 'Encourages participation', 'Strong interaction'],
        tagline: 'Ideal for high-energy events.',
      },
    ],
  },
  {
    id: 'teambuildings',
    label: 'Teambuildings',
    activities: [
      {
        title: 'Robotics Challenge',
        level: 'Beginner – Advanced',
        duration: '60–90 min',
        capacity: '10–20',
        language: 'NL / EN',
        text: 'Teams work together to solve a robotics challenge within a set time, dividing roles effectively.',
        points: ['Build & program as a team', 'Collaborate under pressure', 'Iterative performance', 'Communication focus'],
        tagline: 'Focus on teamwork & logic.',
      },
      {
        title: 'Robotics Competition',
        level: 'Beginner – Advanced',
        duration: '60–90 min',
        capacity: '10–20',
        language: 'NL / EN',
        text: 'Teams compete against each other in a challenge like sumo-wrestling or task-based races.',
        points: ['Strategy under pressure', 'Exciting finale', 'Creativity & quick thinking', 'Memorable experience'],
        tagline: 'High-energy team experience.',
      },
      {
        title: 'Factory Group Tour',
        duration: '20–35 min',
        capacity: '10–20',
        language: 'NL / EN',
        text: 'A specialised tour for corporate groups to see how student teams operate like real companies.',
        points: ['Multidisciplinary environment', 'Project management insights', 'Pushing tech boundaries', 'Accessible innovation'],
        tagline: 'Perfect for group inspiration.',
      },
    ],
  },
]
