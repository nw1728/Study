import ImageField from './fields/ImageField.jsx'
import ItemsField from './fields/ItemsField.jsx'
import NumberField from './fields/NumberField.jsx'
import ReferenceField from './fields/ReferenceField.jsx'
import SelectField from './fields/SelectField.jsx'
import TextField from './fields/TextField.jsx'
import TextListField from './fields/TextListField.jsx'
import TextareaField from './fields/TextareaField.jsx'
import styles from './ItemForm.module.css'

// One component per field type. Anything not listed falls back to a text box,
// so a new field type shows up as editable rather than disappearing.
const COMPONENTS = {
  image: ImageField,
  items: ItemsField,
  number: NumberField,
  reference: ReferenceField,
  select: SelectField,
  textarea: TextareaField,
  'list-of-text': TextListField,
}

// Field types that get the full width of the form rather than a column.
const WIDE = ['textarea', 'list-of-text', 'items']

/**
 * One item's fields, built from the content type's description. It knows
 * nothing about events in particular, which is why the other content types
 * need no new form code.
 */
export default function ItemForm({ type, item, errors, refs = {}, onChange }) {
  return (
    <div className={styles.form}>
      {type.fields
        .filter((field) => !field.generated)
        .map((field) => {
          const Field = COMPONENTS[field.type] ?? TextField
          return (
            <div key={field.name} className={WIDE.includes(field.type) ? styles.wide : ''}>
              <Field
                field={field}
                value={item[field.name]}
                error={errors?.[field.name]}
                // A field holding other fields gets the whole error map: its
                // own messages are keyed by path, e.g. steps[0].title.
                errors={field.type === 'items' ? errors : undefined}
                options={refs[field.refType]}
                refs={refs}
                onChange={(value) => onChange({ ...item, [field.name]: value })}
              />
            </div>
          )
        })}
    </div>
  )
}
