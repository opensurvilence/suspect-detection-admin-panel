import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";

import Invoices from "./scenes/invoices";
import Suspects from "./scenes/suspects";
import AddForm from "./scenes/form/add_user";
import DeleteForm from "./scenes/form/delete_user";
import FAQ from "./scenes/faq";
import Team from "./scenes/team/index";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Cookies from 'js-cookie';
import Login from "./scenes/login/Login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const user=Cookies.get('user');
 
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>

        <CssBaseline />
        <div className="app">

       
         
          {user? <><Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              
              <Route path="/" element={<Dashboard />} />
              <Route path="/delete/user" element={<DeleteForm />} />
              <Route path="/users"element={<Team />} />
              <Route path="/suspects" element={<Suspects  />} />
              <Route path="/invoices" element={<Invoices  />} />
              <Route path="/add/user" element={<AddForm  />} />
              <Route path="/faq" element={<FAQ   />} />
            
            </Routes>
          </main> </>:
          <>
            <Login />
          </>
          }
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
