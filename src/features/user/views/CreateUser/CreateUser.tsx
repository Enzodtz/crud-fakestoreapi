import {
  Box,
  Button,
  CircularProgress,
  Container,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Center from "features/user/components/Center";
import UserForm from "features/user/components/UserForm";
import {
  createUser,
  resetStatus,
  selectError,
  selectFulfilled,
  selectPending,
  selectUsers,
} from "features/user/userSlice";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User } from "types/user";

function CreateUser() {
  const dispatch = useAppDispatch();
  const fulfilled = useAppSelector(selectFulfilled);
  const pending = useAppSelector(selectPending);
  const error = useAppSelector(selectError);
  const navigate = useNavigate();

  useEffect(() => {
    if (fulfilled) {
      alert("Usuário criado com sucesso!");
      navigate("/");
    }
  }, [fulfilled]);

  const onSubmit: SubmitHandler<User> = (data) => {
    dispatch(createUser(data));
  };

  return (
    <Box py={6}>
      <Container>
        <Typography variant="h3" component="span">
          Atualizar Usuário
        </Typography>
        <UserForm onSubmit={onSubmit} />
      </Container>
    </Box>
  );
}

export default CreateUser;
