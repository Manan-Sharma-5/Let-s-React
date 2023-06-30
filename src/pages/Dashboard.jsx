import React, {useState} from "react";
import Header from "../components/Header";
import Leftside from "../components/Leftside";
import Rightside from "../components/Rightside";

function Dashboard({setIsAuthenticated}) {

    const[val, setVal] = useState(0)

    const valChange = (x) => {
        setVal(x);
        console.log(val);
    }
    

  return (
    <div className="bg-[#252A34] min-h-screen">
    <Header />
    <div className="flex ">
    <Leftside tptp={valChange} setIsAuthenticated={setIsAuthenticated}/>
    <Rightside />
    </div>
    </div>
  );
}

export default Dashboard;