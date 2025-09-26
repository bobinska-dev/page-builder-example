import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import { HomePage } from '@/components/pages/home/HomePage'
import { Loading } from '@/components/shared/Loading'
import { loadHomePage } from '@/sanity/loader/loadQuery'

const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
)

export default async function IndexRoute() {
  const initial = await loadHomePage()

  if ((await draftMode()).isEnabled) {
    return <HomePagePreview initial={initial} />
  }

  if (!initial.data) {
    return <Loading />
  }

  return <HomePage data={initial.data} />
}
