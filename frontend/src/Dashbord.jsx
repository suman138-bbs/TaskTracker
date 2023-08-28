import { Outlet, Link, useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'
import { useEffect } from 'react'
import axios from 'axios'
const Dashbord = () => {
	const navigate = useNavigate();
	axios.defaults.withCredentials = true;
	useEffect(() => {
		const getDashbord = async() => {
			const res = await axios.get('http://localhost:8080/dashbord');
			console.log(res)
			if (res.data.Status === "Success") {
				if (res.data.role === "admin") {
					navigate('/')
				 }
				else {
					navigate('/employeeDetail')
				}

			}
			else {
				navigate('/start')
			}
		}
		
		getDashbord()
	},[])

	const handleLogout = async (e) => {
		e.preventDefault()
		const res = await axios.get('http://localhost:8080/logout')
		console.log(res)
		if (res.data.Status === 'Success')
		{
			navigate('/start')
		}
		
	}
	

  return (
    <div className="container-fluid">
			<div className="row flex-nowrap">
				<div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 dashbord-left">
					<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
						<a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
							<span className="fs-5 fw-bolder d-none d-sm-inline">My Task</span>
						</a>
						<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
							<li>
								<Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
									<i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
							</li>
							<li>
								<Link to="/tasks" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Manage Tasks</span> </Link>
							</li>
							<li>
								<Link to="profile" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
							</li>
							<li onClick={handleLogout}>
								<a href="" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
							</li>
						</ul>
					</div>
				</div>
				<div class="col p-0 m-0 dashbord-right">
					<div className='p-2 d-flex justify-content-center shadow '>
						<h4>Task Tracker System</h4>						
					</div>
					<Outlet />
				</div>
			</div>
		</div>
  )
}

export default Dashbord