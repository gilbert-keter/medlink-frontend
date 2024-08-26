"use client";
import Swal from "sweetalert2";
import React, { useRef, useState, useEffect } from "react";
import { Button, Form, Heading, TextInput } from "@carbon/react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";
import { useRouter } from "next/navigation";

const useLoadingNavigation = (path) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = () => {
    setIsLoading(true);
    router.push(path);
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return [isLoading, handleClick];
};

const use2FARedirect = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const redirect2FA = (email) => {
    setIsRedirecting(true);
    Swal.fire({
      title: "Redirecting to 2FA",
      text: "Please wait while we redirect you to the 2FA verification page...",
      imageUrl: "/logov2.svg",
      imageWidth: 70,
      imageHeight: 70,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      setIsRedirecting(false);
      Swal.close();
      router.push(
        `/onboarding/welcome-to-medlink/auth/2fa_security/?email=${encodeURIComponent(
          email
        )}`
      );
    }, 2000);
  };

  return [isRedirecting, redirect2FA];
};

function SignInForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const [isLoadingForgotPassword, handleForgotPasswordClick] =
    useLoadingNavigation("../../welcome-to-medlink/auth/password/request");
  const [isLoadingGoogleSignIn, setIsLoadingGoogleSignIn] = useState(false);
  const [isRedirecting2FA, redirect2FA] = use2FARedirect();
  
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    Swal.fire({
        title: "Signing you in",
        text: "Please wait...",
        imageUrl: "/logov2.svg",
        imageWidth: 70,
        imageHeight: 70,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
            axios.post("http://127.0.0.1:8000/auth/login/", { email, password })
                .then((response) => {
                    Swal.close();
                    if (response.data.success) {
                        if (response.data.message === "2FA code sent") {
                            toast.success("2FA code sent. Redirecting to 2FA verification page...");
                            redirect2FA(email);
                        }
                        toast.success("Login Success, Redirecting to Home page...");

                        sessionStorage.setItem('sessionId', response.data.session_id);
                        sessionStorage.setItem('userId', response.data.user_id);
                        sessionStorage.setItem('userEmail', response.data.email);
                        router.push("/home");
                    } else {
                        setError(response.data.message || "Sign-in failed");
                        toast.error(`Sign-in failed: ${response.data.message}`);
                    }
                })
                .catch((error) => {
                    Swal.close();
                    setError("An error occurred during sign-in.");
                    toast.error("An error occurred during sign-in:", error);
                });
        },
    });
};

  const handleGoogleSignInClick = async () => {
    setIsLoadingGoogleSignIn(true);
    try {
      await signIn();
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Error signing in with Google");
    } finally {
      setIsLoadingGoogleSignIn(false);
    }
  };

  const MyForm = () => (
    <Form
      aria-label="login-form"
      className="login-form"
      onSubmit={handleSignIn}
    >
      <Heading
        style={{
          textAlign: "left",
          width: "100%",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        Welcome Back, to Medlink
      </Heading>
      <TextInput
        id="email"
        name="email"
        type="email"
        className="inputs"
        labelText="Enter your Address"
        placeholder="Email Address"
        ref={emailRef}
      />
      <TextInput
        id="password"
        name="password"
        className="inputs"
        labelText="Enter your Password"
        type="password"
        placeholder="password"
        ref={passwordRef}
      />
      <Button size="sm" type="submit" className="btns">
        Sign In
      </Button>
      {error && <p className="error-message">{error}</p>}
      <Heading
        className="forgot-password"
        onClick={handleForgotPasswordClick}
        disabled={isLoadingForgotPassword}
      >
        <p> {isLoadingForgotPassword ? "Loading..." : "Forgot password?"}</p>{" "}
      </Heading>
      <Heading className="or-container">
        <hr className="or-line" />
        <span className="or-text">OR</span>
        <hr className="or-line" />
      </Heading>
      <Button
        kind="secondary"
        className="btns"
        size="sm"
        onClick={handleGoogleSignInClick}
        disabled={isLoadingGoogleSignIn}
      >
        {isLoadingGoogleSignIn ? "Loading..." : "Continue with Google"}
      </Button>
    </Form>
  );

  return (
    <div className="signin-form">
      <ToastContainer />
      <MyForm />
    </div>
  );
}

export default SignInForm;
