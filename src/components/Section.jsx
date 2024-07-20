
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItem from "./ListItem";

export default function Section({title, listItems, handleOpenModal}) {
  return (
    <Box mt={1} mb={2}>
        <Typography sx={{fontWeight: 'bold'}}>{title}</Typography>
        {listItems && Object.entries(listItems)?.map(([id, listItem]) => (
            <ListItem 
                key={id}
                listItem={listItem}
                handleOpenModal={handleOpenModal}
            />
        ))}
    </Box>
  )
}
