import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const [userdetails, setUserdetails] = useState({
    "username": "",
    "password": ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdetails({ ...userdetails, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/login/admin",
        userdetails
      );
      const data = response.data;
      // set access token cookie with expiration time of 15 min
      Cookies.set("access_token", data.access_token, { expires: (1 / 24) * 4 });
      Cookies.set("user", 1, { expires: (1 / 24) * 4 });
      // get access token from cookie

      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }finally{
      setUserdetails({
        "username": "",
        "password": ""
      });
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <Box
      className="content-mine"
        
      >
        <Header title="Admin Portal" subtitle="login to your admin account" />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={userdetails}
          validationSchema={checkoutSchema}
        >
          {({ values, errors, touched, handleBlur }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={userdetails.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={userdetails.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  
                  {
                    !loading?
                    "login as admin":
                    "Please wait..."
                  }
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

export default Login;
