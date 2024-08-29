export interface IUserActivity {
    id: string;
    activity: ActivityType;
    activity_time: string;
}

export interface IWeeklyActivity {
    [key: string]: { signin: boolean; review: boolean };
}

export enum ActivityType {
    Login = 'Login',
    Review = 'Review'
}
