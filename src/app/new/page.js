"use client";
import { useState } from 'react';
import axios from 'axios';

import Link from 'next/link';

import { STATUS_LIST } from '@/utils/constants';

const NewPage = () => {

  // User Entered data -- todo rename this shit.
  const [endpointPath, setEndpointPath] = useState('');
  const [formFields, setFormFields] = useState([{
    status: undefined,
    data: undefined,
  }]);
  const [isJsonValid, setIsJsonValid] = useState(true);
  const oneGroupForEachStatus = formFields.length === STATUS_LIST.length;
  
  // Temporal styles object
  const textAreaStyle = {
    outline: isJsonValid ? 'unset' : '2px solid red'
  }

  // Creates a new status group for another status
  const addNewStatusGroup = (event) => {
    event.preventDefault();
    setFormFields((prevState) => {
      const newState = oneGroupForEachStatus
        ? prevState
        : [...prevState, {
          status: undefined,
          data: undefined,
        }];
      return newState;
    });
  };

  // Removes a status group from the form.
  const removeStatusGroup = (event) => {
    event.preventDefault();
    const row = Number(event.target.dataset.row);
    setFormFields(
      (prevState) => prevState.filter((e, index) => index !== row)
    );
  };

  // Changes the path name the endpoint will have.
  const changePathHandler = (event) => {
    setEndpointPath(event.target.value);
  }

  // Changes the data for each status object
  const changeStatusHanlder = (event) => {
    const row = event.target.dataset.row;
    const name = event.target.name;
    const value = event.target.value;
    setFormFields((prevState) => {
      const newState = [...prevState];
      if (name === 'status') {
        newState[row].status = value;
      }
      else {
        try {
          JSON.parse(value);
          setIsJsonValid(true);
        } catch (err) {
          setIsJsonValid(false);
          console.log('Invalidr JSON structure. Check.');
          // throw err;
        }
        newState[row].data = value;
      }
      return newState;
    });
  };

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
                <select name="status" value={row.status} data-row={index} onChange={changeStatusHanlder}>
                  <option value="">select status</option>
                  {STATUS_LIST.map(status => <option value={status} key={status}>{status}</option>)}
                </select>
                <br />
                <textarea
                  onChange={changeStatusHanlder}
                  data-row={index}
                  name="data"
                  placeholder="Response Data"
                  value={row.data}
                  style={textAreaStyle} />
                <br />
                <button
                  onClick={addNewStatusGroup}
                  disabled={oneGroupForEachStatus}>
                  Add Status
                </button>
                <button
                  data-row={index}
                  onClick={removeStatusGroup}
                  disabled={formFields.length === 1}>
                  Remove Status
                </button>
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