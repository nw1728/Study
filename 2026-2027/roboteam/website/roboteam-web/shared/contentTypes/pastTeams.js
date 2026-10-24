// Every generation of RoboTeam Twente, newest first. Shown on /past-teams.
//
// Members here are plain names in one list, not real member entries (Ethan):
// they are history, and nobody is going to give each of them a photo.
export default {
  id: 'pastTeams',
  label: 'Past teams',
  kind: 'list',
  itemLabel: (team) => `${team.years ?? ''} (#${team.generation ?? '?'})`.trim(),
  fields: [
    { name: 'id', label: 'Id', type: 'text', required: true, generated: true },
    { name: 'years', label: 'Years', type: 'text', required: true, placeholder: '2024–2025' },
    { name: 'generation', label: 'Generation', type: 'number', required: true, min: 1 },
    { name: 'photo', label: 'Team photo', type: 'image' },
    { name: 'story', label: 'What they did', type: 'textarea' },
    { name: 'members', label: 'Members', type: 'list-of-text' },
  ],
}
