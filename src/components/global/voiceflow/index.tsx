'use client'

import React, { useEffect } from 'react'
import { LoadVoiceFlowAgent } from '@/lib/voiceflow'

type Props = {
  userId: string,
  plan: string | null,
}

const VoiceflowAgent = ({userId, plan}: Props) => {
    useEffect(() => {
      if (plan === 'PRO'){
        LoadVoiceFlowAgent(userId)
      }
    }, [plan, userId])
  return <></>
}

export default VoiceflowAgent