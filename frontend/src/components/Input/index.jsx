// import { forwardRef } from "react";

import { Container } from "./style";

const Input = ({ children, error, register, name, ...rest }, ref) => {
  return (
    <Container>
      <section>
        {children}
        <input {...rest} {...register(name)} />
      </section>
      {error && <p>{error}</p>}
    </Container>
  );
};

export default Input;

// export default forwardRef(Input);
