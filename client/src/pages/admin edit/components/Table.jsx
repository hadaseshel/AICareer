import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FaSave } from 'react-icons/fa';
import {GrRefresh} from 'react-icons/gr';


import "./Table.css";

export const Table = ({ rows, deleteRow, editRow ,saveRow, restorRow, changeRow}) => {
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
                  <input type="text" value={row.description} onChange={(e) => changeRow("description", e.target.value, idx, row)}></input>
                </td>
                <td className="fit">
                  <span className="actions">
                    <FaSave
                      className="save-btn"
                      onClick={()=>saveRow(row, idx)}
                    />
                    <GrRefresh
                      className="refresh-btn"
                      onClick={()=>restorRow(row, idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};