"use client";

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
import { RootState } from "../../store/store";
import { fetchAllUserData, fetchUserData, updateUserData } from "../../api/userApi";
import { setUserList, reset } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { User } from 'dhinta-turborepo/packages/shared';
import EditableUserCard from "@/components/editableCard";

export default function Main() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { userData } = useSelector((state: RootState) => state.auth);

	const { userList, loading, error } = useSelector(
		(state: RootState) => state.user
	);

	const handleFetchUser = async () => {
		const res = await fetchAllUserData();
		console.log(res);
		dispatch(setUserList(res.data));
	};

	const handleLogout = () => {
		localStorage.removeItem("idToken");
		dispatch(reset());
		router.replace("/auth/login");
  };
  
  const handleUpdateUser = async (id: string, updates: Partial<User>) => {
    try {
      await updateUserData({id: id, name: `${updates.name}`, address: `${updates.address}`});
      // Refresh user list or update local state
      handleFetchUser();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

	return (
		<Container maxWidth="lg">
			<Box sx={{ py: 4 }}>
				<Paper
					elevation={3}
					sx={{
						p: 4,
						position: "relative",
						minHeight: "70vh",
					}}
				>
					<Grid container spacing={3}>
						{/* Header Section */}
						<Grid item xs={12}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									mb: 4,
								}}
							>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										mb: 2,
									}}
								>
									<Typography variant="h5" component="h1" fontWeight="500">
										Welcome, {userData?.name}
									</Typography>
								</Box>
								<Button
									variant="contained"
									onClick={handleLogout}
									startIcon={<Refresh />}
									sx={{
										borderRadius: 2,
										textTransform: "none",
										px: 3,
									}}
								>
									Logout
								</Button>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant="contained"
								onClick={handleFetchUser}
								startIcon={<Refresh />}
								sx={{
									borderRadius: 2,
									textTransform: "none",
									px: 3,
								}}
							>
								Fetch User Data
							</Button>
						</Grid>
						{/* User Info Card */}
						{userList.length &&
							userList.map((el: User, index) => (
								<EditableUserCard
                  key={el.id} 
                  user={el}
                  onSave={handleUpdateUser}
                />
							))}
					</Grid>

					{/* Error Message */}
					{error && (
						<Paper
							elevation={0}
							sx={{
								p: 2,
								mt: 2,
								bgcolor: "error.light",
								color: "error.dark",
								borderRadius: 2,
							}}
						>
							<Typography>{error}</Typography>
						</Paper>
					)}

					{/* Loading Overlay */}
					<Backdrop
						sx={{
							color: "#fff",
							zIndex: (theme) => theme.zIndex.drawer + 1,
							position: "absolute",
						}}
						open={loading}
					>
						<CircularProgress color="inherit" />
					</Backdrop>
				</Paper>
			</Box>
		</Container>
	);
}
