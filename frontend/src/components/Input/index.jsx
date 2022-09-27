// import { forwardRef } from "react";

import { Container } from "./style";

const Input = ({ children, error, register, name, ...rest }, ref) => {
  return (
    <Container>
      {children}
      <input {...rest} {...register(name)} />
      {error && <p>Necessário</p>}
    </Container>
  );
};

export default Input;

// export default forwardRef(Input);
