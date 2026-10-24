// Content of the /join page.
export const join = {
  intro:
    'RoboTeam Twente is a team of driven students developing advanced systems in robotics, electronics and software engineering. We compete in the European Rover Challenge, where our autonomous rover performs space exploration tasks in a simulated Mars environment.',
  benefits: [
    'A technical playground to design, build and test real robotic systems',
    'Hands-on experience in embedded systems, software, electronics, mechanical engineering, teamwork and more',
    'The opportunity to take part in international competitions such as the European Rover Challenge',
    'Practical project experience that strengthens your CV and professional profile',
    'Exposure to real engineering challenges beyond coursework',
    'The chance to collaborate with motivated students from different disciplines',
    'Access to technical events, workshops and industry-related activities',
    'A strong network of alumni and industry connections',
  ],
  // past competitions: shown as a row of city names
  cities: ['Nagoya', 'Montreal', 'Sydney', 'Bangkok', 'Bordeaux'],
  steps: [
    { title: 'Apply for an open position', text: 'Pick one of the technical or organisational roles below and send us your application.' },
    { title: 'Reach out about a technical area', text: "Interested in something specific that isn't listed? Contact us and tell us what you'd like to work on." },
    { title: 'Propose your own project', text: 'Have an idea? Explore the possibilities together with the team.' },
  ],
  requirements:
    'We welcome students with an interest in robotics, artificial intelligence, software engineering, electronics, mechanics or project management. Prior experience is valuable but not required; motivation and commitment are essential.',
  callbackDay: 'June 1st',
  // The Apply button opens a mail to this address with the subject and body
  // already filled in. Three plain boxes rather than one nested object, so
  // each is a box of its own in the admin.
  applyEmailTo: 'info@roboteamtwente.nl',
  applyEmailSubject: 'Application RoboTeam Twente',
  applyEmailBody: 'Dear RoboTeam Twente,\n\nName:\nSurname:\nCurrent education (university, programme, year):\n\nMotivation:\n[Describe the motivation behind your application]\n\nCV:\n[Attach your CV to this email]\n\nKind regards,\n[Your name]',
  waitingLists: [
    { label: 'Waiting list 2026–2027', href: 'https://docs.google.com/forms/d/e/1FAIpQLSeHZOOzleeb41mr-ocj4l_DS4eED5mh_LyCNujsy6tmpgdXgQ/viewform' },
    { label: 'Waiting list 2027–2028', href: 'https://docs.google.com/forms/d/e/1FAIpQLScIaRJjIdPBZ3oyyvAZPrhSWT76E3BgAUPQ4ECDTfw1dF6QUQ/viewform' },
  ],
}

// Open positions on the /join page. `team` should match a subteam name.
export const positions = [
  {
    title: 'Geologist',
    team: 'Science',
    summary: "We're looking for a passionate geologist to help do scientific research for an upcoming project.",
    text: [
      'As our geology lead, you will help design and execute our scientific exploration plan, figuring out which data we need to extract from given samples. You will develop a sampling strategy, and interpret, analyse and report on data from different sensors, working closely with engineers to solve challenges for our robot!',
    ],
  },
  {
    title: 'Secretary',
    team: 'Management',
    summary: 'Keep the administrative and organisational side of RoboTeam Twente running smoothly.',
    text: [
      'The General Secretary ensures the administrative and organisational processes of RoboTeam Twente run smoothly. This includes handling official administration such as taxes, office-related matters, and maintaining structured documentation for the team.',
      'The role also supports financial coordination by assisting with budgeting, bookkeeping oversight, and responding to unexpected administrative or financial changes. In addition, the General Secretary helps manage internal and external communication, coordinating between the Management team and Public Relations, particularly around events and team activities.',
      "Finally, the position supports the organisation of outreach and educational activities, such as workshops and demonstrations at external events, helping maintain RoboTeam Twente's mission of promoting robotics and programming.",
    ],
  },
  {
    title: 'Public Relations',
    team: 'Public Relations',
    summary: 'Shape how a young tech brand presents itself, online and at events.',
    text: [
      'RoboTeam Twente collaborates with many partners, and thus represents these companies. That makes a good public image important: our online presence as well as the promotional materials we use at events throughout the year. To grow as a team, promoting ourselves is essential, both towards companies and potential new members. As a relatively young student team, there is still a lot of creative freedom when it comes to promoting our brand.',
      'Are you interested in graphic design and marketing, and do you want to gain experience promoting a tech brand? Then join us for Public Relations!',
    ],
  },
  {
    title: 'External Affairs (Board)',
    team: 'Management',
    summary: 'Run the company side of the team and manage all our partnerships.',
    text: [
      'As part of the board you will help run the company, a valuable skill for your CV: how many students can say they have run a company of this size? As External Affairs Manager, you are responsible for all contact between RoboTeam Twente and companies. You maintain all partnerships and acquire new ones. Together with the Team Manager, Treasurer, Public Relations manager and the technical teams, you decide what is needed and what RoboTeam Twente can offer its partners.',
      "The External Affairs Manager is social and proactive, and not afraid to talk and negotiate with all kinds of partners. Some experience talking to companies or doing committees is a plus, but you will of course learn a lot during your time at RoboTeam Twente!",
    ],
  },
]
