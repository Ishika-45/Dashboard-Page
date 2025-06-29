import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider , CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Navbar from "./scenes/global/Navbar";
import Sidebar from "./scenes/global/sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team/index";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import KanbanBoard from "./scenes/kanban";
import Calendar from "./scenes/calendar";
// import KanbanBoard from "./components/KanbanBoard";


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value = {colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Sidebar />
          <main className="content">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
<Route path="/kanban" element={<KanbanBoard />} />
              <Route path="/calendar" element={<Calendar />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
      
    </ColorModeContext.Provider>
      
  );
}

export default App;
