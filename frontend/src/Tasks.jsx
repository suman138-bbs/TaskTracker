import './index.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Tasks = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, [message]);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8080/getTask');
      setData(res.data.Result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete('http://localhost:8080/deleteTask/' + id);
      
      setMessage(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Task List</h3>
      </div>
      <div className='d-flex justify-content-center m-2 '>
        <Link to="/create" className='btn btn-success'>Add Task</Link>
      <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">Filter by Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className='mt-3'>
        
        <table className='table'>
          <thead>
            <tr>
              <th>Name Of The Task</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(({ name, priority }) =>
                name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!priorityFilter || priority === priorityFilter)
              )
              .map(({ id, name, description, start, end }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{description}</td>
                  <td>{start}</td>
                  <td>{end}</td>
                  <td>
                    <Link to={`/taskEdit/${id}`} className='btn btn-primary btn-sm me-2'>edit</Link>
                    <button onClick={() => handleDelete(id)} className='btn btn-sm btn-danger'>delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tasks;
