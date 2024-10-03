const express = require('express');
const app = express();
const port = 3000;

const calculateMean = (nums) => {
    const sum = nums.reduce((acc, num) => acc + num, 0);
    return sum / nums.length;
};

const calculateMedian = (nums) => {
    nums.sort((a, b) => a - b);
    const mid = Math.floor(nums.length / 2);
    return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const calculateMode = (nums) => {
    const frequency = {};
    nums.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    return Object.keys(frequency).find(key => frequency[key] === maxFreq);
};



const validateNums = (req, res, next) => {
    const { nums } = req.query;
    if (!nums) {
        return res.status(400).json({ error: 'nums are required.' });
    }

    const numArray = nums.split(',').map(num => {
        const parsedNum = Number(num);
        return isNaN(parsedNum) ? null : parsedNum; // null for non-numbers
    });

    if (numArray.includes(null)) {
        const invalidNum = nums.split(',').find(num => isNaN(Number(num)));
        return res.status(400).json({ error: `${invalidNum} is not a number.` });
    }

    req.numArray = numArray; // Store the valid number array in request for later use
    next();
};


app.get('/mean', validateNums, (req, res) => {
    const mean = calculateMean(req.numArray);
    res.json({ operation: 'mean', value: mean });
});

app.get('/median', validateNums, (req, res) => {
    const median = calculateMedian(req.numArray);
    res.json({ operation: 'median', value: median });
});

app.get('/mode', validateNums, (req, res) => {
    const mode = calculateMode(req.numArray);
    res.json({ operation: 'mode', value: mode });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app; 
