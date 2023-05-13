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
    chatId: string; //	Да	Идентификатор чата
    message: string; //	Да	Текст сообщения. Поддерживаются символы emoji 😃
    quotedMessageId?: string; //	Нет	Идентификатор цитируемого сообщения,если указан то сообщение отправится с цитированием указанного сообщения чата
    archiveChat?: boolean; //	Нет	Помещает в архив чат, в который отправлено сообщение. Принимает значения: true
    linkPreview? : boolean;
};

export type Notification = {
    receiptId: number;
    body: {
        [key: string]: any;
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

export type DeleteNotificationResponse = {
    result: boolean;
};

export type Credentials = {
    idInstance: string;
    apiTokenInstance: string;
};
