pipeline {
    agent any

    /*
      Optional: Use NodeJS Tool configured in Jenkins (Jenkins -> Manage Jenkins -> Tools -> NodeJS Installations)
      Uncomment the 'tools' block if using the NodeJS Jenkins Plugin.
    */
    // tools {
    //     nodejs 'NodeJS' // Name of your Node.js tool configured in Jenkins
    // }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Installs Node dependencies from package-lock.json
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Installs Playwright browser binaries and system dependencies
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Runs the Playwright test suite
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Archive the HTML test report and failure artifacts (traces, screenshots, videos)
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true

            // Publish HTML report in Jenkins UI (Requires HTML Publisher Plugin in Jenkins)
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
        }
    }
}
