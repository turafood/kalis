import { create } from 'zustand'

const initialState = {
    initialLoading: true,
    issueData: {
        assignees: [],
        labels: [],
        comments: [],
        attachments: [],
        activity: [],
    },
    memberList: [],
}

export const useIssueStore = create((set) => ({
    ...initialState,
    updateIssueData: (payload) => set(() => ({ issueData: payload })),
    setMembers: (payload) => set(() => ({ memberList: payload })),
    setInitialLoading: (payload) => set(() => ({ initialLoading: payload })),
}))
