import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

// Page paths that benefit from revalidation (RSC output is cached)
const REVALIDATABLE_PATHS = [
    '/',
    '/about',
    '/projects',
    '/spotify',
]

// Cache tags used on fetch() calls - these bust the Next.js Data Cache
// entries directly without needing revalidatePath on API routes.
// (No 'status' tag: /api/status doesn't fetch anything external to tag.)
const REVALIDATABLE_TAGS = [
    'github',
    'github-stats',
    'github-activity',
    'avatars',
]

export async function POST(request: Request) {
    const timestamp = new Date().toISOString()

    const secret = process.env.CRON_SECRET
    const auth = request.headers.get('authorization')
    if (!secret || auth !== `Bearer ${secret}`) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    try {
        console.log(`[Cache Clear] [${timestamp}] Starting cache revalidation...`)

        // Revalidate page RSC outputs
        for (const path of REVALIDATABLE_PATHS) {
            revalidatePath(path, 'layout')
        }

        // Bust Data Cache entries by tag (works for API route fetch() caches)
        // Second argument 'max' enables stale-while-revalidate behavior (Next.js 16+)
        for (const tag of REVALIDATABLE_TAGS) {
            revalidateTag(tag, 'max')
        }

        console.log(`[Cache Clear] [${timestamp}] Successfully revalidated ${REVALIDATABLE_PATHS.length} pages + ${REVALIDATABLE_TAGS.length} tags`)

        return NextResponse.json(
            {
                success: true,
                message: `Revalidated ${REVALIDATABLE_PATHS.length} pages and ${REVALIDATABLE_TAGS.length} cache tags`,
                pages: REVALIDATABLE_PATHS,
                tags: REVALIDATABLE_TAGS,
                timestamp,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error(`[Cache Clear] [${timestamp}] Cache revalidation error:`, error)
        return NextResponse.json(
            {
                success: false,
                message: 'Cache revalidation failed',
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp,
            },
            { status: 500 }
        )
    }
}

