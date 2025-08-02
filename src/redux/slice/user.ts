import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
    user: {
        id: string | null;
        firstname: string | null;
        lastname: string | null;
        email: string | null;
        workspaceId: string | null;
    } | null
}

type UserPayload = {
    user: {
        id: string | null;
        firstname: string | null;
        lastname: string | null;
        email: string | null;
        workspaceId: string | null;
    }
}

const initialState: initialStateProps = {
    user: null
}

export const User = createSlice({
    name: 'user',
    initialState,
    reducers: {
        USER: (state, action: PayloadAction<UserPayload>) => {
            return { ...action.payload }
        }
    }
})

export const { USER } = User.actions
export default User.reducer