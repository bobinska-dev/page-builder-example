'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { homePageQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'

import { Loading } from '@/components/shared/Loading'
import { PagePayload } from '@/types'
import HomePage from './HomePage'

type Props = {
  initial: QueryResponseInitial<PagePayload | null>
}

export default function HomePagePreview(props: Props) {
  const { initial } = props
  const { data, encodeDataAttribute } = useQuery<PagePayload | null>(
    homePageQuery,
    {},
    { initial },
  )

  if (!data) {
    return <Loading />
  }

  return <HomePage data={data} encodeDataAttribute={encodeDataAttribute} />
}
