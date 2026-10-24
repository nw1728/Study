// The tabs on the /education page and the activities inside them.
//
// The tabs themselves are editable, not only what is in them: a new kind of
// activity should not need a developer.
export default {
  id: 'activityGroups',
  label: 'Activities',
  kind: 'list',
  itemLabel: (group) => group.label,
  fields: [
    { name: 'id', label: 'Id', type: 'text', required: true, generated: true },
    { name: 'label', label: 'Tab name', type: 'text', required: true, max: 30 },
    {
      name: 'activities',
      label: 'Activities',
      type: 'items',
      required: true,
      addLabel: 'activity',
      itemLabel: (activity) => activity.title,
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'level', label: 'Level', type: 'text', placeholder: 'Beginner' },
        { name: 'duration', label: 'How long', type: 'text', placeholder: '30–60 min' },
        { name: 'capacity', label: 'How many people', type: 'text', placeholder: '10–30' },
        { name: 'language', label: 'Language', type: 'text', placeholder: 'NL / EN' },
        { name: 'text', label: 'Description', type: 'textarea', required: true },
        { name: 'points', label: 'Bullet points', type: 'list-of-text' },
        { name: 'tagline', label: 'Tagline', type: 'text' },
      ],
    },
  ],
}
