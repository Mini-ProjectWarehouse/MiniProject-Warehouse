document.addEventListener('DOMContentLoaded', () => {
    const bmiForm = document.getElementById('bmiform');
    const resultElement = document.getElementById('result');

    bmiForm.addEventListener('submit', function(e) {
        e.preventDefault();

        resultElement.innerHTML = '';
        resultElement.style.color = 'black';

        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const age = parseInt(document.getElementById('age').value, 10);
        const genderInput = document.querySelector('input[name="gender"]:checked');

        if (isNaN(height) || isNaN(weight) || isNaN(age) || height <= 0 || weight <= 0 || age <= 0 || !genderInput) {
            resultElement.textContent = 'Please fill out all fields with valid positive numbers.';
            resultElement.style.color = 'red'; 
            return;
        }
        
        const gender = genderInput.value;
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

        let category = '';
        let categoryColor = 'green';
        let ageNote = ''; 

        if (bmi < 18.5) {
            category = 'Underweight';
            categoryColor = 'blue'; 
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
            categoryColor = 'green'; 
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            categoryColor = 'orange'; 
        } else {
            category = 'Obesity';
            categoryColor = 'red';
        }
        

        resultElement.innerHTML = `For a ${age}-year-old ${gender}, your BMI is <strong>${bmi}</strong>. <br> This is considered <strong style="color: ${categoryColor};">${category}</strong>.${ageNote}`;
    });
});