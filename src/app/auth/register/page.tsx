"use client";

import { Box, Container, Typography, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import LoginForm from "../../../components/loginForm";
import RegisterForm from "@/components/registerForm";

export default function LoginPage() {
	const router = useRouter();
	return (
        <RegisterForm />
	);
}
