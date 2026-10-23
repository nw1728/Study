import { Link } from 'react-router-dom'

/*
 * A link that does the right thing for any address:
 * - "/events", "/#team"  → switches page inside the site, without reloading
 * - "#about"              → jumps on the current page
 * - "https://…", "mailto:" → a normal link (external ones open in a new tab)
 */
export default function SmartLink({ href, children, ...rest }) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    )
  }
  const external = href.startsWith('http')
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
      {children}
    </a>
  )
}
