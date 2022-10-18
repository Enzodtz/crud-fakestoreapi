import CreateUser from "features/user/views/CreateUser/CreateUser";
import DeleteUser from "features/user/views/DeleteUser/DeleteUser";
import ListUsers from "features/user/views/ListUsers/ListUsers";
import UpdateUser from "features/user/views/UpdateUser/UpdateUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DeleteUser />} path="/delete/:id" />
        <Route element={<UpdateUser />} path="/update/:id" />
        <Route element={<CreateUser />} path="/add" />
        <Route element={<ListUsers />} path="/" />
      </Routes>
    </Router>
  );
}

export default App;
