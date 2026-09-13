/**
 * Dynamic variables used to populate an email template.
 *
 * Each key should correspond to a variable defined
 * in the email template.
 */
export type EmailTemplateVariables = Record<
    string,
    string | number | boolean
>;

/**
 * Request body for sending a templated email notification.
 */
export interface SendEmailTemplateBody {
    /**
     * Recipient's email address.
     *
     * Example: `test@termii.com`
     */
    email: string;

    /**
     * Subject line displayed in the recipient's inbox.
     */
    subject: string;

    /**
     * ID of the email configuration created
     * on the Termii dashboard.
     */
    email_configuration_id: string;

    /**
     * ID of the email template created
     * on the Termii dashboard.
     */
    template_id: string;

    /**
     * Dynamic values used to populate variables
     * defined in the email template.
     *
     * Example:
     * {
     *     name: "Priscilla",
     *     balance: "333444"
     * }
     */
    variables: EmailTemplateVariables;
}

/**
 * Response returned after successfully
 * sending a templated email.
 */
export interface SendEmailTemplateResponse {
    /**
     * Indicates whether the email was successfully sent.
     */
    code: "ok";

    /**
     * Remaining account balance.
     *
     * The API currently returns this value as a string.
     */
    balance: string | number;

    /**
     * Unique ID of the sent message.
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
}
