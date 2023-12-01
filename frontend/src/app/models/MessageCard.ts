
export type MessageCard = {
    messageTopic: string;
    message: string;
    answer?: string;
    parentId: string | null;
    id: string;
    position: {x: number, y: number};
}


