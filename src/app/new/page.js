"use client";
import { useState } from 'react';
import axios from 'axios';

import Link from 'next/link';

import { STATUS_LIST } from '@/utils/constants';

const NewPage = () => {

  // User Entered data -- todo rename this shit.
  const [endpointPath, setEndpointPath] = useState('mmipath');
  const [formFields, setFormFields] = useState([{
    status: 200,
    data: {
      dasName: 'Ricardooooooo',
      dasLastName: 'Fernandez'
    },
  }]);

  const addNewStatus = () => { };

  const onChange = () => { };

  const changePathHandler = (event) => {
    setPath(event.target.value);
  }

  const submitHanlder = async (event) => {
    event.preventDefault();
    let endpointData = {};

    formFields.forEach((field) => {
      endpointData[field.status] = field.data;
    });

    console.log(formFields)

    axios
      .post(
        '/api/new',
        { endpointPath, endpointData },
      )
      .then(res => console.log(res));
  };

  return (
    <>
      <p>this is for a new endpoint</p>
      <Link href="/">Regersar al jom</Link>
      <form onSubmit={submitHanlder}>
        <input
          onChange={changePathHandler}
          placeholder="endpointPath"
          name="endpointPath"
          value={endpointPath} />
        {
          formFields.map((row, index) => {
            return (
              <div style={{ margin: '50px' }} key={`row-${index}`}>
                <select name="status" value={row.status} row={index} onChange={onChange}>
                  <option value="">select status</option>
                  {STATUS_LIST.map(status => <option value={status} key={status}>{status}</option>)}
                </select>
                <br />
                <textarea
                  onChange={onChange}
                  name={`data-${index}`}
                  placeholder="Response Data"
                  value={JSON.stringify(row.data)} />
                <br />
                <button onClick={addNewStatus}>New Status</button>
                <hr />
              </div>
            );
          })
        }

        <button type="submit">Guardark</button>
      </form>
    </>
  );
}

export default NewPage;