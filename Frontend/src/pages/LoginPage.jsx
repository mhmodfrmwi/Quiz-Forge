import  {   useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 
  const [error, setError] = useState('');
  const apiUrl=import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  
  const handleLogin = async(e) => {
    e.preventDefault();
    setError('');
    try{
      const response = await axios.post(`${apiUrl}/auth/login`,{
      email,
      password
    })
    
    const user=response.data;

    if(role !==user.role){
      setError('Invalid email, password, or role. Please try again.');
      return;
    }
      localStorage.setItem('user', JSON.stringify(user));
      
      if (user.role === 'student') navigate('/student-dashboard');
      else if (user.role === 'instructor') navigate('/instructor-dashboard');
      else if (user.role === 'admin') navigate('/admin-dashboard');

   } catch(err){
       setError(err.response?.data?.message || 'Invalid email, password, or role. Please try again.');
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-indigo-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Login to Exam System</h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
       
          <div className="flex justify-around p-2 bg-slate-100 rounded-xl">
            {['student', 'instructor', 'admin'].map((r) => (
              <label key={r} className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="role" 
                  value={r} 
                  checked={role === r}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2 accent-indigo-600"
                />
                <span className="capitalize text-sm font-medium">{r}</span>
              </label>
            ))}
          </div>

          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-3 border-2 rounded-xl focus:border-indigo-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border-2 rounded-xl focus:border-indigo-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm font-bold animate-shake">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;