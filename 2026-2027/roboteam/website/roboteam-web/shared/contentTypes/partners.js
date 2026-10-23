// The partners, shown as a grid of cells on the front page.
//
// A cell shows the logo when there is one and the name when there isn't, so a
// partner can be added now and have their logo uploaded later.
export default {
  id: 'partners',
  label: 'Partners',
  kind: 'list',
  itemLabel: (partner) => partner.name,
  fields: [
    // Made from the name by the admin page, so it gets no form box of its own.
    { name: 'id', label: 'Id', type: 'text', required: true, generated: true },
    { name: 'name', label: 'Name', type: 'text', required: true, max: 60 },
    { name: 'logo', label: 'Logo', type: 'image', placeholder: 'Upload a logo' },
    { name: 'url', label: 'Website', type: 'url', placeholder: 'https://…' },
  ],
}
