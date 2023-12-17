import { http_put_request } from "@/helpers/http_requests";
import Axios from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "../Toast/index";

const ChannelImageUpload = ({ channel_id,channel }) => {
    const { http, saveToken, token } = Axios();

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    // images use-state
    const [profileImgDelete, setProfileImgDelete] = useState(false);
    const [loader, setLoader] = useState(false);
    const [imgPreview, setImgPreview] = useState();
    const [originalImage, setOriginalImage] = useState();

    useEffect(() => {
        console.log("profile: ", channel?.logo_source);
        if (channel?.logo_source === null) {
            setImgPreview("/upload/avater.jpg");
            setProfileImgDelete(false);
        } else {
            setOriginalImage(channel?.logo_source);
            setImgPreview(`/upload/${channel?.logo_source}`);
            setProfileImgDelete(true);
        }
    }, [channel?.logo_source]);

    // upload new profile photos
    const uploadToServer = (event) => {
        setLoader(true);
        setTimeout(async () => {
            handleImageChange(event);
            const body = new FormData();
            const image = event.target.files[0];
            if (
                image &&
                ["image/jpg", "image/jpeg", "image/png"].indexOf(image.type) === -1
            ) {
                notify("warning", "Allowed format JPG & PNG");
                setLoader(false);
                return false;
            }
            body.append("file", image);
            const fileExt = image.name.split(".").pop();
            const fname = `${uuidv4()}.${fileExt}`;
            body.append("filename", fname);
            // update profile in api
            const api_res = await updateProfilInApi(fname);
            console.log("api res: ", api_res);
            if (api_res === "success") {
                setOriginalImage(fname);
                const response = await fetch(`/api/upload`, { method: "POST", body });
                console.warn("respone: ", response);
                if (response.ok) {
                    setLoader(false);
                    setProfileImgDelete(true);
                    notify("success", "Files uploaded successfully");
                } else {
                    setLoader(false);
                    notify("warning", "Error uploading files");
                }
            } else {
                setLoader(false);
                notify("warning", "Something is worng");
            }
        }, 800);
    };

    // update profile in api
    const updateProfilInApi = async (file = null) => {
        console.log("file",file);
        // set data
        const data = {
            ...channel,
            photo_source: file ? `${file}` : null,
        };
        const res = await http_put_request({
            endpoint: `	/channel/v1/putChannel/${channel_id}`,
            data: {  ...data,...channel },
        });
        console.warn("update res: ", res);
        return res?.status;
    };
    // image previewer handler
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            // const file = e.target.files?.[0];
            // setProfileImgDelete(true)
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgPreview(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    // delete profile image
    const handleDeleteProfile = (e) => {
        setLoader(true);
        setTimeout(async () => {
            // remove profile from api
            updateProfilInApi();
            console.log("originalImage: ", originalImage);
            const response = await fetch("/api/deleteImage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageName: originalImage }),
            });
            if (response.ok) {
                setImgPreview("/upload/avater.jpg");
                setLoader(false);
                setProfileImgDelete(false);
                notify("success", "Image deleted successfully");
            } else {
                setLoader(false);
                setProfileImgDelete(true);
                notify("warning", "Something is worng");
            }
        }, 800);
    };

    // custome style
    const icon_btn_style = {
        position: "absolute",
        bottom: " 1px",
        right: "0px",
        borderRadius: "50%",
        border: "none",
        background: "#6060fb",
        width: "100%",
        height: "100%",
        color: "aliceblue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };
    const icon_box_style = {
        position: "relative",
        width: "80px",
        height: "80px",
        borderRadius: "50%",
    };
    const imge_style = {
        objectFit: "cover",
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        outline: "rgba(68, 143, 223, 0.26) solid 12px",
    };

    return (
        // <div className="form-group" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        //     <div style={icon_box_style}>
        //         {
        //             profileImgDelete ?
        //                 <button type={"button"} style={icon_btn_style}>
        //                     {
        //                         loader ?
        //                             <BounceLoader color="#fff" size={15}/>
        //                         :<>
        //                             <i className={"fas fa fa-camera"}></i>
        //                         <input   onChange={uploadToServer}    type={"file"}  style={ { ...icon_btn_style,opacity:"0",cursor:"pointer" }}  />
        //                             </>
        //                     }

        //                 </button>
        //                 :
        //                 <button type={"button"} style={ { ...icon_btn_style,background:'#ff5f5f' }} onClick={handleDeleteProfile}>
        //                     { loader ?
        //                         <BounceLoader color="#fff" size={15}/>
        //                         :
        //                         <i className={"fas fa fa-trash "} ></i>
        //                     }
        //                 </button>
        //         }
        //         <img src={`${imgPreview}`} alt="Profile Avatar" className="profile-avatar"  />
        //     </div>

        // </div>
        <>
            <div className="h-14 w-14 rounded-full">
                <img
                    src={`${imgPreview}`}
                    alt="Profile Avatar"
                    className="profile-avatar"
                />
            </div>

            <div>
                <span className="mb-1.5 text-black dark:text-white">
                    Edit your photo
                </span>
                <span className="flex gap-2.5">
                    {profileImgDelete ? (
                        <button className="text-sm hover:text-primary" onClick={handleDeleteProfile}>Delete</button>
                    ) : (
                        <button className="text-sm hover:text-primary relative">
                            Update
                            <input
                                onChange={uploadToServer}
                                type={"file"}
                                style={{ ...icon_btn_style, opacity: "0", cursor: "pointer" }}
                            />
                        </button>
                    )}
                </span>
            </div>
        </>
    );
};

export default ChannelImageUpload;
