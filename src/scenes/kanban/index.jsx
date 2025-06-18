import { Box } from "@mui/material";
import Header from "../../components/Header";
import KanbanBoard from "../../components/KanbanBoard";

const Kanban = () => {
    return(
        <Box m="20px">
            <Header title="Kanban Board" subtitle="Manage tasks effectively"/>
            <Box height="75vh">
                <KanbanBoard/>
            </Box>
        </Box>
    )
}

export default Kanban;