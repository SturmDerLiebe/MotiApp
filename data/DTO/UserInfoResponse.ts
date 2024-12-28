export interface UserInfoResponse {
    userId: string;
    personalGoal: number;
    personalProgress: number;
    groupInfo: GroupInfo;
}

export interface GroupInfo {
    groupName: string;
    members: UserProfile[];
    inviteCode: string;
}

export interface UserProfile {
    userId: string;
    username: string;
    profileImageUri: string;
}
