import Navbar from "./Navbar";

const Layout = ({ children }) => {

  return (

    <div>

      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-16">

        {children}

      </div>

    </div>

  );

};

export default Layout;