import { existsSync, readdirSync } from 'fs';

import Link from 'next/link'

import { ENDPOINT_DIRECTORY } from '@/utils/constants'

export const getEndpoints = async () => {
  let response = {}
  if (!existsSync(ENDPOINT_DIRECTORY)) {
    response.noEndpoints = true;
  } else {
    response.endpointList = readdirSync(ENDPOINT_DIRECTORY);
  }

  return response;
};

const Homepage = async () => {
  const { endpointList, noEndpoints } = await getEndpoints();
  return (
    <>
      <p><Link href="/new">Nuevo</Link></p>
      <h2>Lista de endpoints disponibles</h2>
      {
        noEndpoints
          ? (
            <>
              <p>No endpoints</p>
              <p><Link href="/new">Create new?</Link></p>
            </>
          )
          : (
            <ul>
              {
                endpointList.map((ep) => <li>{ep}</li>)
              }
            </ul>
          )
      }
    </>
  )
}

export default Homepage;
