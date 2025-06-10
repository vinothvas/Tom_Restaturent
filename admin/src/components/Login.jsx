import React, { useState } from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
   try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin',{email, password});

      if(response.data.success) {
        setToken(response.data.token);
      }else{
        toast.error(response.data.message || 'Login failed. Please try again.');
      }
      
      
    }
    catch (error) {
      console.error('Login failed:', error);
      toast.error(error.message || 'An error occurred during login. Please try again.');
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
    
    <form className="space-y-4" onSubmit={onSubmitHandler}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="your@email.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input 
          type="password" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>

      <button type='submit' className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
        Sign In
      </button>
    </form>

    
  </div>
</div>
  )
}

export default Login