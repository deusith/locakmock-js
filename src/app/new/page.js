import Link from 'next/link';

import EndpointForm from '@/components/EndpointForm';

const NewPage = () => {
  return (
    <>
      <p>this is for a new endpoint</p>
      <Link href="/">Regersar al jom</Link>
      <EndpointForm />
    </>
  );
}

export default NewPage;