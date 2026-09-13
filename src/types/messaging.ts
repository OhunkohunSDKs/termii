
export interface SmsRecipient {
    /**
     * Destination phone number(s) in international format.
     *
     * A maximum of 100 phone numbers can be provided.
     *
     * Example: `23490126727`
     */
    to: string | string[];
}

export interface SmsSender {
    /**
     * Sender ID.
     *
     * Alphanumeric sender IDs must be between 3 and 11 characters.
     *
     * Example: `CompanyName`
     */
    from: string;
}

export interface SmsContent {
    /**
     * Text message to be delivered.
     *
     * For voice messages containing verification codes,
     * add spaces between the digits for better text-to-speech
     * interpretation.
     */
    sms: string;
}

export interface SmsEncryptionOptions {
    /**
     * Encryption algorithm.
     *
     * AES is strongly recommended.
     */
    algorithm: string;

    /**
     * Secret key used for encryption.
     */
    secret_key: string;

    /**
     * Initialization vector.
     *
     * Required depending on the selected encryption mode.
     */
    iv: string;
}

export interface SmsMedia {
    /**
     * URL of the media resource.
     */
    url: string;

    /**
     * Optional caption for the media.
     */
    caption?: string;
}

type SmsBase = SmsRecipient & SmsSender;

/**
 * Standard SMS message.
 */
export type PlainSmsBody = SmsBase &
    SmsContent & {
        channel: "dnd" | "generic";
        type: "plain";
    };

/**
 * Unicode SMS message for special characters
 * or non-Latin scripts.
 */
export type UnicodeSmsBody = SmsBase &
    SmsContent & {
        channel: "dnd" | "generic";
        type: "unicode";
    };

/**
 * Encrypted SMS message.
 */
export type EncryptedSmsBody = SmsBase &
    SmsContent & {
        channel: "dnd" | "generic";
        type: "encrypted";
        encryption: SmsEncryptionOptions;
    };

/**
 * Voice message.
 */
export type VoiceSmsBody = SmsBase &
    SmsContent & {
        channel: "voice";
        type: "voice";
    };

/**
 * WhatsApp text message.
 */
export type WhatsappTextBody = SmsBase &
    SmsContent & {
        channel: "whatsapp";
        type: "plain";
    };

/**
 * WhatsApp media message.
 *
 * The `sms` field must not be provided when sending media.
 */
export type WhatsappMediaBody = SmsBase & {
    channel: "whatsapp";
    type: "plain";
    media: SmsMedia;
};

/**
 * Request body for sending a single message.
 */
export type SendSmsBody =
    | PlainSmsBody
    | UnicodeSmsBody
    | EncryptedSmsBody
    | VoiceSmsBody
    | WhatsappTextBody
    | WhatsappMediaBody;

/**
 * Base fields shared by bulk SMS requests.
 */
type BulkSmsBase = Omit<SmsBase, "to"> & {
    /**
     * Destination phone numbers.
     *
     * A maximum of 100 phone numbers can be provided.
     */
    to: string[];
};

/**
 * Standard bulk SMS message.
 */
export type BulkPlainSmsBody = BulkSmsBase &
    SmsContent & {
        channel: "dnd" | "generic";
        type: "plain" | "unicode";
    };

/**
 * Encrypted bulk SMS message.
 */
export type BulkEncryptedSmsBody = BulkSmsBase &
    SmsContent & {
        channel: "dnd" | "generic";
        type: "encrypted";
        encryption: SmsEncryptionOptions;
    };

/**
 * Request body for bulk SMS.
 */
export type BulkSmsBody =
    | BulkPlainSmsBody
    | BulkEncryptedSmsBody;
    

export type SmsChannel = SendSmsBody['channel'];

export type SmsType = SendSmsBody['type'];


/**
 * Successful response returned by the messaging endpoints.
 */
export interface SmsResponse {
    /**
     * Indicates the result of the request.
     */
    code: "ok";

    /**
     * Remaining account balance.
     */
    balance: number;

    /**
     * Unique identifier for the sent message.
     */
    message_id: string;

    /**
     * Human-readable response message.
     */
    message: string;

    /**
     * Name of the account user.
     */
    user: string;

    /**
     * Message ID represented as a string.
     */
    message_id_str: string;
}