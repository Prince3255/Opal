import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

type Props = {
    triggers: string[]
    children: React.ReactNode
    defaultValue: string
    value: string
    onValueChange: (value: string) => void
}   

const TabMenu = ({triggers, children, defaultValue, value, onValueChange}: Props) => {
  return (
    <Tabs defaultValue={defaultValue} onValueChange={onValueChange} value={value} className='w-full'>
        <TabsList className='flex justify-start bg-transparent'>
            {triggers?.map((trigger) => (
                <TabsTrigger key={trigger} value={trigger} className='capitalize text-base data-[state-active]:bg-[#1D1D1D]'>
                    {trigger}
                </TabsTrigger>
            ))}
        </TabsList>
        {children}
    </Tabs>
  )
}

export default TabMenu