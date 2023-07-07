"use client";
import { useState } from 'react';
import axios from 'axios';

import Link from 'next/link';

import { STATUS_LIST } from '@/utils/constants';

const NewPage = () => {

  // User Entered data -- todo rename this shit.
  const [endpointPath, setEndpointPath] = useState('');
  const [statusFields, setStatusFields] = useState([{
    status: undefined,
    data: undefined,
  }]);

  const [isJsonValid, setIsJsonValid] = useState(true);
  const oneGroupForEachStatus = statusFields.length === STATUS_LIST.length;

  const enpointPathRegex = /^[A-Za-z0-9 ]*$/;

  // Temporal styles object
  const textAreaStyle = {
    outline: isJsonValid ? 'unset' : '2px solid red'
  }

  // Creates a new status group for another status
  const addNewStatusGroup = (event) => {
    event.preventDefault();
    setStatusFields((prevState) => {
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
    setStatusFields(
      (prevState) => prevState.filter((e, index) => index !== row)
    );
  };

  // Changes the path name the endpoint will have.
  const changePathHandler = (event) => {
    setEndpointPath(event.target.value);
  }

  // Changes the data for each status object
  const changeFormDataHanlder = (event) => {
    const row = event.target.dataset.row;
    const name = event.target.name;
    const value = event.target.value;
    setStatusFields((prevState) => {
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

  const isFormValid = () => {
    /**
     * Condiciones para validez:
     * 1) enpoinpath con datos [a-zA-Z0-9] ✅
     * 2) todos los status seleccionados ✅
     * 2.5) y no duplicados ✅
     * 3) todos los response data con json válidos ✅
     */

    // 1)
    const isPathValid = enpointPathRegex.test(endpointPath)
      && endpointPath.length > 0;

    // 2) && 3)
    let areAllStatusValid = true;
    let isAllDataValid = true;
    let noStatusDuplicated = true;
    let usedStatus = [];

    statusFields.forEach((field, index) => {
      if (field.status === undefined) {
        areAllStatusValid = false;
      }
      
      try {
        JSON.parse(field.data);
      } catch {
        isAllDataValid = false;
      }
      
      if (field.data === undefined || field.data?.length === 0) {
        isAllDataValid = false;
      }

      if(usedStatus.includes(field.status)) {
        noStatusDuplicated = false;
      }

      usedStatus.push(field.status)
    });

    return isPathValid && areAllStatusValid && isAllDataValid && noStatusDuplicated;
  };

  const submitHanlder = async (event) => {
    event.preventDefault();

    if(isFormValid()) {
      let endpointData = {};
  
      statusFields.forEach((field) => {
        endpointData[field.status] = field.data;
      });
  
      axios
        .post(
          '/api/new',
          { endpointPath, endpointData },
        )
        .then(res => console.log(res));
    }
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
          statusFields.map((row, index) => {
            return (
              <div style={{ margin: '50px' }} key={`row-${index}`}>
                <select name="status" value={row.status} data-row={index} onChange={changeFormDataHanlder}>
                  <option value="">select status</option>
                  {STATUS_LIST.map(status => <option value={status} key={status}>{status}</option>)}
                </select>
                <br />
                <textarea
                  onChange={changeFormDataHanlder}
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
                  disabled={statusFields.length === 1}>
                  Remove Status
                </button>
                <hr />
              </div>
            );
          })
        }

        <button type="submit">Guardarks</button>
      </form>
    </>
  );
}

export default NewPage;