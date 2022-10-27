const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner({
serverUrl: 'http://localhost:9000',
options: {
  'sonar.sources': 'src',
  'sonar.tests': 'src',
  'sonar.inclusions': 'src/**/*.ts', // Entry point of your code
  'sonar.test.inclusions': 'src/**/*.spec.ts,src/**/*.spec.jsx',
  },
}, () => {
console.log('Error Occurred while scanning');                    
});