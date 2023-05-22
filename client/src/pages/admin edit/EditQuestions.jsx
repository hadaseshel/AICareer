import { useState, useEffect } from "react";
import axios from "axios";

import { Table } from "./components/Table";

function EditQuestions() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const [nameInput,setNameInput] = useState("");
  const [descriptionInput,setDescriptionInput] = useState("");

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

  // get Question by id
  async function getQuestion(questionId) {
    const url =`/api/questions/${questionId}`; 
      try {
          const response = await axios.get(url);
          const row = response.data
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
  async function updadeQuestion(questionId, name, description) {
    const url = `/api/questions/${questionId}`;
    try {
        await axios.put(url, { 
            name: name,  
            description: description});

    } catch (e) {
        console.log(e);
    } 
}

  // creat a qestion
  async function creatQuestion(path, name, description) {
    var data = {}
    try {
        const res = await axios.post(path, { name: name,  description: description});
        data = res.data
        if (nameInput!== "") {
          setRows([...rows,  {"_id":data._id ,"name":data.name, "description": data.description}]);
        }
        setNameInput("");
        setDescriptionInput("");
    } catch (e) {
        console.log(e);
    }
  }

  // delete a qestion
  async function deleteQuestion(questionId,targetIndex) {
      const url = `/api/questions/${questionId}`;
      try {
        const response = await axios.delete(url);
        // update in the coded data
        setRows(rows.filter((_, idx) => idx !== targetIndex));
      } catch (error) {
        console.error(error);
      }
  }

  const handleDeleteRow = (row, targetIndex) => {
    deleteQuestion(row._id,targetIndex);
  };

  const handleChangeRow = (value, targetIndex, row) => {
    if(value !== null){
      setRows(
        rows.map((currRow, idx) => {
          if (idx !== targetIndex) return currRow;

          return  {"_id":row._id ,"name":row.name, "description": value}
        })
      );
    }
  };

  const handleSaveRow = (row) => {
    updadeQuestion(row._id, row.name, row.description);
  };

  const handleRestorRow = (row) => {
    getQuestion(row._id);
  };

  const handleNewRow = () => {
    creatQuestion("/api/questions/",nameInput, descriptionInput);
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
      <Table rows={rows} deleteRow={handleDeleteRow} newRow={handleNewRow} saveRow={handleSaveRow}  restorRow={handleRestorRow} changeRow={handleChangeRow}
      nameInput={nameInput} setNameInput={setNameInput} descriptionInput={descriptionInput} setDescriptionInput={setDescriptionInput}/>
    </div>
  );
}

export default EditQuestions;