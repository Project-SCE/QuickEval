import Navbar2 from '../components/Navbar2';
import React, { useState } from 'react';

const SignIn = () => {


  const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  const reset=(e) =>{
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    setMessage("If your email is registered with us, you will receive a password reset email shortly.");
    console.log("Password reset email sent!")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setMessage(errorCode.substr(5, errorCode.length-1))
    console.log(errorCode, errorMessage)
    // ..
  });
}
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            var errorMessage = error.message;
            
            console.log(errorCode, errorMessage)
            setError(errorCode);
        });
       
    }



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the sign in logic here
    console.log(email, password);
  };

  return (
    <div style={{ position: 'relative', backgroundColor: '#FFFFFF' }}>
      <Navbar2 />
      <div className="min-h-screen flex flex-col bg--100" style={{ marginTop: '100px', alignItems: 'center' }}>
        <h2 className="text-5xl font-bold font-jakarta-sans text-gray-900" style={{ marginTop: '40px' }}>
          Sign In
        </h2>
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">
                Email
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-full relative block w-full px-3 py-5 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-bold font-jakarta-sans"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: '#CED7E4' }}
              />
            </div>
            <div>
              <div className="text-xl font-bold font-jakarta-sans text-black-600 mb-2">
                Password
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-full relative block w-full px-3 py-5 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm font-bold font-jakarta-sans"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: '#CED7E4' }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 font-bold font-jakarta-sans">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-bold font-jakarta-sans"
                style={{ backgroundColor: '#48628' }}
                >
                Sign In
              </button>
            </div>

        </div>

            
            {message &&<div className="error-message flex justify-center p-2 bg-red-100 border border-red-400 rounded">
                    <p>{message}</p>
                </div> }
        </form>

      </div>
    </div>
  );
};

export default SignIn;
