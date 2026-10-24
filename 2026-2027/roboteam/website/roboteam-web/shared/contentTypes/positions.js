// The open positions on the /join page. Each one's text is a list of
// paragraphs: one row per paragraph, so nobody has to think about markup.
export default {
  id: 'positions',
  label: 'Open positions',
  kind: 'list',
  itemLabel: (position) => position.title,
  fields: [
    { name: 'id', label: 'Id', type: 'text', required: true, generated: true },
    { name: 'title', label: 'Title', type: 'text', required: true },
    {
      name: 'team',
      label: 'Subteam',
      type: 'reference',
      refType: 'subteams',
      // Positions name the subteam rather than its address, because that is
      // what the card shows.
      refValue: 'name',
      refLabel: 'name',
    },
    { name: 'summary', label: 'Summary', type: 'textarea', required: true },
    { name: 'text', label: 'Full text', type: 'list-of-text', required: true },
  ],
}
