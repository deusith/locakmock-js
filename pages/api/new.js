import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';

import { ENDPOINT_DIRECTORY } from '@/utils/constants';

const validateAndCreateEndpointsDirectory = () => {
  if (!existsSync(ENDPOINT_DIRECTORY)) {
    mkdirSync(ENDPOINT_DIRECTORY);
  }
};



export default async function handler(req, res) {
  let responseStatus = 500; // Assume everything will fail.
  let responseData = {};
  const { endpointPath, endpointData } = req.body;

  console.log(endpointPath, '\n', JSON.stringify(endpointData));

  try {
    validateAndCreateEndpointsDirectory();
  } catch (err) {
    responseData = {
      message: 'Unable to create endpoints directory',
      err,
    }
  }

  if (existsSync(ENDPOINT_DIRECTORY)) {
    try {
      writeFileSync(`${ENDPOINT_DIRECTORY}/${endpointPath}.json`, JSON.stringify(endpointData));
      responseStatus = 200;
      responseData = { message: 'Endpoint created succesfully!'};
    } catch (err) {
      console.log(err);
      responseData = err;
    }
  }

  res.status(responseStatus).json(responseData);
};