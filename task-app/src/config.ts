interface AppConfig {
    apiHost: string;
    // Add any other configuration options you need here
}

let config: AppConfig;
console.log(import.meta.env.VITE_APP_ENV);
if (import.meta.env.VITE_APP_ENV === 'development') {
    console.log('Running in development mode');
    config = {
        apiHost: 'http://localhost:5001',
    };
} else {
    console.log('Running in production mode');
    config = { apiHost: import.meta.env.VITE_APP_API_URL };
}

export default config;
