# Termii SDK for Node.js

A TypeScript/Node.js SDK for interacting with the [Termii](https://developers.termii.com/) API.

## Coverage

This SDK currently supports Termii's messaging APIs, including SMS, bulk messaging, WhatsApp messaging/templates, Sender ID management, and email notifications.

## Installation

You can install the published npm package directly:

```bash
npm install @ohunkohun/termii-sdk
```

Then import and initialize the SDK:

```ts
import { Termii } from "@ohunkohun/termii-sdk";

const client = Termii({
    api_key: "YOUR_API_KEY",
    base_url: "https://BASE_URL",
    debug: "error", //only supply this if you want logs when an error is caught;
});
```

You can now use the available API resources through the client:

```ts
const response = await client.sms.send({
    to: "234XXXXXXXXXX",
    from: "YourSender",
    sms: "Hello from Termii SDK",
    channel: "generic",
    type: "plain",
});

if(response.success){
    console.log(response.success); //this is the successful response;
}
else if(response.failure){
    console.log(response.failure); //this is the failure response;
}
```

> Replace the package name and API configuration with the values appropriate for your environment.

---

## Working With the Repository

If you have cloned this repository and want to work with the source code directly, install the dependencies first:

```bash
npm install
```

Build the SDK with:

```bash
npm run build
```

The compiled package will be generated in the `dist` directory.

---

## Testing the SDK Locally

There are two ways to test the SDK after cloning the repository.

### Use the source directly

Some examples and development utilities in this repository are intended to run locally.

If an example uses environment variables, create a `.env` file in the root of the project:

```env
IS_LOCAL_MACHINE="true"
API_KEY="your-api-key"
BASE_URL="https://your-base-url"
```

Some variables and constants used in the examples are loaded from the `.env` file. You can also define these values directly in your code instead of using environment variables.

For example:

```ts
const config = {
    api_key: "your-api-key",
    base_url: "https://your-base-url",
};
```

### Test the SDK as an installed npm package

If you want to test the SDK exactly as a consumer would, you can install the published npm package instead of working directly with the source files.

```bash
npm install @ohunkohun/termii-sdk
```

This is useful for testing the package's:

-   Public exports
-   TypeScript declarations
-   Auto-completion
-   API surface
-   Package entry points
-   Production build

You can then import the SDK normally:

```ts
import { Termii } from "@ohunkohun/termii-sdk";
```

---

## Testing a Local Package Build

If you want to test the **current local changes** before publishing them to npm, you can create a package archive with:

```bash
npm run build
npm run pack
```

This generates a `.tgz` file, for example:

```
ohunkohun-termii-sdk-1.0.0.tgz
```

You can install that package in another project:

```bash
npm install C://absolute/or/relative/path/to/ohunkohun-termii-sdk-1.0.0.tgz
```

This allows you to test the SDK as an actual installed npm package while still using your local, unpublished changes.

---

## Development

Start the development environment with:

```bash
npm run dev
```

To watch for TypeScript errors without generating build files:

```bash
npm run types:watch
```

To create a production build:

```bash
npm run build
```

---

## Environment Variables

Environment variables are only required for examples or local development that use them.

A typical `.env` file may look like:

```env
IS_LOCAL_MACHINE="true"
API_KEY="your-api-key"
BASE_URL="https://your-base-url"
SEND_SMS_FROM="YourSender"
SEND_SMS_TO="234XXXXXXXXXX"
```

You are not required to use `.env`. Configuration values can be supplied directly when initializing the SDK:

```ts
const client = Termii({
    api_key: "your-api-key",
    base_url: "https://your-base-url",
});
```

---

## Package vs. Repository

If you only want to **use the SDK**, installing the npm package is recommended:

```bash
npm install @ohunkohun/termii-sdk
```

If you want to **contribute to, modify, or inspect the SDK source code**, clone this repository and install its dependencies:

```bash
git clone https://github.com/ohunkohun/termii-sdk
cd <repository-folder>
npm install
```

If you want to test your local changes as a real npm package without publishing them, use `npm run pack` and install the generated `.tgz` file in another project.

---

## Disclaimer

This is a community-built, unofficial Node.js/TypeScript SDK for the Termii API. It is not an official Termii package unless otherwise stated by Termii.
