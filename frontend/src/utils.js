import {toast} from 'react-toastify'

import n from './components/images/neural_circuits.jpg';
import a from './components/images/algorithms.jpg';
import l from './components/images/linear_algebra.png';
import c from './components/images/crypto.jpg';

// export const classes = [
//     {className: 'Special Subject in Mathematics', classId: '18.S096', lectures: {'lecture 1': 1, 'lecture 2': 2, 'Null Spaces': 6}, image: n}, 
//     {className: 'Algorithms for Parallel Computing', classId: 'CS6320', lectures: {'lecture 1':1, 'lecture 2':2, 'lecture 3':3}, image: a},
//     {className: 'Deep Learning', classId: 'CS3892', lectures: {'Gradient Descent': 1, 'Stochastic Gradient Descent':2, 'Neural Networks':3}, image: l},
//     {className: 'Error Correcting Codes and Cryptography', classId: 'MATH3320', lectures: {'Error Detection': 1, 'Perfect Codes':2, 'Hamming Bounds':3}, image: c}
// ]

export const classes = [
    {className: 'Linear Algebra and Optimization', classId: '18.S096',
        lectures: {'Lecture 1: Introduction': 1, 'Lecture 2: Systems of Equations': 2, 'Lecture 6: Column Spaces & Null Spaces': 6}, image: l},
    {className: 'Introduction to Algorithms', classId: '6.006', lectures: {'Lecture 4: Hashing': 5}, image: a},
    {className: 'Neural Circuits for Computation', classId: '9.49', lectures: {'Lecture 2: What is cognition': 2}, image: n},
    {className: 'Error Correcting Codes and Cryptography', classId: 'MATH3320',
        lectures: {'Lecture 1: Error Detection': 1, 'Lecture 2: Perfect Codes':2, 'Lecture 3: Hamming Bounds':3}, image: c}
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
export const timeStampToSeconds = (timestamp) => {
    let times  = timestamp.split(":")
    let hours = parseInt(times[0]) * 60 * 60
    let minutes = parseInt(times[1]) * 60
    let seconds = parseInt(times[2].split(".")[0])
    return hours + minutes + seconds
}

export const getVideoId = (link) => {
    // https://youtu.be/uUJfM_Mn9gI?t=2459
    return link.split('/')[3]
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