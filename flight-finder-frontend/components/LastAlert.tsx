import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

interface IMyProps {
  setLastCheck: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: React.Dispatch<React.SetStateAction<boolean>>;
  lastCheck: boolean;
  openModal: boolean;
  postSuccess: boolean;
}

const LastAlert: React.FC<IMyProps> = (props: IMyProps) => {
  const handleLastCheck = () => {
    props.setLastCheck(true);
    props.handleModal(!props.openModal);
  };

  return (
    <div>
      <Modal
        open={props.openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "whitesmoke",
            border: "2px solid #000",
            boxShadow: "24",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Click "Book" to finalize booking
          </Typography>
          <button
            onClick={handleLastCheck}
            style={{ padding: "0.3125rem", marginTop: "1rem" }}
          >
            Book
          </button>
        </Box>
      </Modal>

      {props.lastCheck ? (
        <Stack sx={{ width: "100%", marginTop: "1rem" }} spacing={2}>
          {props.postSuccess ? (
            <Alert severity="success">
              Your Flight is successfully booked!
            </Alert>
          ) : (
            <Alert severity="error">
              Couldn't book flight, please try again later.
            </Alert>
          )}
        </Stack>
      ) : null}
    </div>
  );
};

export default LastAlert;
