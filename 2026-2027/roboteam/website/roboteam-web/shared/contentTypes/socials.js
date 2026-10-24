// Where the team is, elsewhere. Shown in the footer and on /contact.
export default {
  id: 'socials',
  label: 'Social links',
  kind: 'list',
  itemLabel: (social) => social.label,
  fields: [
    { name: 'id', label: 'Id', type: 'text', required: true, generated: true },
    { name: 'label', label: 'Name', type: 'text', required: true, max: 30 },
    { name: 'href', label: 'Link', type: 'url', required: true },
  ],
}
