# Surgeon Intake Tool

A comprehensive patient intake form for orthopedic surgeons, built with React and Material-UI.

## Features

- **Multi-step Form**: Organized into logical sections (Chief Complaint, Medical History, Review)
- **Conditional Fields**: Dynamic form fields based on user selections
- **Form Validation**: Comprehensive validation using React Hook Form and Yup
- **Modern UI**: Clean, professional interface using Material-UI
- **Responsive Design**: Works on desktop and mobile devices

## Form Sections

### Chief Complaint & Pain Assessment
- Patient demographics and chief complaint
- Knee-specific pain assessment
- Pain scales and descriptions
- Treatment history and imaging studies
- Living situation and occupation details

### Medical History
- Diabetes Mellitus Type 2 (DM2)
- Cardiac history and procedures
- DVT history
- MRSA/SSI history
- Blood thinners and immunosuppression
- Opioid and tobacco use

### Review & Submit
- Complete information review
- Final submission with validation

## Technology Stack

- **React 18**: Frontend framework
- **Material-UI**: UI component library
- **React Hook Form**: Form management
- **Yup**: Form validation
- **Emotion**: CSS-in-JS styling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd surgeon-intake-tool
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## Deployment

### Build for Production
```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Render
1. Connect your GitHub repository to Render
2. Set the build command to: `npm run build`
3. Set the publish directory to: `build`
4. Deploy!

## Form Field Structure

The form captures comprehensive patient information including:

- **Patient Demographics**: Name, occupation, living situation
- **Chief Complaint**: Detailed pain assessment with scales
- **Medical History**: Complete medical background
- **Risk Factors**: DVT, MRSA, blood thinners, etc.
- **Medications**: Current medications and treatments

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.