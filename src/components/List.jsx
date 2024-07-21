
import Container from '@mui/material/Container';
import Section from './Section';

export default function List({listItems, sections, handleOpenModal}) {
    const listItemsBySection = Object.entries(listItems)?.reduce((acc, [itemId, itemObj]) => {
        if (itemId === 'isArchived') return acc
        return { 
           ...acc,
           [itemObj.section] : {
               ...acc[itemObj.section],
               [itemId] : itemObj
           }
        } || {}
    }, {})

    const sortHelper = (a, b) => {
        const [a_id] = a;
        const [b_id] = b;
        return sections[a_id].position - sections[b_id].position;
    }

    return (
        <Container sx={{marginBottom: '80px'}}>
            {Object.entries(listItemsBySection).sort((a, b) => sortHelper(a, b)).map(([id, listItems]) => (
                <Section 
                    key={id}
                    title={sections[id].title}
                    listItems={listItems}
                    handleOpenModal={handleOpenModal}
                />
            ))}
        </Container>

    )
}
