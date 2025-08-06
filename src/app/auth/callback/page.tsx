import { onAuthenticateUser } from '@/app/action/user' 
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

type Props = {}

const AuthCallbackPage = async (props: Props) => {
    const auth = await onAuthenticateUser()

    if (auth.status === 200 || auth.status === 201) {
        let workspaceId = auth.user?.workspace[0]?.id
        return redirect(`/dashboard/${workspaceId}`)
    }

    if (auth.status === 401 || auth.status === 403 || auth.status === 500) {
        return redirect('/auth/sign-in')
    }
}

export default AuthCallbackPage