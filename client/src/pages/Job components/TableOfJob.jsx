import React from "react";

import "./TableOfJob.css";
import { ProgressBar } from "react-bootstrap";

export const Table = ({ rows, firstTh, secondTh, thirdTh}) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>{firstTh}</th>
            <th className="expand">{secondTh}</th>
            <th>{thirdTh}</th>
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
                  {row.description}
                </td>
                <td className="fit">
                  <span className="actions">
                    <ProgressBar style={{width: 100, height: 15}} striped variant="success" now={row.Importance} text={row.Importance}>
                        <ProgressBar striped variant="success" now={row.Importance} text={row.Importance}/> 
                    </ProgressBar>
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