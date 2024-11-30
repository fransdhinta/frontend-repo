"use client";

import { useState } from "react";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Box,
	Button,
	Typography,
	CircularProgress,
	Container,
	Paper,
	Grid,
	Card,
	CardContent,
	Backdrop,
	Avatar,
} from "@mui/material";
import { PersonOutline, Refresh } from "@mui/icons-material";
import { User } from 'dhinta-turborepo/packages/shared';

interface EditableUserCard {
	user: User;
	onSave: (id: string, updates: Partial<User>) => void;
}

function EditableUserCard({ user, onSave }: EditableUserCard) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedName, setEditedName] = useState(user.name);
	const [editedAddress, setEditedAddress] = useState(user.address);

	const handleSave = () => {
		onSave(`${user.id}`, {
			name: editedName,
			address: editedAddress,
		});
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditedName(user.name);
		setEditedAddress(user.address);
		setIsEditing(false);
	};

	return (
		<Grid item xs={12} md={6}>
			<Card elevation={2}>
				<CardContent>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							mb: 2,
							justifyContent: "space-between",
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
								<PersonOutline />
							</Avatar>
							<Typography variant="h6">User Profile</Typography>
						</Box>
						{isEditing ? (
							<Box>
								<IconButton onClick={handleSave} color="primary">
									<Save />
								</IconButton>
								<IconButton onClick={handleCancel} color="error">
									<Cancel />
								</IconButton>
							</Box>
						) : (
							<IconButton onClick={() => setIsEditing(true)} color="primary">
								<Edit />
							</IconButton>
						)}
					</Box>

					{isEditing ? (
						<>
							<TextField
								fullWidth
								label="Name"
								value={editedName}
								onChange={(e) => setEditedName(e.target.value)}
								sx={{ mb: 2 }}
							/>
							<TextField
								fullWidth
								label="Address"
								value={editedAddress}
								onChange={(e) => setEditedAddress(e.target.value)}
							/>
						</>
					) : (
						<>
							<Typography variant="body1" color="text.secondary" gutterBottom>
								Name: {user.name}
							</Typography>
							<Typography variant="body1" color="text.secondary">
								Address: {user.address}
							</Typography>
						</>
					)}
				</CardContent>
			</Card>
		</Grid>
	);
}

export default EditableUserCard;
