import { useEffect, useState } from "react";
import { deleteConstumerById, getCustomers, updateCustomer } from "./CustomerService";

function GetCustomers() {
  const [Customer, setCustomer] = useState([]);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState({
    cname: "",
    age: "",
    phoneNumber: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await getCustomers();
    setCustomer(result.data);
  };

  const remove = async (id) => {
    await deleteConstumerById(id);
    loadData();
  };

  const startEditing = (customer) => {
    setEditingCustomerId(customer.cid);
    setEditedCustomer({
      cname: customer.cname,
      age: customer.age,
      phoneNumber: customer.phoneNumber,
      city: customer.city,
      state: customer.state,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    await updateCustomer(id, editedCustomer);
    setEditingCustomerId(null);
    loadData();
  };

  return (
    <div className="customer-page">
      <h1>Customer Records</h1>
      <div className="table-wrapper">
        <table className="customer-table">
          <thead>
            <tr>
              <th>cid</th>
              <th>cname</th>
              <th>age</th>
              <th>phoneNumber</th>
              <th>city</th>
              <th>state</th>
              <th>delete</th>
              <th>update</th>
            </tr>
          </thead>
          <tbody>
            {Customer.map((c) => (
              <tr key={c.cid}>
                <td>{c.cid}</td>
                {editingCustomerId === c.cid ? (
                  <>
                    <td>
                      <input type="text" name="cname" value={editedCustomer.cname} onChange={handleEditChange} />
                    </td>
                    <td>
                      <input type="text" name="age" value={editedCustomer.age} onChange={handleEditChange} />
                    </td>
                    <td>
                      <input type="text" name="phoneNumber" value={editedCustomer.phoneNumber} onChange={handleEditChange} />
                    </td>
                    <td>
                      <input type="text" name="city" value={editedCustomer.city} onChange={handleEditChange} />
                    </td>
                    <td>
                      <input type="text" name="state" value={editedCustomer.state} onChange={handleEditChange} />
                    </td>
                    <td colSpan="2" className="inline-actions">
                      <button className="primary-button" onClick={() => saveEdit(c.cid)}>Save</button>
                      <button className="secondary-button" onClick={() => setEditingCustomerId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{c.cname}</td>
                    <td>{c.age}</td>
                    <td>{c.phoneNumber}</td>
                    <td>{c.city}</td>
                    <td>{c.state}</td>
                    <td>
                      <button className="danger-button" onClick={() => remove(c.cid)}>Delete</button>
                    </td>
                    <td>
                      <button className="secondary-button" onClick={() => startEditing(c)}>Update</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetCustomers;