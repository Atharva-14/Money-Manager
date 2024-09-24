import Label from "./Label";
import Input from "./Input";
import { useRef } from "react";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("formData", formData);

    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <form className="my-8" onSubmit={handleSubmit}>
      <h1 className="text-white font-semibold text-xl mb-8">
        Welcome to Money Manager
      </h1>
      <div className="flex flex-col mb-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="name"
          placeholder="Name"
          ref={nameRef}
          required
        />
      </div>
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
        Sign up →
      </button>
    </form>
  );
};

export default Signup;
