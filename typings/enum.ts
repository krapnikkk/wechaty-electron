export enum MessageType {
    Unknown = 0,

    Attachment,     // Attach(6),
    Audio,          // Audio(1), Voice(34)
    Contact,        // ShareCard(42)
    ChatHistory,    // ChatHistory(19)
    Emoticon,       // Sticker: Emoticon(15), Emoticon(47)
    Image,          // Img(2), Image(3)
    Text,           // Text(1)
    Location,       // Location(48)
    MiniProgram,    // MiniProgram(33)
    GroupNote,      // GroupNote(53)
    Transfer,       // Transfers(2000)
    RedEnvelope,    // RedEnvelopes(2001)
    Recalled,       // Recalled(10002)
    Url,            // Url(5)
    Video,          // Video(4), Video(43)
}