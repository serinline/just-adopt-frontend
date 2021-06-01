import {api} from "../api";
import React, {useEffect, useState} from "react";


const uploadFile = (file, onUploadProgress, name) => {
    let formData = new FormData();

    formData.append("image", file);

    return api.post(`/pets/addImage/${name}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};

const UploadImages = (props) => {

    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
    };

    const upload = () => {
        let currentFile = selectedFiles[0];

        setProgress(0);
        setCurrentFile(currentFile);

        uploadFile(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        }, props.name)
            .then((response) => {
                console.log("props.name " + props.name)
                setMessage(response.data.message);
            })
            .catch(() => {
                setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile(undefined);
            });

        setSelectedFiles(undefined);
    };

    return (
        <div>
            {currentFile && (
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-info progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: progress + "%" }}
                    >
                        {progress}%
                    </div>
                </div>
            )}

            <label className="btn btn-light">
                <input type="file" onChange={selectFile} />
            </label>

            <label>
                <button
                    className="btn btn-secondary"
                    disabled={!selectedFiles}
                    onClick={upload}
                >
                    Upload
                </button>
            </label>

            <div className="alert alert-light" role="alert">
                {message}
            </div>
        </div>
    );
};

export default UploadImages;