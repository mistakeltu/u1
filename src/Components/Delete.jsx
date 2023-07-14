import { KEY } from "../App";
import { destroy } from "../Functions/LocalStorage";

export default function Delete({ setDeleteData, deleteData, setLastUpdate }) {
  const doDestroy = (_) => {
    if (deleteData.money > 0) {
      destroy(KEY, deleteData.id);
      setDeleteData(null);
      setLastUpdate(Date.now());
    } else {
      alert("This person has zero money in their bank account. Cannot delete.");
    }
  };
  return (
    <div className="modal popup">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete person</h5>
            <button
              type="button"
              className="btn-close"
              onClick={(_) => setDeleteData(null)}
            ></button>
          </div>
          <div className="modal-body">
            <p>Do you really want to delete person from bank?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(_) => setDeleteData(null)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={doDestroy}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
