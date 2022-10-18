import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Center from "features/user/components/Center";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  readUsers,
  resetStatus,
  selectFulfilled,
  selectPending,
  selectUsers,
} from "../../userSlice";

import UsersTable from "./UsersTable";

function ListUsers() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector(selectUsers);
  const pending = useAppSelector(selectPending);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(readUsers());
    }
  }, [users]);

  if (pending) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }

  return (
    <Box py={6}>
      <Container>
        <Box pb={3} justifyContent="space-between" display="flex">
          <Typography variant="h3" component="span">
            Usuários
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              dispatch(resetStatus());
              navigate("/add");
            }}
          >
            Novo
          </Button>
        </Box>
        <UsersTable />
      </Container>
    </Box>
  );
}

export default ListUsers;
