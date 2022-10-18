import { Box, Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import UserForm from "features/user/components/UserForm";
import {
  selectFulfilled,
  selectUsers,
  updateUser,
} from "features/user/userSlice";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "types/user";

function UpdateUser() {
  let { id } = useParams();
  const users = useAppSelector(selectUsers);
  const user = users.filter((user) => user.id.toString() === id)[0];
  const fulfilled = useAppSelector(selectFulfilled);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fulfilled) {
      alert("Usuário atualizado com sucesso!");
      navigate("/");
    }
  }, [fulfilled, navigate]);

  const onSubmit: SubmitHandler<User> = (data) => {
    dispatch(updateUser(data));
  };

  return (
    <Box py={6}>
      <Container>
        <Typography variant="h3" component="span">
          Adicionar Usuário
        </Typography>
        <UserForm onSubmit={onSubmit} user={user} />
      </Container>
    </Box>
  );
}

export default UpdateUser;
