
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInsuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";


function OAuth() {
            // You can send the user info to your backend here
        const dispatch = useDispatch();
        const navigate = useNavigate();
        
  const handleGoogleAuth = async () => {
    try {
      
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;


        const backendResponse = await fetch("/BackEnd/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                username: user.displayName,
                photo: user.photoURL,
            }),
        });

        const data = await backendResponse.json();
        if (backendResponse.ok && data.success) {
            dispatch(signInsuccess(data));
            navigate("/");
        }

    } catch (error) {
      console.error("OAuth Error:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 mt-4">
      <button
        onClick={handleGoogleAuth}
        className="
          w-full
          flex items-center justify-center gap-3
          border-2 border-gray-500
          py-2 rounded-lg
          text-lg
          text-gray-800 font-medium
          hover:bg-gray-100
          transition
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>
    </div>
  );
}

export default OAuth;
