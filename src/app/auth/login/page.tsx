"use client";

import { Box, Container, Typography, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import LoginForm from "../../../components/loginForm";

export default function LoginPage() {
	const router = useRouter();
	return (
        <LoginForm />
	);
}
