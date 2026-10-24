// The /join page. One item, not a list.
export default {
  id: 'join',
  label: 'Join page',
  kind: 'single',
  fields: [
    { name: 'intro', label: 'Intro', type: 'textarea', required: true },
    { name: 'benefits', label: 'What you get', type: 'list-of-text', required: true },
    { name: 'cities', label: 'Past competition cities', type: 'list-of-text' },
    {
      name: 'steps',
      label: 'Ways in',
      // "Ways in" does not end in a plural s, so the Add button is told what
      // to call one of these rather than guessing.
      addLabel: 'way in',
      type: 'items',
      required: true,
      itemLabel: (step) => step.title,
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'text', label: 'Text', type: 'textarea', required: true },
      ],
    },
    { name: 'requirements', label: 'Who we are looking for', type: 'textarea', required: true },
    { name: 'callbackDay', label: 'We answer by', type: 'text', placeholder: 'June 1st' },
    { name: 'applyEmailTo', label: 'Applications go to', type: 'text', required: true },
    { name: 'applyEmailSubject', label: 'Mail subject', type: 'text' },
    { name: 'applyEmailBody', label: 'Mail body', type: 'textarea' },
    {
      name: 'waitingLists',
      label: 'Waiting lists',
      type: 'items',
      itemLabel: (list) => list.label,
      fields: [
        { name: 'label', label: 'Name', type: 'text', required: true },
        { name: 'href', label: 'Link', type: 'url', required: true },
      ],
    },
  ],
}
