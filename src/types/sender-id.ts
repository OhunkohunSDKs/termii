/**
 * Supported Sender ID statuses.
 */
export type SenderIdStatus =
    | "active"
    | "pending"
    | "blocked";

/**
 * Query parameters for fetching Sender IDs.
 *
 * Both parameters are optional and can be used to filter
 * Sender IDs by name and/or registration status.
 */
export interface ListSenderIdParams {
    /**
     * Filter results by Sender ID name.
     */
    name?: string;

    /**
     * Filter results by Sender ID status.
     */
    status?: SenderIdStatus;
}

/**
 * A registered Sender ID associated with an account.
 *
 * `company` and `usecase` are only returned for some
 * Sender IDs, such as pending registration requests.
 */
export interface SenderId {
    /**
     * Country associated with the Sender ID.
     */
    country: string;

    /**
     * Current registration status.
     */
    status: SenderIdStatus;

    /**
     * Date and time the Sender ID was created.
     *
     * Format: YYYY-MM-DD HH:mm:ss
     */
    createdAt: string;

    /**
     * The registered Sender ID.
     */
    sender_id: string;

    /**
     * Company associated with the Sender ID.
     */
    company?: string;

    /**
     * Use case associated with the Sender ID.
     *
     * Note: The API returns this property as `usecase`.
     */
    usecase?: string;
}

/**
 * Sort information returned by the Sender ID API.
 */
export interface SenderIdSort {
    /**
     * Whether the sort configuration is empty.
     */
    empty: boolean;

    /**
     * Whether the results are sorted.
     */
    sorted: boolean;

    /**
     * Whether the results are unsorted.
     */
    unsorted: boolean;
}

/**
 * Pagination information returned by the Sender ID API.
 */
export interface SenderIdPageable {
    sort: SenderIdSort;

    offset: number;

    pageNumber: number;

    pageSize: number;

    paged: boolean;

    unpaged: boolean;
}

/**
 * Response returned when fetching Sender IDs.
 */
export interface ListSenderIdResponse {
    content: SenderId[];

    pageable: SenderIdPageable;

    totalElements: number;

    last: boolean;

    totalPages: number;

    sort: SenderIdSort;

    size: number;

    number: number;

    first: boolean;

    numberOfElements: number;

    empty: boolean;
}

/**
 * Request body for registering a new Sender ID.
 */
export interface RequestSenderIdBody {
    /**
     * Sender ID to register.
     *
     * Can be alphanumeric or numeric.
     * Alphanumeric Sender IDs must be between 3 and 11 characters.
     */
    sender_id: string;

    /**
     * A sample of the type of message that will be sent.
     */
    use_case: string;

    /**
     * Name of the company associated with the Sender ID.
     */
    company: string;
}

/**
 * Response returned after submitting a Sender ID registration request.
 */
export interface RequestSenderIdResponse {
    /**
     * Indicates whether the request was successful.
     */
    code: "ok";

    /**
     * Confirmation message from the API.
     */
    message: string;
}
