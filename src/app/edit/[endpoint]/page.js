import { readFileSync } from 'fs';
import Link from 'next/link';

import EndpointForm from '@/components/EndpointForm';

import { ENDPOINT_DIRECTORY } from '@/utils/constants'

export const getEndpointData = async (endpoint) => {
  return JSON.parse(
    readFileSync((`${ENDPOINT_DIRECTORY}/${endpoint}.json`), 'utf8')
  );
};

const EditPage = async ({ params }) => {
  const editDataObj = {
    endpointData: await getEndpointData(params.endpoint),
    endpointPath: params.endpoint,
  }

  return (
    <>
      <p>This is to EDIT an endpoint: {params.endpoint}</p>
      <br />
      <Link href="/">Regersar al jom</Link>
      <EndpointForm editData={editDataObj} />
    </>
  );
}

export default EditPage;