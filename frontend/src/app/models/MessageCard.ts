
export type MessageCard = {
    messageTopic: string;
    message: string;
    answer?: string;
    parentId: string | null;
    id: string;
    position: Coordinates;
}

export type Coordinates = {
    x: number;
    y: number;
}


