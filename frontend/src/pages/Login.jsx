import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Login successful! Redirecting to dashboard...");
        navigate("/");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Error occurred. Please check console for details.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:flex">
          {/* <Image
            src="/auth-image.jpg"
            alt="Auth"
            width={600}
            height={600}
            className="object-cover"
          /> */}
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700">Password</label>
                <Input type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
              </div>
              
              <Button className="w-full" onClick={handleSubmit}>Login</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
