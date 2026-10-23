// Former members, shown on the front page with what they are doing now.
export default {
  id: 'alumni',
  label: 'Alumni',
  kind: 'list',
  itemLabel: (alumnus) => alumnus.name,
  fields: [
    { name: 'id', label: 'Id', type: 'text', required: true, generated: true },
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'year', label: 'Year', type: 'text', placeholder: '2023/24' },
    { name: 'role', label: 'Doing now', type: 'text' },
    { name: 'photo', label: 'Photo', type: 'image' },
    { name: 'quote', label: 'Quote', type: 'textarea' },
  ],
}
