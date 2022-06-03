export type IUser = {
    "id": number | string,
    "email": string | null,
    "login": string,
    "location": string | null,
    "avatar_url": string,
    "followers_url": string,
    "followers": number,
    "following": number,
    "created_at": string,
}

export const userFields = ['id', 'email', 'login', 'location', 'avatar_url', 'followers_url', 'followers', 'following', 'created_at'];

export type IRepo = {
    "id": number,
    "name": string,
    "stargazers_count": number,
    "forks_count": number,
    'html_url': string
}

export const repoFields = ["id", "name", "stargazers_count", "forks_count", 'html_url']