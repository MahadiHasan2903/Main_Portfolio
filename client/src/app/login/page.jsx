import LoginForm from "../../lib/components/Login/LoginForm";
import React from "react";

const Login = () => {
  return (
    <section className="mb-[110px] xl:mb-[149px]">
      <div className="container mx-auto">
        <div className="grid xl:grid-cols-2 pt-12 xl:h-[480px] mb-6 xl:mb-24 items-center">
          <div className="flex flex-col justify-center">
            <div className="flex items-center mb-4 text-lg gap-x-4 text-primary">
              <span className="w-[30px] h-[2px] bg-primary"></span>
              Only for Admin
            </div>
            <h1 className="max-w-md mb-8 h1">Login</h1>
            <p className="subtitle max-w-[400px]">
              This page is restricted. The login access is exclusively for
              administrator and is not accessible to visitors.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
