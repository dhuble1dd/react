import React, { useRef, useState, useMemo, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

const App1 = ()=>{



    return (
        <div>
            <Link to={`/2`}>Go to second</Link>
            page1
        </div>
    )


    
}


export default App1;
