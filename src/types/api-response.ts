
/**
 * Error response returned by the API.
 */
export interface ApiErrorResponse {
    /**
     * Error code returned by the API.
     */
    code?: string;

    /**
     * Human-readable error message.
     */
    message?: string;

    /**
     * HTTP status code.
     */
    status?: number;

    /**
     * API endpoint that generated the error.
     */
    path?: string;

    /**
     * Time at which the error occurred.
     */
    timestamp?: string;

    /**
     * Additional error description.
     */
    error?: string;
}
