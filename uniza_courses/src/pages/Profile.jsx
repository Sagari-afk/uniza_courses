import { Box, FormControl, TextField, Typography } from "@mui/material";
import Header from "../components/core.components/Header";
import profile_pic from "../assets/profile_pic.jpg";
import { useEffect, useState } from "react";
import LightTextField from "../components/core.components/LightTextField";
import PrimaryBtn from "../components/core.components/PrimaryBtn";
import { toast } from "react-toastify";

const Profile = ({ userData, getUserData }) => {
  const [name, setName] = useState(userData?.firstName || "");
  const [secondName, setSecondName] = useState(userData?.secondName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    userData?.teacher?.phone || ""
  );
  const [personalNumber, setPersonalNumber] = useState(
    userData?.student?.personalNumber || ""
  );
  const [institute, setInstitute] = useState(
    userData?.teacher?.institute || ""
  );
  const [office, setOffice] = useState(userData?.teacher?.office || "");

  const [userImage, setUserImage] = useState(userData?.profile_img_url);

  useEffect(() => {
    setName(userData?.firstName || "");
    setSecondName(userData?.secondName || "");
    setEmail(userData?.email || "");
    setPhoneNumber(userData?.teacher?.phone || "");
    setPersonalNumber(userData?.student?.personalNumber || "");
    setInstitute(userData?.teacher?.institute || "");
    setOffice(userData?.teacher?.office || "");
    setUserImage(userData?.profile_img_url);
  }, [userData]);

  const saveUser = async () => {
    if (name === "") return toast.error("Meno je povinné.");
    if (secondName === "") return toast.error("Priezvisko je povinné.");
    if (email === "") return toast.error("E-mail je povinný.");
    if (userData?.role === "teacher" && phoneNumber === "")
      return toast.error("Telefónne číslo je povinné.");
    if (userData?.role === "student" && personalNumber === "")
      return toast.error("Osobne číslo je povinné.");
    if (userData?.role === "teacher" && institute === "")
      return toast.error("Katedra je povinná.");
    if (userData?.role === "teacher" && office === "")
      return toast.error("Kancelária je povinná.");

    try {
      console.log("saveUser", userData?.id);
      const res = await fetch(
        `http://localhost:3000/api/user/editUser/${userData?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              localStorage.getItem("authToken") ||
              sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            firstName: name,
            secondName: secondName,
            email: email,
            phone: phoneNumber,
            personalNum: personalNumber,
            institute: institute,
            office: office,
          }),
        }
      );

      if (!res.ok) {
        return toast.error(
          "Chyba pri ukladaní používateľských údajov. Skúste to znova."
        );
      }
      const data = await res.json();
      console.log("DATA", data);

      if (!data?.token) {
        return toast.error("Chyba pri ukladaní používateľských údajov.");
      }
      toast.success("Údaje boli úspešne uložené.");
      localStorage.setItem("authToken", data.token);
      // getUserData(data.token);
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error(
        "Chyba pri ukladaní používateľských údajov. Skúste to znova."
      );
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: "url(/homepage.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0,0,0,0.6)",
        backgroundBlendMode: "overlay",
        backgroundPosition: "center 70%",
      }}
    >
      <Box
        className="light_gradient-background-animation"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header style={{ background: "transparent" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            gap: 10,
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <img
              src={userImage || profile_pic}
              alt="Profile"
              style={{
                borderRadius: "50%",
                width: "250px",
                height: "250px",
                objectFit: "cover",
                border: "3px solid #e7407b",
              }}
            />
            <Box
              sx={{
                display: "flex",
                borderRadius: "1.5rem",
                background: "#C04F77",
                padding: "0.5rem 2rem",
              }}
            >
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                {userData?.role === "student" ? "Študent" : "Učiteľ"}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box
              display="flex"
              gap={3}
              width="600px"
              flexDirection="column"
              mb={7}
            >
              <Box display="flex" gap={2} width="600px">
                <Box display="flex" flexDirection="column" gap={1} width="100%">
                  <Typography>Meno</Typography>
                  <LightTextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    name="meno"
                    placeholder="Meno"
                  />
                </Box>

                <Box display="flex" flexDirection="column" gap={1} width="100%">
                  <Typography>Priezvisko</Typography>
                  <LightTextField
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value)}
                    fullWidth
                    required
                    name="priezvisko"
                    placeholder="Priezvisko"
                  />
                </Box>
              </Box>

              <Box display="flex" gap={2} width="600px">
                <Box display="flex" flexDirection="column" gap={1} width="100%">
                  <Typography>E-mail</Typography>
                  <LightTextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                    name="email"
                    placeholder="email"
                  />
                </Box>

                {userData?.role === "teacher" ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={1}
                    width="100%"
                  >
                    <Typography>Telefónne číslo</Typography>
                    <LightTextField
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      fullWidth
                      required
                      name="phoneNumber"
                      placeholder="Telefónne číslo"
                    />
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={1}
                    width="100%"
                  >
                    <Typography>Osobne číslo</Typography>
                    <LightTextField
                      value={personalNumber}
                      onChange={(e) => setPersonalNumber(e.target.value)}
                      fullWidth
                      required
                      name="personalNumber"
                      placeholder="Osobne číslo"
                    />
                  </Box>
                )}
              </Box>

              {userData?.role === "teacher" && (
                <Box display="flex" gap={2} width="600px">
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={1}
                    width="100%"
                  >
                    <Typography>Katedra</Typography>
                    <LightTextField
                      value={institute}
                      onChange={(e) => setInstitute(e.target.value)}
                      fullWidth
                      required
                      name="institute"
                      placeholder="Katedra"
                    />
                  </Box>

                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={1}
                    width="100%"
                  >
                    <Typography>Kancelária</Typography>
                    <LightTextField
                      value={office}
                      onChange={(e) => setOffice(e.target.value)}
                      fullWidth
                      required
                      name="office"
                      placeholder="Kancelária"
                    />
                  </Box>
                </Box>
              )}
            </Box>
            <PrimaryBtn
              style={{ color: "#000", width: "auto" }}
              onClick={saveUser}
            >
              Uložiť
            </PrimaryBtn>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
