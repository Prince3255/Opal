import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {
    title: string
    descripition: string
    children?: React.ReactNode
    footer?: React.ReactNode
}

const GlobalCard = ({title, descripition, children, footer}: Props) => {
  return (
    <Card className='bg-transparent mt-1'>
        <CardHeader className='px-3 py-1'>
            <CardTitle className='text-md text-[#9D9D9D]'>{title}</CardTitle>
            <CardDescription className='text-[#707070]'>{descripition}</CardDescription>
        </CardHeader>
        {children && <div className='p-3'>{children}</div>}
        {footer && <CardFooter className='p-2'>{footer}</CardFooter>}
    </Card>
  )
}

export default GlobalCard