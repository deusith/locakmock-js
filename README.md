# locakmock-js
A local mock server built with NextJS 13

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Minimum requirements:

NodeJS 18.16.1
Next 13.4.7
React 18.2

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3030](http://localhost:3030) with your browser to see the result.

## Managing endpoints

The list of avaliable endpoints is in the root of the server [http://localhost:3030](http://localhost:3030)

To add one endpoint, go to [http://localhost:3030/new](http://localhost:3030/new) and fill up the blanks. 

If the "create" button doesnt work, check for any blank fields.

There's no `edit` option. To modify an existing endpoint we have to use the "new" interface. You can copy and paste the data from the `./endpoints` directory to the new endpoint form or directly modify the json file created. This feature has priority over the others and will be released in the future.

To delete an endpoint, you also have to delete the corresponding file in the `./endpoints` directory.

## Accesing the mock API

To access any previously created endpoint, point your REST client or JavaScript calls to the following URL. Currently only `GET` requests have been tested.

[http://localhost:3030/api/v0/{your-endpoint-name}](http://localhost:3030/api/v0/{your-endpoint-name})

To request a specific dataset other than `200 ok` status add the following header to your request:

`"x-custom-status" : status-number`

where `status-number` can be any of the values listed in the new endpoint page (200, 400, 404, 500, etc)