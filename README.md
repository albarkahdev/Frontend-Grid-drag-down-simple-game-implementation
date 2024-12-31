# Grid Layout System with Drag & Drop (Typescript, React)

This project is a solution to frontend for Full-Stack developers. It extends a basic Frontend React app implemented in TypeScript to render and manage a grid layout system with drag-and-drop functionality.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js installed on your local machine
- Yarn package manager

### Installation

1. **Unzip the folder and go to the project directory:**

    ```sh
    cd project-directory
    ```

2. **Install dependencies:**

    ```sh
    yarn install
    ```

### Running the Application

To run the application in development mode, use:

    ```sh
    yarn start
    ```

    This will start the development server and open the application in your default web browser.

### Testing

To run the tests, use:

    ```sh
    yarn test
    ```

    This will execute the Jest tests to ensure the functionality works as expected.

## Implementation Details

### Components

- **App:** The main component that renders the grid layout system and handles drag-and-drop functionality.

### Functionality

1. **Module Movement:**
   - Implemented logic to restrict module movement within the top, right, and left edges of the layout container.
   - Extended the height of the layout container when a module is moved downwards beyond the bottom edge.
   - Snapped `x` and `w` values to the grid column unit.

2. **Collision Detection:**
   - Implemented collision detection to prevent modules from overlapping.
   - Ensured a 10px gutter spacing between module objects.

### Dependencies

- **React:** Frontend library for building user interfaces
- **React-DnD:** Low-level Drag and Drop library for React
- **TypeScript:** Typed superset of JavaScript for building scalable applications
- **Jest:** JavaScript testing framework for unit tests
- **Webpack:** Module bundler for JavaScript applications

## Additional Notes

- Used TypeScript 4.4 and React Hooks as per the technical requirements.
- Followed common design patterns and best practices, including modular component structure, and commented code for clarity.
- Implemented unit tests for critical functionality to ensure reliability.
- No additional tools were used beyond the specified dependencies.
