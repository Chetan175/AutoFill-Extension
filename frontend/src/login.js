const LoginForm = () => {
  return (
    <div className="form">
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input placeholder="Enter your username"></input>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const SignupForm = () => {
  return (
    <div className="form">
      <h2>Sign Up</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" placeholder="Confirm your password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
