import React, {useMemo, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {Label} from 'theme-ui'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    height: '100px',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export const StyledDropzone = (props) => {

    let fileReader;
    const handleFileRead = (e) => {
        const content = fileReader.result
        props.setText(content)

    }
    const onDrop = useCallback(acceptedFiles => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(acceptedFiles[0])
    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({onDrop, accept: '.vtt, .txt'});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <div className="upload">
            <Label>Class transcript</Label>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag and drop either .vtt or .txt files here, or click to upload!</p>
            </div>
        </div>
    );
}