import {toast} from 'react-toastify'

export const classes = [
    {className: 'Special Subject in Mathematics', classNumber: '18.S096', lectures: {'lecture 1': 1, 'lecture 2':2}}, 
    {className: 'Algorithms for Parallel Computing', classNumber: 'CS6320', lectures: {'lecture 1':1, 'lecture 2':2, 'lecture 3':3}}
]

export const classKeywords = [
    {classNumber: "18.S096", keywords: ["matrix multiplication", "transpose", "inverse"]}
]

export const postLecture = (lecture) => (fetch(`${process.env.REACT_APP_API_URL}/class`, 
    {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lecture)
    }))

// Expects classId, lectureNumber, and question. Should return an array of timestamps
export const postSearch = (search) => (fetch(`${process.env.REACT_APP_API_URL}/search`, 
    {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(search)
    }))

export const popToast = (message) => {
    toast(message);
}

export const timeStampToYouTube = (timestamp, videoURL) => {
    let times  = timestamp.split(":")
    let hours = parseInt(times[0]) * 60 * 60
    let minutes = parseInt(times[1]) * 60
    let seconds = times[2].split()
    const totalTime = hours * 60 * 60 + (minutes * 60) + seconds
}

/**
 * 
 * {
    "transcript": "", 
    "classId": "18.06",
    "lectureNumber": 1, 
    "lectureTitle": "", 
    "videoLink": ""
}
 */