import Label from "./Label";
import Input from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const { logInUser, token } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password_hash: passwordRef.current.value,
    };
    setLoading(true);

    try {
      const res = await logInUser(formData);

      console.log("Response", res);
    } catch (error) {
      console.error("Unable to Login", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(token);

  return (
    <form className="my-8" onSubmit={handleSubmit}>
      <h1 className="text-white font-semibold text-xl mb-8">
        Welcome to Money Manager
      </h1>
      <div className="flex flex-col mb-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full mb-4 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
      >
        Login →
      </button>
    </form>
  );
};

export default Login;
