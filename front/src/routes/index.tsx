import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Header Common
import MainMenu from "../components/Layout/Header/MainMenu";
import Footer from "../components/Layout/Footer/Footer";

// Apply Forms
import ApplyForm from "../forms/ApplyForm";

// Level Forms
import LevelFormLists from "../pages/LevelForm/LevelFormLists";
import LevelFormCreateEdit from "../pages/LevelForm/LevelFormCreateEdit";

// Admin Lists
import AdminLists from "../components/Admin/AdminLists";
import AdminCreateEdit from "../components/Admin/AdminCreateEdit";

// Exam User Lists
import ExamUserLists from "../pages/ExamLists/ExamUserLists";
import ExamUserDetails from "../pages/ExamLists/ExamUserDetails";

// Mail Forms
import MailFormsDetail from "../pages/MailForms/MailFormsDetail";


const RoutesPage = () => {

  return (
    <React.Fragment>
      <BrowserRouter>
        <MainMenu>
          <Routes>
            <Route path="/" element={<ApplyForm />} />
            <Route>
              <Route path="/adminlists" element={<AdminLists />} />
              <Route path="/admin/create" element={<AdminCreateEdit />} />
              <Route path="/admin/edit/:id" element={<AdminCreateEdit />} />
            </Route>
            <Route>
              <Route path="/examuserlists" element={<ExamUserLists />} />
              <Route path="/user/detail/:id" element={<ExamUserDetails />} />
            </Route>
            <Route>
              <Route path="/mailforms" element={<MailFormsDetail />} />
            </Route>
            <Route>
              <Route path="/levelformlists" element={<LevelFormLists />} />
              <Route path="/levelform/create" element={<LevelFormCreateEdit />} />
              <Route path="/levelform/edit/:id" element={<LevelFormCreateEdit />} />
            </Route>
          </Routes>
          {/* Footer Page */}
          <Footer />
        </MainMenu>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default RoutesPage;