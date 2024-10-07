import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import BookItemBack from "./BookItemBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

export default function BookItem({ book }) {
  const { title, authors, imageLinks, canonicalVolumeLink } = book.volumeInfo;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cardStyle = {
    width: 200,
    paddingTop: 2,
    paddingLeft: 1,
    paddingRight: 1,
    backgroundColor: "#E09F3E",
  };

  return (
    <div>
      <Card sx={cardStyle} onClick={handleOpen}>
        {imageLinks ? <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          height="200"
          image={imageLinks?.thumbnail?.replace(/&edge=curl/g, "")}
          alt={`Cover of ${title} by ${authors?.join(", ")}`}
        />
          : <ImageNotSupportedIcon style={{ fontSize: 40, height: 200 }} color="action" />}
        <CardActions
          disableSpacing
          sx={{
            height: "2rem",
            padding: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MoreHorizIcon sx={{ height: "2em", width: "2em" }} />
        </CardActions>
      </Card>
      <BookItemBack
        title={title}
        authors={authors}
        canonicalVolumeLink={canonicalVolumeLink}
        open={open}
        handleClose={handleClose}
        width={cardStyle.width}
        height={264}
      />
    </div>
  );
}
