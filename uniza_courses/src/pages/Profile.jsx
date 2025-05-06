import { Box, FormControl, TextField, Typography } from "@mui/material";
import Header from "../components/core.components/Header";
import profile_pic from "../assets/profile_pic.jpg";
import { useEffect, useRef, useState } from "react";
import LightTextField from "../components/core.components/LightTextField";
import PrimaryBtn from "../components/core.components/PrimaryBtn";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = ({ userData, getUserData }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(userData?.profile_img_url || null);

  const [name, setName] = useState(userData?.firstName || "");
  const [secondName, setSecondName] = useState(userData?.secondName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    userData?.teacher?.phone || ""
  );
  const [personalNumber, setPersonalNumber] = useState(
    userData?.student?.personalNum || ""
  );
  const [institute, setInstitute] = useState(
    userData?.teacher?.institute || ""
  );
  const [office, setOffice] = useState(userData?.teacher?.office || "");

  const [userImage, setUserImage] = useState(userData?.profile_img_url);

  const fileInputRef = useRef();

  useEffect(() => {
    setName(userData?.firstName || "");
    setSecondName(userData?.secondName || "");
    setEmail(userData?.email || "");
    setPhoneNumber(userData?.teacher?.phone || "");
    setPersonalNumber(userData?.student?.personalNum || "");
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
      const url = await handleUpload();
      const res = await fetch(`${API_URL}/api/user/editUser/${userData?.id}`, {
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
          profile_img_url: url,
        }),
      });

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
      localStorage.setItem("authToken", data.token);
      toast.success("Údaje boli úspešne uložené.");
      getUserData(
        localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
      );
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error(
        "Chyba pri ukladaní používateľských údajov. Skúste to znova."
      );
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file || !preview) return toast.warning("Najprv vyberte súbor");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_URL}/api/user/uploadProfileImage`, {
        method: "POST",
        body: formData,
        headers: {
          "x-access-token":
            localStorage.getItem("authToken") ||
            sessionStorage.getItem("authToken"),
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUserImage(data.url);
      console.log("Image URL:", data.url);
      return data.url;
    } catch (err) {
      console.error(err);
      toast.error("Upload error: " + err.message);
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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="image-upload-input"
            />
            <label htmlFor="image-upload-input" style={{ cursor: "pointer" }}>
              <img
                src={preview || profile_pic}
                alt="Profile"
                style={{
                  borderRadius: "50%",
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                  border: "3px solid #e7407b",
                }}
              />
            </label>
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
