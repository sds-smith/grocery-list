
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItem from "./ListItem";

export default function Section({title, listItems}) {
  return (
    <Box>
        <Typography>{title}</Typography>
        {listItems && Object.entries(listItems)?.map(([id, listItem]) => (
            <ListItem 
                key={id}
                listItem={listItem}
            />
        ))}
    </Box>
  )
}
