import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

const CreateTask = () => {
	const { id } = useParams();
	const navigate = useNavigate();
    const [data, setData] = useState({
        name:'',
        description:'',
        start:'',
        end:''
	})
	
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        
        try {
			const res = await axios.post('http://localhost:8080/createTask', data);
			console.log(res)
            if(res.data.Status=="Success") navigate('/tasks')

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>Create Task</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})} value={data.name}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Description</label>
					<input type="text" class="form-control" id="inputEmail4" placeholder='Enter Description' autoComplete='off'
					onChange={e => setData({...data, description: e.target.value})} value={data.email}/>
				</div>
				<div class="col-12">
					<label for="inputSalary" class="form-label">Start Date</label>
					<input type="date" class="form-control" id="inputSalary" placeholder="23-08-2023" autoComplete='off'
					onChange={e => setData({...data, start: e.target.value})} value={data.salary}/>
				</div>
				<div class="col-12">
					<label for="inputAddress" class="form-label">End Date</label>
					<input type="date" class="form-control"  placeholder="26-08-2023" autoComplete='off'
					onChange={e => setData({...data, end: e.target.value})} value={data.address}/>
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Create</button>
				</div>
			</form>
		</div>
  )
}

export default CreateTask;