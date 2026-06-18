# Currency-Converter-Using-OWL

A simple and interactive Currency Converter application built with **OWL (Odoo Web Library)**. The application allows users to convert amounts between different currencies using real-time exchange rates through an external API.

## Features

* Convert between multiple currencies
* Real-time exchange rate retrieval
* User-friendly interface
* Currency selection with country flags
* Reactive UI powered by OWL
* Copy converted results to clipboard
* Responsive design

## Technologies Used

* OWL (Odoo Web Library)
* JavaScript (ES6+)
* HTML5
* CSS3 / Bootstrap
* Exchange Rate API

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MahmoudSalah94/Currency-Converter-Using-OWL.git
```

2. Navigate to the project directory:

```bash
cd Currency-Converter-Using-OWL
```

3. Open the project in your preferred development environment.

4. Serve the application using a local web server.

Example using Python:

```bash
python -m http.server 8000
```

5. Open your browser and visit:

```text
http://localhost:8000
```

## Usage

1. Enter the amount you want to convert.
2. Select the source currency.
3. Select the target currency.
4. View the converted result.
5. Optionally copy the result using the **Copy** button.

## Project Structure

```text
currency-converter-owl/
│
├── index.html

├── assets/

│   └── src

        └── css

            └── currency_converter.css

        └── js

            └── currency_converter.js

            └── owl.iife.js

└── README.md
```

## Learning Objectives

This project demonstrates:

* OWL Components
* Reactivity Management with `signal`
* Event Handling
* API Requests with `fetch`
* Dynamic Rendering
* Component Lifecycle Management

## Future Improvements

* Historical exchange rates
* Offline caching
* Multi-language support
* Exchange rate charts

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Author

Developed using OWL (Odoo Web Library) as a practical example of building reactive web applications.
