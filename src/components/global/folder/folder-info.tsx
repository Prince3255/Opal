'use client'

import { getFodlerInfo } from '@/app/action/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import { FolderProp } from '@/type/index.type'
import React from 'react'

type Props = {
    folderId: string
}

const FolderInfo = ({folderId}: Props) => {
    const { data } = useQueryData(['folder-info'], () => getFodlerInfo(folderId))

    const { data: folder } = data as FolderProp
  return (
    <div className='flex items-center'>
        <h2 className='text-[#BdBdBd] text-2xl'>{folder?.name}</h2>
    </div>
  )
}

export default FolderInfo