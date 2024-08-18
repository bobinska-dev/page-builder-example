import { ComponentType } from 'react'

export const Loading: ComponentType = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    </div>
  )
}
