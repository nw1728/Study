// Everyone on the team, as one flat list.
//
// People join and leave roughly every three months, so this is the most
// edited thing on the site. It is one list rather than a list inside each
// subteam: during a changeover you see everyone at once, and moving someone
// between subteams is one dropdown rather than a delete and a retype.
//
// The editor still *shows* them grouped under their subteam — that is what
// groupBy does — and the up/down buttons move someone within their own group.
export default {
  id: 'members',
  label: 'Members',
  kind: 'list',
  itemLabel: (member) => member.name,
  groupBy: {
    field: 'subteam',
    from: 'subteams',
    label: 'name',
    value: 'slug',
    emptyLabel: 'No subteam',
  },
  // Quietly marks the people whose photo is still missing, so the gaps are
  // easy to spot during a changeover. It is not an error and never blocks a save.
  itemFlag: (member) => (member.photo ? null : 'no photo'),
  fields: [
    { name: 'id', label: 'Id', type: 'text', required: true, generated: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'role', label: 'Role', type: 'text', required: true },
    {
      name: 'subteam',
      label: 'Subteam',
      type: 'reference',
      required: true,
      refType: 'subteams',
      refValue: 'slug',
      refLabel: 'name',
    },
    { name: 'photo', label: 'Photo', type: 'image' },
  ],
}
