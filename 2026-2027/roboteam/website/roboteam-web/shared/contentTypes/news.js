// News items, newest first. The front page shows the first one.
//
// The id is a number and part of the address (/news/3), so unlike everywhere
// else it is typed rather than generated: changing it breaks a link that may
// be in a newsletter or on Instagram.
export default {
  id: 'news',
  label: 'News',
  kind: 'list',
  itemLabel: (item) => item.title,
  fields: [
    {
      name: 'id',
      label: 'Number (the address /news/<number>)',
      type: 'number',
      required: true,
      min: 1,
    },
    { name: 'date', label: 'Date', type: 'text', required: true, placeholder: 'August 20, 2026' },
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'author', label: 'Written by', type: 'text' },
    { name: 'summary', label: 'Summary', type: 'textarea', required: true },
    { name: 'image', label: 'Cover picture', type: 'image' },
    // A newsletter is shown as pages, top to bottom.
    { name: 'pages', label: 'Pages', type: 'list-of-text', of: 'image' },
  ],
}
