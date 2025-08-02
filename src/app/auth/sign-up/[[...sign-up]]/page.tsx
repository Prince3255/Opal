import React from 'react'
import { SignUp as ClerkSignUp} from '@clerk/nextjs'

type Props = {}

const SignUp = (props: Props) => {
  return (
    <ClerkSignUp redirectUrl="/auth/callback" />
  )
}

export default SignUp