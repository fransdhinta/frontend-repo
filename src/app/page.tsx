"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import LoginForm from "../components/loginForm";
import { RootState } from "../store/store";

export default function LoginPage() {
	const router = useRouter();
	const { loading } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (localStorage.getItem("idToken")) {
			router.replace("/main");
		} else {
			router.replace("/auth/login");
		}
	}, []);

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return null; // Return null as we're handling navigation via useEffect
}
