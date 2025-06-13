import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartData } from "@/context/CartContext";
import { UserData } from "@/context/UserContext";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const { btnLoading, loginUser, verifyUser } = UserData();

  const { fetchCart } = CartData();

  const submitHandler = () => {
    verifyUser(Number(otp), navigate, fetchCart);
  };

  const [timer, setTimer] = useState(90);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem("email");
    await loginUser(email, navigate);
    setTimer(90);
    setCanResend(false);
  };
  return (
    <div className="min-h-[60vh]">
      <Card className="md:w-[400px] sm:w-[300px] m-auto mt-5">
        <CardHeader>
          <CardTitle>Verify User Otp</CardTitle>
          <CardDescription>
            if you dint get otp in your mail inbox then you can check your otp
            in your mail spam section
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-x-1">
            <Label>Enter Otp</Label>

            <Input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button disabled={btnLoading} onClick={submitHandler}>
            {btnLoading ? <Loader /> : "Submit"}
          </Button>
        </CardFooter>

        <div className="flex flex-col justify-center items-center w-[200px] m-auto">
          <p className="text-lg mb-3">
            {canResend
              ? "You can now Resend OTP"
              : `Time remaining: ${formatTime(timer)}`}
          </p>
          <Button
            onClick={handleResendOtp}
            className="mb-3"
            disabled={!canResend}
          >
            Resend Otp
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Verify;
