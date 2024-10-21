import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import BookItemBack from "./BookItemBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
      <Card
        sx={cardStyle}
        onClick={handleOpen}
        role="button" // Ensure the Card behaves like a button
        tabIndex={0} // Make the Card focusable
        onKeyPress={(e) => { if (e.key === 'Enter') handleOpen(); }} // Allow keyboard activation
        aria-label={`View details for ${title} by ${authors?.join(", ")}`} // Provide an accessible label
      >
        <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          height="200"
          image={imageLinks?.thumbnail?.replace(/&edge=curl/g, "")}
          alt={`Cover of ${title} by ${authors?.join(", ")}`} // Alt text already descriptive
        />
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
          <MoreHorizIcon 
            sx={{ height: "2em", width: "2em" }} 
            aria-label="More options" // Add label for icon button
            role="button" // Indicate that it's a button
            tabIndex={0} // Make it focusable
            onKeyPress={(e) => { if (e.key === 'Enter') handleOpen(); }} // Allow keyboard activation
          />
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
