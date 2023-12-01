
export type MessageCard = {
    messageTopic: string;
    message: string;
    answer?: string;
    parentId: string | null;
    id: string;
    position: Coordinates;
}

type Coordinates = {
    x: number;
    y: number;
}


