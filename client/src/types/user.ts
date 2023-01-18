export interface User {
    nickName: string;
    email : string;
    userId: number;
}
export interface Sub {
    createdAt: string;
    updatedAt: string;
    title: string;
    description: string;
    imageUrn: string;
    bannerUrn: string;
    username: string;
    posts: Post[];
    postCount?: string;

    imageUrl: string;
    bannerUrl: string;

    _count: any;
}

export interface Post {
    identifier: string;
    title: string;
    slug: string;
    body: string;
    subName: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    sub?: Sub;

    url: string;
    userVote?: number;
    voteScore?: number;
    commentCount?: number;
}

export interface Comment {
    identifier: string;
    body: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    post?: Post;

    userVote: number;
    voteScore: number;
}
