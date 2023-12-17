import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { AnchorHTMLAttributes } from 'react'

type SafeLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    dynamicHrefs?: boolean
}

export function SafeLink({ dynamicHrefs = false, ...props }: SafeLinkProps) {
    let url = props.href ?? '/'
    const isExternalUrl = !(url.startsWith('/') || url.startsWith('#') || url.startsWith('.'))
    const params = useParams()

    if (!isExternalUrl && dynamicHrefs) {
        url = url.replace(/\[.*\]/, key => {
            const value = params[key.slice(1, -1)] ?? 'undefined'

            return typeof value === 'string' ? value : value.join('/')
        })
    }

    return (
        <Link
            {...props}
            href={url}
            prefetch={!isExternalUrl}
            target={isExternalUrl ? '_blank' : '_self'}
            rel={isExternalUrl ? 'noreferrer noopener' : undefined}
        />
    )
}
