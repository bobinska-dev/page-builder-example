import { Box, Text } from '@sanity/ui'
import { ComponentType } from 'react'

type BrowProps = {
  title: string
}

const Brow: ComponentType<BrowProps> = ({ title }) => {
  return (
    <Box paddingBottom={2} className="brow">
      <Text as={'p'} size={0} muted>
        {title}
      </Text>
    </Box>
  )
}

export default Brow
