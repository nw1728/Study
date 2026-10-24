// The big numbers under the statement. Each one counts up when it scrolls
// into view, so the value has to stay a number.
export default {
  id: 'stats',
  label: 'Numbers',
  kind: 'list',
  itemLabel: (stat) => stat.label,
  fields: [
    { name: 'id', label: 'Id', type: 'text', required: true, generated: true },
    { name: 'value', label: 'Number', type: 'number', required: true },
    { name: 'label', label: 'What it counts', type: 'text', required: true, max: 30 },
  ],
}
