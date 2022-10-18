import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { User } from "types/user";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import flatten from "flat";
import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { resetStatus, selectUsers } from "features/user/userSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useNavigate } from "react-router-dom";

interface IRow {
  user: User;
}

function Row({ user }: IRow) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {user.id}
        </TableCell>
        <TableCell>{user.name.firstname + " " + user.name.lastname}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="warning"
            aria-label="edit"
            disableElevation
            style={{ marginRight: 10 }}
            onClick={() => {
              dispatch(resetStatus());
              navigate("/update/" + user.id.toString());
            }}
          >
            <Edit />
          </Button>
          <Button
            variant="contained"
            color="error"
            aria-label="delete"
            disableElevation
            onClick={() => {
              dispatch(resetStatus());
              navigate("/delete/" + user.id.toString());
            }}
          >
            <Delete />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Todos os Dados Do Usuário
              </Typography>
              {Object.entries(flatten(user)!).map((entry) => {
                const [key, value] = entry;
                return <p>{key + ": " + JSON.stringify(value)}</p>;
              })}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function UsersTable() {
  const users = useAppSelector(selectUsers);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Usuário</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <Row key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;
