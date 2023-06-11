import React from "react";

import "./TableOfJob.css";
import { ProgressBar } from "react-bootstrap";

export const Table = ({ rows, firstTh, secondTh, thirdTh}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="">{thirdTh}</th>
            <th className="" >{firstTh}</th>
            <th className="expand">{secondTh}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            return (
              <tr key={idx}>
                <td className="">
                  <span className="">
                    <ProgressBar style={{width: 100, height: 15}} striped variant="success" now={row.Importance} text={row.Importance}>
                        <ProgressBar striped variant="success" now={row.Importance} text={row.Importance}/> 
                    </ProgressBar>
                  </span>
                </td>
                <td className="">
                  {row.name}
                </td>
                <td className="expand">
                  {row.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};