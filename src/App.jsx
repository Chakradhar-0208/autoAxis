import { Toaster } from "sonner";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import UserCars from "./components/UserCars";
import ListACar from "./components/ListACar";
import UpdateCar from "./components/UpdateCar";
import CarDetails from "./components/carDetails";
import { Skeleton } from "./components/ui/skeleton";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import "./App.css";

function LoadingSkeleton({ path }) {
  const isAuthPage = path === "/login" || path === "/signup";

  if (!isAuthPage) return null;

  return (
    <div className="flex flex-col justify-center h-[100dvh] items-center min-h-[500px]">
      <div className="absolute top-6 right-8">
        <ModeToggle />
      </div>
      <Card className="w-[90dvw] min-w-[22rem] sm:w-full max-w-sm">
        <CardHeader>
          <Skeleton className="border-4 h-[20px] w-[180px]" />
          <CardDescription className="flex flex-col space-y-1 mt-2">
            <Skeleton className="border-4 h-[20px] w-[225px]" />
            <Skeleton className="border-4 h-[20px] w-[100px]" />
          </CardDescription>
          <CardAction>
            <Skeleton className="border-4 h-[20px] w-[80px]" />
          </CardAction>
        </CardHeader>
        <form>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Skeleton className="border-4 h-[20px] w-[60px]" />
              <Skeleton className="border-4 h-[2.5rem] w-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="border-4 h-[20px] w-[80px]" />
              <Skeleton className="border-4 h-[2.5rem] w-full" />
            </div>
          </CardContent>
          <CardFooter className="flex-col mt-4 gap-1">
            <Skeleton className="border-4 h-[2.5rem] w-full flex justify-center items-center">
              <Skeleton className="border-8 h-[6px] w-[80px]" />
            </Skeleton>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

function AppRouter({ isLogged, setIsLogged, checkLogin }) {
  const location = useLocation();

  if (isLogged === null) {
    return <LoadingSkeleton path={location.pathname} />;
  }

  return (
    <>
      {isLogged && (
        <Header
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          checkLogin={checkLogin}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            isLogged ? (
              <Home setIsLogged={setIsLogged} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/signup"
          element={isLogged ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={
            isLogged ? <Navigate to="/" /> : <Login setIsLogged={setIsLogged} />
          }
        />
        <Route path="/uploadCar" element={<ListACar />} />
        <Route path="/updateCar/:id" element={<UpdateCar />} />
        <Route path="/getCarById/:id" element={<CarDetails />} />
        <Route path="/userCars" element={<UserCars />} />

        <Route path="/userCars/:userId?" element={<UserCars />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {isLogged && <Footer />}
    </>
  );
}

function App() {
  const [isLogged, setIsLogged] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const checkLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/check-login`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setTimeout(() => {
        setIsLogged(res.status === 200 && data?.message?.includes("true"));
      }, 500);
    } catch (err) {
      console.error("Check-login failed:", err);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" />
        <AppRouter
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          checkLogin={checkLogin}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
