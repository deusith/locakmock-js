import { readFileSync, readdirSync } from 'fs';

import { ENDPOINT_DIRECTORY } from '@/utils/constants';

// Spaghetti mode: on.
export default async function handler(req, res) {
  let responseStatus = 200;
  let responseMessage = 'ok';
  let responseData = {};
  const requestedPath = req.query.path;
  const requestedStatus = req.headers['x-custom-status'] || 200;
  const endpointList = readdirSync(ENDPOINT_DIRECTORY);
  const requestedEndpoint = endpointList.find(e => e === `${requestedPath}.json`);

  if (requestedEndpoint === undefined) {
    responseStatus = 404;
    responseMessage = 'Path/Endpoint not found in the collection.'
  } else {
    const fileContents = JSON.parse(
      readFileSync(`${ENDPOINT_DIRECTORY}/${requestedEndpoint}`, 'utf8')
    );

    responseData = fileContents[requestedStatus];

    if (responseData === undefined) {
      responseStatus = 404;
      responseMessage = 'Requested Status not found in the endpoint data.'
    }
  }

  res.status(responseStatus).json(responseData);
  // res.status(responseStatus).json({
  //   message: responseMessage,
  //   data: responseData,
  // });
};