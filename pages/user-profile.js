import Link from 'next/link'
import React from 'react'

export default function userProfile() {
    return (
        <div>
            <p>Inside User profile</p>
            <Link href="/"><a>Home Page</a></Link>
        </div>
    )
}
