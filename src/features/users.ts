import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type User = {
    id: number,
    username: string,
    nickname: string,
    pronouns: string,
    description: string,
    friends: User[]
}

interface Users {
    loggedUser: User
    users: User[]
    searcHistory: User[]
}

const initialState: Users = {
    loggedUser: { id: 0, username: "Vitor", nickname: "nnitivv", pronouns: "ele / dele", description: "Esta é uma descrição", friends: [] },
    users: [{ id: 1, username: "Eberty", nickname: "Reberty", pronouns: "ele / dele", description: "Esta é uma descrição.", friends: [] }, { id: 2, username: "Fernanda", nickname: "Dona do rancho", pronouns: "ela / dela", description: "Esta é uma descrição.", friends: [] }],
    searcHistory: [],
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        filterUser(state, action: PayloadAction<number>) {
            state.users = state.users.filter(prev => prev.id !== action.payload);
        },

        removeAllUsers(state) {
            state.users = [];
        },

        filterUserSearchHistory(state, action: PayloadAction<number>) {
            state.searcHistory = state.searcHistory.filter(prev => prev.id !== action.payload);
        },

        clearSearchHistory(state) {
            state.searcHistory = [];
        },
    }
})

export const { filterUser, removeAllUsers, filterUserSearchHistory, clearSearchHistory } = usersSlice.actions;
export default usersSlice.reducer;