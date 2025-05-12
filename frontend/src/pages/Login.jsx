import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://smartcrmbackend.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      // const token = response.data.token;

      // localStorage.setItem("authToken", token);

      if (response.ok) {
        login();
        alert('Login successful! Redirecting to dashboard...');
        navigate('/');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Error occurred. Please check console for details.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side - Unique Design */}
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-indigo-600 hidden md:flex items-center justify-center">
          <div className="text-white p-10">
            <h2 className="text-3xl font-bold">Welcome to SmartCRM</h2>
            <p className="mt-2 text-lg">Manage your clients and grow your business efficiently!</p>
            <img src="https://www.allbusiness.com/asset/2016/09/CRM.jpg" alt="Login Visual" className="mt-6 rounded-xl shadow-lg" />
          </div>
        </div>
        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Welcome Back</h2>
          <Card>
            <CardContent className="p-8">
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Input type="email" name="email" placeholder="Enter your email" onChange={handleChange} className="mt-1 w-full" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Password</label>
                <Input type="password" name="password" placeholder="Enter your password" onChange={handleChange} className="mt-1 w-full" />
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg" onClick={handleSubmit}>Login</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
