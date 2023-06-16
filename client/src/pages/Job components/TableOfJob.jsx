import React from "react";

import "./TableOfJob.css";
import { ProgressBar } from "react-bootstrap";

export const Table = ({ rows, firstTh, secondTh, thirdTh }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="">{thirdTh}</th>
            <th className="expand">{firstTh}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            if (row.Importance > 30) {
              return (
                <React.Fragment key={idx}>
                  <tr data-toggle="modal" data-target={"#" + row.name}>
                    <td className="">
                      <span className="">
                        <ProgressBar
                          style={{ width: 100, height: 15 }}
                          striped
                          variant="success"
                          now={row.Importance}
                          text={row.Importance}
                        >
                          <ProgressBar
                            striped
                            variant="success"
                            now={row.Importance}
                            text={row.Importance}
                          />
                        </ProgressBar>
                      </span>
                    </td>
                    <td className="expand">{row.name}</td>
                  </tr>
                </React.Fragment>
              );
            }
            return null; // Add this line to handle the case when the if condition is not met
          })}
        </tbody>
      </table>
      {rows.map((row, idx) => {
        if (row.Importance > 30) {
          return (
            <div
              key={idx} // Add the key prop here
              className="modal fade modaldescription"
              id={row.name}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header text-overlay">
                    <h5 className="modal-title overflow" id="exampleModalLabel">
                      {row.name}
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body overflow">{row.description}</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null; // Add this line to handle the case when the if condition is not met
      })}
    </div>
  );
};

