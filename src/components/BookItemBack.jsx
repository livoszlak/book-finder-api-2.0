import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import LinkIcon from "@mui/icons-material/Link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#E09F3E",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function BookItemBack({
  title,
  authors,
  canonicalVolumeLink,
  open,
  handleClose,
  width,
  height,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-authors"
      closeAfterTransition // Improves focus management and accessibility
    >
      <Box
        sx={{
          ...style,
          width,
          height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
        role="dialog" // Indicate this Box is a dialog
        aria-modal="true" // Indicate it is a modal
      >
        <Box className="text-wrapper">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-authors" sx={{ mt: 2 }} variant="body2">
            {authors?.join(", ")}
          </Typography>
        </Box>
        <IconButton aria-label="Link to book" onClick={() => window.open(canonicalVolumeLink, '_blank', 'noopener,noreferrer')}>
          <LinkIcon sx={{ height: "2em", width: "2em" }} />
        </IconButton>
      </Box>
    </Modal>
  );
}
