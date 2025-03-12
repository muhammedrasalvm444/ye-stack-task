Search Field Project

Overview

This project is a search field component built using React and modern frontend technologies. The component efficiently handles user input, filters search results dynamically, and provides an optimized user experience.

Features

Debounced Search: Optimized input handling to reduce unnecessary API calls.

Case-Insensitive Search: Ensures accurate results regardless of letter case.

Dynamic Filtering: Real-time filtering of data based on user input.

API Integration: Fetches country data dynamically.

Optimized UI/UX: Built using styled component and styled components for a responsive design.

Tech Stack

React (with Hooks)

Javascript

Styled Components / Tailwind CSS (for styling)

react-intersection-observer;
Vercel (for deployment)

Installation

Clone the repository:

git clone https://github.com/your-username/search-field-project.git
cd search-field-project

Install dependencies:

npm install

Run the project locally:

npm run dev

Usage

Start typing in the search field to filter results dynamically.

The search input automatically capitalizes the first letter of each word.

The list updates in real-time as you type.

Folder Structure

📂 search-field-project
├── 📂 src
│ ├── 📂 components
│ │ ├── SearchField.tsx
│ │ ├── SearchResults.tsx
│ ├── 📂 hooks
│ │ ├── useDebounce.ts
│ ├── 📂 redux
│ │ ├── searchSlice.ts
│ ├── 📂 styles
│ ├── 📂 tests
│ ├── App.tsx
├── package.json
├── README.md

Testing

Run unit tests using:

npm run test

Deployment

To deploy on Vercel, run:

vercel

Contributions

Feel free to fork the repo and submit pull requests.

License

This project is licensed under the MIT License.
