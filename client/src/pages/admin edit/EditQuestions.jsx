import { useState, useEffect } from "react";
import axios from "axios";

import { Table } from "./components/Table";
import { Modal } from "./components/Modal";

function EditQuestions() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
        try {
            const {data} = await axios.get('/api/questions', {});
            setRows(data);
        } catch (e) {
            console.log(e);
        } finally{
            setIsLoading(1);
        }
    }
    fetchQuestions();   
    }, []);

  const handleDeleteRow = (targetIndex) => {
    // update in the coded data
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx, val) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  if (isLoading != 1) {
    return(
        <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-38">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Loading...
                </h1>
            </div>
        </div>
    );
  }

  return (
    <div>
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <div className="mt-10 gap-x-6 text-center">
        <button type="button" class="btn btn-outline-dark" onClick={()=> setModalOpen(true)}>Add</button>
      </div>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default EditQuestions;