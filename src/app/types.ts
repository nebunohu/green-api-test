export type Location = {
    nameLocation: string;
    address: string;
    latitude: number;
    longitude: number;
    jpegThumbnail: string;
};

export type Contact = {
    displayName: string;
    vcard: string;
};

export type ExtendedTextMessage = {
    text: string;
    description: string;
    title: string;
    previewType: string;
    jpegThumbnail: string;
};

export type Message = {
    idMessage: string;
    timestamp: number;
    statusMessage: 'noAccount' | 'read' | 'notInGroup' | 'pending' | 'sent' | 'delivered' | 'read';
    typeMessage: 'textMessage' | 'imageMessage' | 'videoMessage' | 'documentMessage' | 'audioMessage' | 'locationMessage' | 'contactMessage' | 'extendedTextMessage';
    chatId: string;
    textMessage: string;
    downloadUrl: string;
    caption: string;
    location: Location;
    contact: Contact;
    extendedTextMessage: ExtendedTextMessage;
};

export type SendMessageParameters = {
    chatId: string;
    message: string;
    quotedMessageId?: string;
    archiveChat?: boolean;
    linkPreview? : boolean;
};

export type Notification = {
    receiptId: number;
    body: {
        // [key: string]: any;
        messageData?: {
            textMessageData?: {
                textMessage: string;
            };
            extendedTextMessageData?: {
                description: string;
                jpegThumbnail: string;
                previewType: string;
                text: string;
                title: string;
            };
            typeMessage: 'textMessage' |
                'extendedTextMessage';
        };
        timestamp: number;
        typeWebhook: 'incomingMessageReceived' |
            'outgoingMessageReceived' |
            'outgoingAPIMessageReceived' |
            'outgoingMessageStatus' |
            'stateInstanceChanged' |
            'statusInstanceChanged' |
            'deviceInfo' |
            'incomingCall';
        idMessage: string;
        instanceData: { 
            idInstance: number;
            typeInstance: string;
            wid: string
        };
        senderData: {
            chatId: string; 
            chatName: string;
            sender: string;
            senderName: string;
        };
    };
};

export type ChatMessage = {
    idMessage: string;
    text: string;
    time: number | null;
    isOwn: boolean;
};

export type DeleteNotificationResponse = {
    result: boolean;
};

export type Credentials = {
    idInstance: string;
    apiTokenInstance: string;
};
