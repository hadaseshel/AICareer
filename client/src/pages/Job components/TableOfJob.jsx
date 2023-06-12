import React from "react";

import "./TableOfJob.css";
import { ProgressBar } from "react-bootstrap";

export const Table = ({ rows, firstTh, secondTh, thirdTh}) => {

  return (
    <div>
      <table className="mytable">
        <thead>
          <tr>
            <th className="">{thirdTh}</th>
            <th className="expand" >{firstTh}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            if (row.Importance > 30) {
            return (
              <tr key={idx} data-toggle="modal" data-target={"#"+row.name}>
                <td className="">
                  <span className="">
                    <ProgressBar style={{width: 100, height: 15}} striped variant="success" now={row.Importance} text={row.Importance}>
                        <ProgressBar striped variant="success" now={row.Importance} text={row.Importance}/> 
                    </ProgressBar>
                  </span>
                </td>
                <td className="expand">
                  {row.name}
                </td>
                <div class="modal fade modaldescription" id={row.name} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header text-overlay ">
                        <h5 class="modal-title overflow" id="exampleModalLabel">{row.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body overflow ">
                           {row.description}
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            );}
          })}
        </tbody>
      </table>
    </div>
  );
};