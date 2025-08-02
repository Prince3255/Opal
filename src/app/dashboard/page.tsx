import React from 'react'
import { onAuthenticateUser } from '../action/user'
import { redirect } from 'next/navigation'

type Props = {}

const Dashboard = async (props: Props) => {

    const auth = await onAuthenticateUser()
    if (auth.status === 200 || auth.status === 201) {
        return redirect(`/dashboard/${auth.user?.workspace[0].id}`)
    }

    if (auth.status === 401 || auth.status === 403 || auth.status === 500) {
        return redirect('/auth/sign-in')
    }
}

export default Dashboard