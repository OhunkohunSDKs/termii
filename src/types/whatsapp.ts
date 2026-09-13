/**
 * Variables used to populate placeholders in a WhatsApp template.
 *
 * For authentication (OTP) templates, only `otp` is supported.
 */
export type WhatsAppTemplateData = Record<
    string,
    string | number
>;

/**
 * Media attachment included in a WhatsApp template message.
 */
export interface WhatsAppTemplateMedia {
    /**
     * Caption describing the attached media.
     */
    caption: string;

    /**
     * Publicly accessible and downloadable URL
     * of the media file.
     */
    url: string;
}

/**
 * Request body for sending a WhatsApp template message.
 *
 * Media is optional. When provided, the template message
 * will include the specified media attachment.
 */
export interface SendWhatsAppTemplateBody {
    /**
     * Destination phone number in international format.
     *
     * Example: `23490126727`
     */
    phone_number: string;

    /**
     * WhatsApp Device ID.
     */
    device_id: string;

    /**
     * ID of the approved WhatsApp template.
     */
    template_id: string;

    /**
     * Variables used to populate the template placeholders.
     */
    data: WhatsAppTemplateData;

    /**
     * Optional media attachment.
     *
     * Authentication (OTP) templates do not support media.
     */
    media?: WhatsAppTemplateMedia;
}

/**
 * Response returned after successfully sending
 * a WhatsApp template message.
 */
export interface SendWhatsAppTemplateResponse {
    /**
     * Indicates whether the message was successfully sent.
     */
    code: "ok";

    /**
     * Remaining account balance.
     */
    balance: number;

    /**
     * Message ID returned by Termii.
     */
    message_id: string;

    /**
     * Human-readable response message.
     */
    message: string;

    /**
     * Name of the user associated with the account.
     */
    user: string;

    /**
     * Message ID returned as a string.
     */
    message_id_str: string;
}
