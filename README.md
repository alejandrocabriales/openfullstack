# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


 ### Setting Up and Running the Project

To get started with this project, follow these steps:

1. **Create a `.env` File:**
   - In the root directory of the project, create a `.env` file.
   - Inside the `.env` file, define the `VITE_API_KEY` variable with your API key from [OpenWeatherMap](https://openweathermap.org/api).

   Example:
   ```env
   VITE_API_KEY=your_openweathermap_api_key_here
