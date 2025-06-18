// KanbanBoard.jsx
import React, { useState } from "react";
import {
  useTheme,
  Typography,
  Button,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { tokens } from "../theme";
import Header from "./Header";

const KanbanBoard = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [
        { id: "1", content: "Market research" },
        { id: "2", content: "Write Projects" },
      ],
    },
    inProgress: {
      name: "In Progress",
      items: [{ id: "3", content: "Design UI mockups" }],
    },
    done: {
      name: "Done",
      items: [{ id: "4", content: "Set up repository" }],
    },
  });

  const [newTask, setNewTask] = useState("");
  const [activeColumn, setActiveColumn] = useState("todo");
  const [draggedItem, setDraggedItem] = useState(null);

  const addNewTask = () => {
    if (!newTask.trim()) return;
    const updated = { ...columns };
    updated[activeColumn].items.push({
      id: Date.now().toString(),
      content: newTask,
    });
    setColumns(updated);
    setNewTask("");
  };

  const removeTask = (colId, taskId) => {
    const updated = { ...columns };
    updated[colId].items = updated[colId].items.filter((i) => i.id !== taskId);
    setColumns(updated);
  };

  const handleDragStart = (colId, item) =>
    setDraggedItem({ columnId: colId, item });
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, colId) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.columnId === colId) return;

    const updated = { ...columns };
    updated[draggedItem.columnId].items = updated[
      draggedItem.columnId
    ].items.filter((i) => i.id !== draggedItem.item.id);
    updated[colId].items.push(draggedItem.item);
    setColumns(updated);
    setDraggedItem(null);
  };

  const columnTheme = {
    todo: {
      header: colors.blueAccent[700],
      border: colors.blueAccent[400],
    },
    inProgress: {
      header: colors.redAccent[600],
      border: colors.redAccent[400],
    },
    done: {
      header: colors.greenAccent[600],
      border: colors.greenAccent[400],
    },
  };

  const textColor = theme.palette.mode === "light" ? colors.grey[900] : colors.grey[100];

  return (
    <Box p={isDashboard ? 1 : 3}>
      {!isDashboard && (
        <Box display="flex" gap={2} mb={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNewTask()}
            sx={{
              backgroundColor: colors.primary[400],
              input: { color: colors.grey[100] },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.primary[300],
              },
            }}
          />

          <TextField
            select
            value={activeColumn}
            onChange={(e) => setActiveColumn(e.target.value)}
            sx={{
              minWidth: 160,
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: colors.primary[300],
              },
            }}
          >
            {Object.entries(columns).map(([colId, col]) => (
              <MenuItem key={colId} value={colId}>
                {col.name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            onClick={addNewTask}
            sx={{
              background: `linear-gradient(to right, ${colors.redAccent[600]}, ${colors.redAccent[400]})`,
              color: colors.grey[900],
              fontWeight: "bold",
            }}
          >
            Add
          </Button>
        </Box>
      )}

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        gap={2}
        width="100%"
      >
        {Object.entries(columns).map(([colId, col]) => (
          <Box
            key={colId}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, colId)}
            sx={{
              flex: 1,
              minWidth: 0,
              backgroundColor: colors.primary[400],
              borderTop: `6px solid ${columnTheme[colId].border}`,
              borderRadius: 2,
              boxShadow: 2,
              overflow: "hidden",
            }}
          >
            <Box
              p={1.5}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ backgroundColor: columnTheme[colId].header }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ color: textColor }}
              >
                {col.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: colors.primary[300],
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 999,
                  color: textColor,
                }}
              >
                {col.items.length}
              </Typography>
            </Box>

            <Box p={1.5}>
              {col.items.length === 0 ? (
                <Typography
                  align="center"
                  sx={{
                    color: colors.grey[300],
                    fontStyle: "italic",
                    mt: 6,
                  }}
                >
                  Drop tasks here
                </Typography>
              ) : (
                col.items.map((item) => (
                  <Box
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(colId, item)}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1.5}
                    px={1.5}
                    py={1}
                    borderRadius={2}
                    sx={{
                      backgroundColor: colors.primary[300],
                      color: textColor,
                      cursor: "grab",
                      boxShadow: 1,
                      fontSize: isDashboard ? "0.8rem" : "1rem",
                    }}
                  >
                    <Typography>{item.content}</Typography>
                    {!isDashboard && (
                      <Button
                        size="small"
                        onClick={() => removeTask(colId, item.id)}
                        sx={{
                          minWidth: 0,
                          backgroundColor: colors.redAccent[600],
                          color: colors.grey[100],
                          fontWeight: "bold",
                          borderRadius: "50%",
                          "&:hover": {
                            backgroundColor: colors.redAccent[700],
                          },
                        }}
                      >
                        ×
                      </Button>
                    )}
                  </Box>
                ))
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default KanbanBoard;