export type Event = {
    id: number;
    title: string;
    description: string;
    date: string;
    image_url: string;
    location: string;
    created_at: string;
};

export type Project = {
    id: number;
    user_id: string;
    title: string;
    category: "Graphic" | "UI/UX" | "3D";
    image_url: string;
    instagram_link: string;
    creator_name: string;
    status: "pending" | "approved" | "rejected";
    created_at: string;
};

export type EventResource = {
    id: number;
    event_id: number;
    title: string;
    link?: string;
    type: string;
    image_url?: string;
    created_at: string;
};
