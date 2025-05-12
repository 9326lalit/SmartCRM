import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://smartcrmbackend.onrender.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration successful! Redirecting to login page...');
        navigate('/login');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed', error);
      alert('Error occurred. Please check console for details.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="w-1/2 bg-gradient-to-tr from-teal-400 to-blue-600 hidden md:flex items-center justify-center">
          <div className="text-white p-10">
            <h2 className="text-3xl font-bold">Join SmartCRM</h2>
            <p className="mt-2 text-lg">Create your account and start managing your business effortlessly!</p>
            <img src="https://static.vecteezy.com/system/resources/previews/004/261/180/original/account-login-line-icon-new-user-register-free-vector.jpg" alt="Register Visual" className="mt-6 rounded-xl shadow-lg" />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Create an Account</h2>
          <Card>
            <CardContent className="p-8">
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <Input type="text" name="name" placeholder="Enter your full name" onChange={handleChange} className="mt-1 w-full" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Input type="email" name="email" placeholder="Enter your email" onChange={handleChange} className="mt-1 w-full" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Password</label>
                <Input type="password" name="password" placeholder="Enter your password" onChange={handleChange} className="mt-1 w-full" />
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg mb-4" onClick={handleSubmit}>Sign Up</Button>
              <p className="text-gray-600 text-center">Already registered? <span className="text-teal-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}>Go to Login</span></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
