import { useState, useEffect } from "react";
import axios from "axios";

import { Table } from "./components/Table";

function EditQuestions() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(0);
  const [nameInput,setNameInput] = useState("Name");
  const [descriptionInput,setDescriptionInput] = useState("Description");

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

  async function getQuestion(path,nameOfQ) {
    console.log("getQuestion", path, nameOfQ)
      try {
          const response = await axios.get(path, { params: { name: nameOfQ } });
          const row =  response.data[0]
          setRows(
            rows.map((currRow, idx) => {
              if (currRow.name !== row.name) return currRow;
  
              return row;
            })
          );
      } catch (e) {
          console.log(e);
      }
  }

  // UPDATE the description of qestion with name=name
  async function updadeQuestion(path, name, description) {
    console.log({name, description})
    try {
        await axios.put(path, { 
            name: name,  
            description: description});

    } catch (e) {
        console.log(e);
    } 
}

  const handleDeleteRow = (targetIndex) => {
    // update in the coded data
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleChangeRow = (value, targetIndex, row) => {
    if(value !== null){
      setRows(
        rows.map((currRow, idx) => {
          if (idx !== targetIndex) return currRow;

          return  {"name":row.name, "description": value}
        })
      );
    }
  };

  const handleSaveRow = (row,targetIndex) => {
    updadeQuestion("/api/questions/name", row.name, row.description);
  };

  const handleRestorRow = (row, targetIndex) => {
    getQuestion("/api/questions/name",row.name)
  };

  const handleEditRow = (idx) => {
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
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} saveRow={handleSaveRow}  restorRow={handleRestorRow} changeRow={handleChangeRow}
      nameInput={nameInput} setNameInput={setNameInput} descriptionInput={descriptionInput} setDescriptionInput={setDescriptionInput}/>
    </div>
  );
}

export default EditQuestions;