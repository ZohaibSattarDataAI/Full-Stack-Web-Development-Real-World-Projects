# 8-Digit Calculator

A fully functional calculator built using pure HTML, CSS, and JavaScript that supports basic arithmetic operations with an 8-digit display limit.

## Project Overview

This calculator is a web-based application that performs basic arithmetic calculations while maintaining a clean, user-friendly interface. It is designed with a strict 8-digit display limit, ensuring results remain readable and manageable. The calculator handles all fundamental operations with proper error handling and responsive design.

## Features

- **8-digit display limit**: Input and results are limited to 8 digits for clean presentation
- **Basic arithmetic operations**: Addition, subtraction, multiplication, and division
- **Decimal support**: Full decimal point functionality for precise calculations
- **Clear and delete functions**:
  - C button: Resets the calculator completely
  - Delete button: Removes the last entered digit
- **Responsive design**: Works seamlessly on desktop, tablet, and mobile devices
- **Error handling**: Graceful handling of division by zero and overflow scenarios
- **Modern UI**: Clean interface with smooth hover effects and intuitive layout

## Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with flexbox, grid, and responsive design
- **JavaScript (ES6)**: Pure vanilla JavaScript for calculator logic
- **Font Awesome**: Icons for delete button

## Project Structure
8-digit-calculator/
├── calculator.html # Main HTML file
├── calculator.css # Stylesheet
├── calculator.js # JavaScript logic
└── README.md # Project documentation


## How It Works

### Algorithm Overview

The calculator follows a systematic approach to handle user input and calculations:

1. **Input Handling**:
   - Numbers are stored as strings until calculation
   - Each button press appends to the current display string
   - State management tracks whether waiting for second operand

2. **Digit Limit Logic**:
   - Input is restricted to 8 digits (excluding decimal point)
   - For results exceeding 8 digits, appropriate rounding or scientific notation is applied
   - Real-time digit counter provides user feedback

3. **Operation Handling**:
   - Uses operator precedence with immediate execution model
   - Supports chained operations (e.g., 5 + 3 × 2)
   - Prevents invalid operator sequences (e.g., ++, ÷÷)

4. **Result Formatting**:
   - Results are formatted to fit within 8-digit limit
   - Decimal results are rounded appropriately
   - Large numbers switch to scientific notation when necessary

5. **Error Management**:
   - Division by zero shows alert and resets calculator
   - Overflow situations are handled gracefully
   - Invalid states are prevented through input validation

## How to Run the Project

1. **Clone or download the repository**

   ```bash
   git clone https://github.com/yourusername/8-digit-calculator.git

   Navigate to the project directory
   ```
   cd 8-digit-calculator
   Open the HTML file in your browser

Double-click calculator.html

Or open via browser's "Open File" option

Alternative: Use a live server

For better development experience, use VS Code Live Server extension

Or any other local server setup

Screenshots
https://./screenshot.png

Note: Add actual screenshots to your project repository

Future Improvements
Potential enhancements for future versions:

Scientific Functions: Add sin, cos, tan, log, and square root operations

Keyboard Support: Enhanced keyboard input for all functions

UI Themes: Light/dark mode toggle and custom color schemes

Calculation History: Display previous calculations

Memory Functions: M+, M-, MR, MC memory operations

Percentage Calculations: Direct percentage calculations

Export Results: Copy results to clipboard functionality

Unit Converter: Built-in unit conversion capabilities

License
This project is available under the MIT License. See the LICENSE file for more details.

Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

Acknowledgments
Built as a demonstration of vanilla JavaScript capabilities

Inspired by classic calculator designs

Created to showcase clean code practices and algorithm implementation

**Zohaib Sattar**  
📧 Email: [zabizubi86@gmail.com](mailto:zabizubi86@gmail.com)  
🔗 LinkedIn: [Zohaib Sattar](https://www.linkedin.com/in/zohaib-sattar) 

---

## 🙌 Author
**Zohaib Sattar**  
📧 Email: zabizubi86@gmail.com  
🔗 LinkedIn: Zohaib Sattar  

---

## ⭐ Support the Project
If you find this repository helpful for learning or building real-world web applications, please ⭐ **star the repo** and share it.  
Your support helps grow open-source contributions 🚀
