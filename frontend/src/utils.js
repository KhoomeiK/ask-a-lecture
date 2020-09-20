import {toast} from 'react-toastify'

import n from './components/images/neural_circuits.jpg';
import a from './components/images/algorithms.jpg';
import l from './components/images/linear_algebra.png';
import c from './components/images/crypto.jpg';

export const classes = [
    {className: 'Special Subject in Mathematics', classId: '18.S096', lectures: {'lecture 1': 1, 'lecture 2':2}, image: n}, 
    {className: 'Algorithms for Parallel Computing', classId: 'CS6320', lectures: {'lecture 1':1, 'lecture 2':2, 'lecture 3':3}, image: a},
    {className: 'Deep Learning', classId: 'CS3892', lectures: {'Gradient Descent': 1, 'Stochastic Gradient Descent':2, 'Neural Networks':3}, image: l},
    {className: 'Error Correcting Codes and Cryptography', classId: 'MATH3320', lectures: {'Error Detection': 1, 'Perfect Codes':2, 'Hamming Bounds':3}, image: c}
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
    let seconds = parseInt(times[2].split(".")[0])
    const totalTime = hours + minutes + seconds
    return `${videoURL}?t=${totalTime.toString()}`
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