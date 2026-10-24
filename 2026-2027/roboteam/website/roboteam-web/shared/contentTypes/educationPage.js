// The two blocks of loose text on the /education page. One item, not a list.
export default {
  id: 'educationPage',
  label: 'Education text',
  kind: 'single',
  fields: [
    { name: 'intro', label: 'Intro', type: 'textarea', required: true },
    { name: 'note', label: 'Note at the bottom', type: 'textarea' },
  ],
}
