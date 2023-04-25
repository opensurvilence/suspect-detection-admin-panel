import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {useState} from "react"

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [userdetails, setUserdetails]=useState({
    name:"",
    email:"",
    phone:"",
    password:""
  });
  const onChangeUser=(e)=>{
    e.preventDefault();
    const {name,value} = e.target;
    setUserdetails(prev => {
      return {...prev, [name]: value}
    })
    console.log(userdetails);
  }

  const handleSubmit =(e) => {
    console.log(userdetails);

    const userdata = userdetails;
    e.preventDefault();
    fetch('http://localhost:5000/add/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    // insert data to be sent in the request body here
    userdata
  })
})
  .then(response => response.json())
  .then(data => {
    // handle the response data here
    alert("user added")
  })
  .catch(error => {
    // handle any errors that occur during the request here
    alert("error occured")
  });

  };
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleSubmit}
        validationSchema={checkoutSchema}
      >
        {({
          errors,
          touched,
          handleBlur,
        }) => (
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
                label="name"
                onBlur={handleBlur}
                onChange={onChangeUser}
                value={userdetails.name}
                name="name"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 12" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={onChangeUser}
                value={userdetails.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 12" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={onChangeUser}
                value={userdetails.phone}
                name="phone"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 12" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={onChangeUser}
                value={userdetails.password}
                name="password"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 12" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
});

export default Form;
