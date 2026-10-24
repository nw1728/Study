import { useContent } from './useContent.js'

/**
 * The subteams with their members attached, which is how every page wants
 * them — even though the two are stored apart.
 *
 * The join happens here and nowhere else. A member whose subteam has been
 * renamed or removed is not thrown away: they come back under `orphans`, so
 * the team pages render and nobody silently disappears.
 */
export function useMembers() {
  const subteams = useContent('subteams')
  const members = useContent('members')

  const withMembers = subteams.map((subteam) => ({
    ...subteam,
    members: members.filter((member) => member.subteam === subteam.slug),
  }))

  const known = new Set(subteams.map((subteam) => subteam.slug))
  const orphans = members.filter((member) => !known.has(member.subteam))

  return { subteams: withMembers, orphans }
}
