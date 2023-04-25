import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const DeleteForm = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  ];
  // const

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try{
                const headers = {
                    "Content-Type": "application/json",
                    "ACCESS_TOKEN": Cookies.get("access_token"),
                };
              const result = await axios.get("http://localhost:5000/users",{headers});
              console.log("result ", result.data.data)
              setData(result.data.data);
            }catch(error){
              console.log("request error ",error);
            }
          }
          fetchData();
      
    }, []);
    
    const deleteUserByEmail = async (e) => {
      e.preventDefault();
     
      try {
        const headers = {
          'Content-Type': 'application/json',
          'ACCESS_TOKEN': Cookies.get('access_token') 
        };
        
        const response = await axios.get(
          "http://localhost:5000/userdelete",
          {'email':email},
          {headers}
        );
        const data = response.data;
        console.log(data);
        if(data.status){
          alert("user added successfully")
        }else{
          alert("failed")
        }
        
      } catch (error) {
        console.error(error);
      } finally{
       
        setEmail("");
      }
    };
  const handleNameChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <Box m="20px">
        <Header
          title="DELETE USER"
          subtitle="Delete Users from Existing Users"
        />

        <Formik onSubmit={deleteUserByEmail}>
          {/* {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => ( */}
          <form onSubmit={deleteUserByEmail}>
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
                label="Email"
                onChange={handleNameChange}
                value={email}
                name="email"
                sx={{ gridColumn: "span 2" }}
              />
              <Button type="submit" color="secondary" variant="contained">
                DELETE User
              </Button>
            </Box>
          </form>
          {/* )} */}
        </Formik>
      </Box>
      <Box m="20px">
        <Header title="Users" subtitle="List of Users After delete operation" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  );
};

export default DeleteForm;
