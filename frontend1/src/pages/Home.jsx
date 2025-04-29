import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import API from "../api/userApi";
import ConfirmDialog from "../components/ConfirmDialog";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    userId: null,
  });

  const fetchUsers = async () => {
    try {
      const res = await API.get("/");
      setUsers(res.data);
    } catch (err) {
      showSnackbar("Failed to fetch users", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddUser = async (user) => {
    try {
      await API.post("/", user);
      showSnackbar("User added successfully");
      fetchUsers();
    } catch (err) {
      showSnackbar("Failed to add user", "error");
    }
  };

  const handleUpdateUser = async (id, updatedUser) => {
    try {
      await API.put(`/${id}`, updatedUser);
      showSnackbar("User updated successfully");
      fetchUsers();
      setEditingUser(null);
    } catch (err) {
      showSnackbar("Failed to update user", "error");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await API.delete(`/${id}`);
      showSnackbar("User deleted");
      fetchUsers();
    } catch (err) {
      showSnackbar("Failed to delete user", "error");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Management
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <UserForm
          onAdd={handleAddUser}
          editingUser={editingUser}
          onUpdate={handleUpdateUser}
          onCancelEdit={() => setEditingUser(null)}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      <UserList
        users={filteredUsers}
        onDelete={(id) => setConfirmDialog({ open: true, userId: id })}
        onEdit={setEditingUser}
      />

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, userId: null })}
        onConfirm={() => {
          handleDeleteUser(confirmDialog.userId);
          setConfirmDialog({ open: false, userId: null });
        }}
        title="Are you sure you want to delete this user?"
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
