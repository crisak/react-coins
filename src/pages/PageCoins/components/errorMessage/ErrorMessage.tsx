import { MdErrorOutline } from "react-icons/md";
import { Box, Paragraph, Title } from "../../../../common/components";
import { DefaultProps } from "../../../../common/interfaces/DefaultProps";

export const ErrorMessage = (props: DefaultProps) => {
  return (
    <Box>
      <div className="p5">
        <Title className="text-primary mb4 flex flex-items-center">
          <MdErrorOutline /> <span className="ml1">¡Error!</span>
        </Title>
        <Paragraph className="mb6">
          Se ha presentado un error en el servidor espera unos segundos he
          intenta de nuevo.
        </Paragraph>
        {props.children}
      </div>
    </Box>
  );
};
