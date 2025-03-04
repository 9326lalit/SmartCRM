// import Image from "next/image";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:flex">
          {/* <Image
            src="/signup-image.jpg"
            alt="Signup"
            width={600}
            height={600}
            className="object-cover"
          /> */}
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create an Account
          </h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <Input type="text" placeholder="Enter your full name" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Input type="email" placeholder="Enter your email" />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700">Password</label>
                <Input type="password" placeholder="Enter your password" />
              </div>
              
              <Button className="w-full">Sign Up</Button>
              
              <p className="text-sm text-center text-gray-600 mt-4">
                Already have an account? 
                <span className="text-blue-600 cursor-pointer"> Login</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
