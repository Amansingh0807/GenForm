import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className=' bg-gray-200 dark:bg-black'>
        {children}
    </div>
  )
}

export default layout