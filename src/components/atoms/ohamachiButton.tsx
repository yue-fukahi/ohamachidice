import { Button } from "@mui/material";

interface Props {
  onClick: Function;
  disabled: boolean;
}

const OhamachiButton = (props: Props) => {
  const handleOnClick = () => props.onClick();

  return (
    <Button
      variant="outlined"
      onClick={handleOnClick}
      disabled={props.disabled}
    >
      おはまちこする
    </Button>
  );
};

export { OhamachiButton };
