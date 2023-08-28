import React, { useState,useEffect } from 'react'
import axios from 'axios';
const Home = () => {
    
    const [taskCount,settaskCount] = useState(1)
   
  useEffect(() => {
    
    const getTaskCount= async() => {
			const res = await axios.get('http://localhost:8080/taskCount')
      console.log(res)
      settaskCount(res.data.result[0].task)
    }

    
    
    getTaskCount()
    
   },[])
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
       
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Task</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: {taskCount}</h5>
          </div>
        </div>
        
      </div>

      
    </div>
  )
}

export default Home