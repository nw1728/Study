// How to reach the team. One item, not a list.
export default {
  id: 'contact',
  label: 'Contact',
  kind: 'single',
  fields: [
    { name: 'email', label: 'Email', type: 'text', required: true },
    { name: 'educationEmail', label: 'Education email', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'text' },
    {
      name: 'address',
      label: 'Address',
      type: 'list-of-text',
      required: true,
      placeholder: 'One line per row',
    },
    { name: 'mapsUrl', label: 'Google Maps link', type: 'url' },
  ],
}
