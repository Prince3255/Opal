import React from 'react'
import { SignIn as ClerkSignIn } from '@clerk/nextjs'

type Props = {}

const SignIn = (props: Props) => {
  return (
    <ClerkSignIn redirectUrl="/auth/callback" />
  )
}

export default SignIn