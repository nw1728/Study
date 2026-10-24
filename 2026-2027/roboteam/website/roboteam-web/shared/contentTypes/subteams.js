// The subteams. The slug is the page address: /team/<slug>, so it is made
// from the name once and then left alone.
//
// Who is in a subteam is not here: members are their own type, each holding
// the slug of the subteam they are in.
export default {
  id: 'subteams',
  label: 'Subteams',
  kind: 'list',
  itemLabel: (subteam) => subteam.name,
  // The generated id of a subteam is called slug, because it is the address.
  idField: 'slug',
  fields: [
    { name: 'slug', label: 'Address', type: 'text', required: true, generated: true },
    { name: 'name', label: 'Name', type: 'text', required: true, max: 40 },
    { name: 'description', label: 'Short description', type: 'textarea', required: true },
    { name: 'longDescription', label: 'Full description', type: 'textarea', required: true },
    { name: 'image', label: 'Subteam photo', type: 'image' },
  ],
}
