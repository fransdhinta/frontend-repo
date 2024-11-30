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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { setUserData, setError, reset } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
import { fetchUserData } from "@/api/userApi";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			localStorage.setItem("idToken", await userCredential.user.getIdToken());
			const res = await fetchUserData({
				id: userCredential.user.uid ?? "",
			});
			console.log("USER DATA: ", res);
			dispatch(
				setUserData({
					id: userCredential.user.uid ?? "",
					email: userCredential.user.email ?? "",
					name: res.data.name ?? "",
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
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
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
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
					<Button
						fullWidth
						variant="text"
						sx={{ mt: 1 }}
						onClick={() => router.push("/auth/register")}
					>
						Don't have an account? Register
					</Button>
				</Box>
			</Paper>
		</Container>
	);
}
