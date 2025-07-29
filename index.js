const express = require('express');
const app = express();
app.use(express.json());
app.use(require('cors')());

const fullName = "navneet";
const dob = "17092004";
const email = "nav@xyz.com";
const rollNumber = "nav123";

app.post('/bfhl', (req, res) => {
  try {
    const inputData = req.body.data;
    let even_numbers = [], odd_numbers = [], alphabets = [], special_characters = [], sum = 0, alphabetConcat = "";

    inputData.forEach(item => {
      if (!isNaN(item)) {
        const num = parseInt(item);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphabetConcat += item;
      } else {
        special_characters.push(item);
      }
    });

    const concat_string = alphabetConcat
      .split('')
      .reverse()
      .map((char, idx) => idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
      .join('');

    const response = {
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email: email,
      roll_number: rollNumber,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ is_success: false, message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
