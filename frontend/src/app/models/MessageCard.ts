
export type MessageCard = {
    messageTopic: string;
    message: string;
    answer?: string;
    parentId: string | null | undefined;
    id: string;
    position: Coordinates;
    children?: string[];
    siblings?: string[];
}

export type Coordinates = {
    x: number;
    y: number;
}


