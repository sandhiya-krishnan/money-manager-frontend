const Login = ({ setUser }) => {
  const login = () => {
    const fakeUser = "123456789";
    localStorage.setItem("userId", fakeUser);
    setUser(fakeUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={login} className="bg-indigo-600 px-6 py-2 rounded">
        Login
      </button>
    </div>
  );
};

export default Login;