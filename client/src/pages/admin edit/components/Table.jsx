import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { FaSave } from 'react-icons/fa';
import {GrRefresh} from 'react-icons/gr';


import "./Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
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
                <td>{row.name}</td>
                <td className="expand">{row.description}</td>
                <td className="fit">
                  <span className="actions">
                    <FaSave
                      className="save-btn"
                    />
                    <GrRefresh
                      className="save-btn"
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