import { useState } from "react";
import { useDispatch } from "react-redux";
import {
	Box,
	TextField,
	Button,
	Typography,
	Container,
	Paper,
} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { setUserData, setError, reset } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
import { createUserData } from "@/api/userApi";

export default function RegisterForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const dispatch = useDispatch();
	const router = useRouter();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			dispatch(setError("Passwords do not match"));
			return;
		}
		if (password.length < 6) {
			dispatch(setError("Password must be at least 6 characters long"));
			return;
		}
		if (name.length === 0) {
			dispatch(setError("Name is required"));
			return;
		}
		if (address.length === 0) {
			dispatch(setError("Address is required"));
			return;
		}
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			localStorage.setItem("idToken", await userCredential.user.getIdToken());
			await createUserData({
				id: userCredential.user.uid ?? "",
				name: name,
				address: address,
			});
			dispatch(
				setUserData({
					id: userCredential.user.uid ?? "",
					email: userCredential.user.email ?? "",
					name: name ?? "",
				})
            );
            dispatch(setError(""));
			router.push("/main");
		} catch (error: any) {
			dispatch(reset());
			dispatch(setError(error.message));
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper elevation={3} sx={{ p: 4, mt: 8 }}>
				<Typography component="h1" variant="h5" align="center">
					Register
				</Typography>
				<Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
						Register
					</Button>
					<Button
						fullWidth
						variant="text"
						sx={{ mt: 1 }}
						onClick={() => router.push("/auth/login")}
					>
						Already have an account? Sign in
					</Button>
				</Box>
			</Paper>
		</Container>
	);
}
