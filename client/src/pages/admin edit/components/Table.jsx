import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FaSave } from 'react-icons/fa';
import {GrRefresh} from 'react-icons/gr';
import {IoMdAddCircle} from "react-icons/io";


import "./Table.css";

export const Table = ({ rows, deleteRow, newRow ,saveRow, restorRow, changeRow, nameInput,setNameInput, descriptionInput,setDescriptionInput}) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="expand">Question</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>
                  {row.name}
                </td>
                <td className="expand">
                  <input type="text" value={row.description} onChange={(e) => changeRow(e.target.value, idx, row)}></input>
                </td>
                <td className="fit">
                  <span className="actions">
                    <FaSave
                      className="save-btn"
                      onClick={()=>saveRow(row)}
                    />
                    <GrRefresh
                      className="refresh-btn"
                      onClick={()=>restorRow(row)}
                    />
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(row, idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
               <tr id="add newQ">
                <td>
                <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)}></input>
                </td>
                <td className="expand">
                  <input type="text" value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)}></input>
                </td>
                <td className="fit">
                  <span className="actions">
                    <IoMdAddCircle
                      className="save-btn"
                      onClick={()=>newRow()}
                    />
                  </span>
                </td>
              </tr>
        </tbody>
      </table>
    </div>
  );
};