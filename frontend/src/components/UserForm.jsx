import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";

const UserForm = ({ onAdd, editingUser, onUpdate, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) setFormData(editingUser);
    else resetForm();
  }, [editingUser]);

  const resetForm = () => {
    setFormData({ first_name: "", last_name: "", email: "", avatar: "" });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (
      formData.avatar &&
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/i.test(formData.avatar)
    ) {
      newErrors.avatar = "Invalid image URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingUser) {
      onUpdate(editingUser.id, formData);
    } else {
      onAdd(formData);
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          error={!!errors.first_name}
          helperText={errors.first_name}
          required
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          error={!!errors.last_name}
          helperText={errors.last_name}
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <TextField
          label="Avatar URL"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          error={!!errors.avatar}
          helperText={
            errors.avatar || "Optional: link to image (png, jpg, etc.)"
          }
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" type="submit">
            {editingUser ? "Update User" : "Add User"}
          </Button>
          {editingUser && (
            <Button variant="outlined" color="secondary" onClick={onCancelEdit}>
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default UserForm;
