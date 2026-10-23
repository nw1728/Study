// What an event looks like. The server checks saves against this, and the admin
// page builds its form from it, so the two can never drift apart.
export default {
  id: 'events',
  label: 'Events',
  kind: 'list',
  itemLabel: (event) => event.title,
  fields: [
    // Made from the title by the admin page, so it gets no form box of its own.
    { name: 'id', label: 'Id', type: 'text', required: true, generated: true },
    { name: 'day', label: 'Day', type: 'number', required: true, min: 1, max: 31 },
    {
      name: 'month',
      label: 'Month',
      type: 'select',
      required: true,
      options: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    },
    { name: 'title', label: 'Title', type: 'text', required: true, max: 80 },
    { name: 'place', label: 'Place', type: 'text', required: true },
    { name: 'time', label: 'Time', type: 'text', placeholder: '11:00 – 17:00' },
    { name: 'note', label: 'Extra note', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'image', label: 'Image', type: 'image', placeholder: '/images/events/…' },
    { name: 'registerUrl', label: 'Register link', type: 'url' },
  ],
}
