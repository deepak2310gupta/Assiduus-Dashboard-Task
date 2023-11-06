import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./UploadFileDialog.css";

export default function UploadFileDialog({ open, setOpen, dialogTitle }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      // Update with your server endpoint
      // const response = await axios.post('https://your-server-endpoint.com/upload', formData);
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
  };

  const isFilesUploaded = files?.length > 0;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent className="dialog-content">
          <div {...getRootProps()} className="drop-container">
            <input {...getInputProps()} />
            <p>Drag 'n' drop files here, or click to select files</p>
            <em>(1 file is the maximum number of file you can drop here)</em>
          </div>
          {isFilesUploaded && (
            <List className="file-list">
              {files?.map((file, index) => (
                <ListItem key={index} className="list-item-styled">
                  <ListItemText primary={file.name} />
                  {file.type.startsWith("image/") ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      style={{ maxWidth: "100px" }}
                    />
                  ) : (
                    <object
                      data={file.preview}
                      style={{ height: "100px", width: "auto" }}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleUpload} variant="contained">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
