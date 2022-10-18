import { Button, CircularProgress, styled, TextField } from "@mui/material";
import React from "react";
import { User } from "types/user";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "app/hooks";
import { selectPending } from "../userSlice";

const SpacedTextField = styled(TextField)`
  margin-top: 10px;
  margin-right: 10px;
`;

interface IUserForm {
  onSubmit: SubmitHandler<User>;
  user?: User;
}

function UserForm({ onSubmit, user }: IUserForm) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>({ defaultValues: user });
  const pending = useAppSelector(selectPending);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SpacedTextField
        variant="outlined"
        {...register("username")}
        label="Nome de Usuário"
        placeholder="Nome de Usuário"
      />
      {errors.email && <p>{errors.username?.message}</p>}
      <SpacedTextField
        variant="outlined"
        {...register("password")}
        label="Senha"
        placeholder="Senha"
        type="password"
      />
      {errors.email && <p>{errors.password?.message}</p>}
      <SpacedTextField
        variant="outlined"
        {...register("email")}
        placeholder="Email"
        label="Email"
        type="email"
      />
      {errors.email && <p>{errors.email?.message}</p>}
      <br />
      <SpacedTextField
        variant="outlined"
        {...register("name.firstname")}
        placeholder="Nome"
        label="Nome"
      />
      {errors.email && <p>{errors.name?.firstname?.message}</p>}
      <SpacedTextField
        variant="outlined"
        {...register("name.lastname")}
        label="Sobrenome"
        placeholder="Sobrenome"
      />
      {errors.email && <p>{errors.name?.lastname?.message}</p>}
      <SpacedTextField
        variant="outlined"
        {...register("phone")}
        label="Telefone"
        placeholder="Telefone"
      />
      {errors.email && <p>{errors.phone?.message}</p>}
      <br />

      <SpacedTextField
        variant="outlined"
        {...register("address.city")}
        placeholder="Cidade"
        label="Cidade"
      />
      {errors.email && <p>{errors.address?.city?.message}</p>}
      <SpacedTextField
        variant="outlined"
        {...register("address.street")}
        placeholder="Rua"
        label="Rua"
      />
      {errors.email && <p>{errors.address?.street?.message}</p>}
      <SpacedTextField
        variant="outlined"
        {...register("address.number")}
        placeholder="Número"
        label="Número"
      />
      {errors.email && <p>{errors.address?.number?.message}</p>}
      <br />
      <SpacedTextField
        variant="outlined"
        {...register("address.zipcode")}
        placeholder="CEP"
        label="CEP"
      />
      {errors.email && <p>{errors.address?.zipcode?.message}</p>}
      <SpacedTextField
        variant="outlined"
        {...register("address.geolocation.lat")}
        placeholder="Latitude"
        label="Latitude"
      />
      {errors.email && <p>{errors.address?.geolocation?.lat?.message}</p>}
      <SpacedTextField
        variant="outlined"
        {...register("address.geolocation.long")}
        placeholder="Longitude"
        label="Longitude"
      />
      {errors.email && <p>{errors.address?.geolocation?.long?.message}</p>}
      <br />
      <Button
        size="large"
        variant="contained"
        style={{ marginTop: 10 }}
        type="submit"
        disabled={pending}
      >
        {pending ? <CircularProgress /> : "Enviar"}
      </Button>
    </form>
  );
}

export default UserForm;
