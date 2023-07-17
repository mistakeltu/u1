import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { get, store } from "./Functions/LocalStorage";
import Delete from "./Components/Delete";
import Edit from "./Components/Edit";

export const KEY = "persons";

function App() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [persons, setPersons] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);

  const [fundsInput, setFundsInput] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const createPersonInfo = (_) => {
    const person = {
      name,
      lastName,
      money: 0,
    };
    store(KEY, person);
    setLastName("");
    setName("");
    setLastUpdate(Date.now());
  };

  useEffect(
    (_) => {
      setPersons(get(KEY));
    },
    [lastUpdate]
  );

  const addFunds = () => {
    if (selectedPerson && fundsInput) {
      const updatedPersons = persons.map((person) => {
        if (person.id === selectedPerson.id) {
          return { ...person, money: person.money + parseInt(fundsInput) };
        }
        return person;
      });
      setPersons(updatedPersons);
      setSelectedPerson(null);
      setFundsInput("");
    }
  };

  const subtractFunds = () => {
    if (selectedPerson && fundsInput) {
      const updatedPersons = persons.map((person) => {
        if (person.id === selectedPerson.id) {
          const updatedMoney = person.money - parseInt(fundsInput);
          return {
            ...person,
            money: updatedMoney >= 0 ? updatedMoney : 0,
          };
        }
        return person;
      });
      setPersons(updatedPersons);
      setSelectedPerson(null);
      setFundsInput("");
    }
  };

  useEffect(() => {
    if (persons) {
      const sortedPersons = persons.slice().sort((a, b) => {
        const lastNameA = a.lastName.toLowerCase();
        const lastNameB = b.lastName.toLowerCase();
        return lastNameA.localeCompare(lastNameB);
      });
      setPersons(sortedPersons);
    }
  }, [persons]);

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-4">
            <div className="card mt-4">
              <h3 className="card-header">Add new person to bank</h3>
              <div className="card-body">
                <fieldset>
                  <legend>Person name</legend>
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={handleChangeName}
                    />
                  </div>
                  <legend>Person lastname</legend>
                  <div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={handleChangeLastName}
                    />
                  </div>
                  <button onClick={createPersonInfo}>Add</button>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="col-8 mt-4">
            <div className="card">
              <h1 className="card-header">Persons</h1>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>LastName</th>
                      <th>Money</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {persons &&
                      persons.map((person) => (
                        <tr key={person.id}>
                          <td>{person.name}</td>
                          <td>{person.lastName}</td>
                          <td>{person.money}</td>
                          <td>
                            {selectedPerson &&
                            selectedPerson.id === person.id ? (
                              <div>
                                <input
                                  type="number"
                                  value={fundsInput}
                                  onChange={(e) =>
                                    setFundsInput(e.target.value)
                                  }
                                  placeholder="Enter funds amount"
                                />
                              </div>
                            ) : null}
                          </td>
                          <td>
                            {selectedPerson &&
                            selectedPerson.id === person.id ? (
                              <>
                                <button onClick={addFunds}>Confirm</button>
                                <button onClick={subtractFunds}>
                                  Subtract
                                </button>
                              </>
                            ) : (
                              <button onClick={() => setSelectedPerson(person)}>
                                Add funds
                              </button>
                            )}
                          </td>
                          <td>
                            <button onClick={(_) => setDeleteData(person)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {deleteData && (
        <Delete
          setDeleteData={setDeleteData}
          deleteData={deleteData}
          setLastUpdate={setLastUpdate}
        />
      )}
      {editData && (
        <Edit
          setEditData={setEditData}
          editData={editData}
          setLastUpdate={setLastUpdate}
        />
      )}
    </>
  );
}

export default App;
