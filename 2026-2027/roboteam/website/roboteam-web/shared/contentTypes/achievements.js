// The results table on the front page. Newest first.
// A row opens to show more when it has a note.
export default {
  id: 'achievements',
  label: 'Results',
  kind: 'list',
  itemLabel: (achievement) => `${achievement.year} ${achievement.competition ?? ''}`.trim(),
  fields: [
    { name: 'id', label: 'Id', type: 'text', required: true, generated: true },
    { name: 'year', label: 'Year', type: 'number', required: true, min: 1900, max: 2100 },
    { name: 'competition', label: 'Competition', type: 'text', required: true },
    { name: 'result', label: 'Result', type: 'text', required: true },
    { name: 'note', label: 'More about it', type: 'textarea' },
  ],
}
