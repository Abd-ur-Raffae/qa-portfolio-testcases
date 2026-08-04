pipeline {
    agent any

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
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                    } else {
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright install chromium --with-deps'
                    } else {
                        bat 'npx playwright install chromium'
                    }
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npx playwright test'
                    } else {
                        bat 'npx playwright test'
                    }
                }
            }
        }
    }

    post {
        always {
            // 1. Allure Report Plugin Integration with explicit commandline tool name
            script {
                try {
                    allure commandline: 'Allure', includeProperties: false, jdk: '', reportBuildPolicy: 'ALWAYS', results: [[path: 'allure-results']]
                } catch (Throwable e) {
                    echo "Notice: Allure Jenkins plugin step skipped or tool not configured in Jenkins."
                }
            }

            // 2. Publish native Jenkins JUnit Test Results
            junit allowEmptyResults: true, testResults: 'results.xml'

            // 3. Archive all test artifacts (Playwright report, Allure raw results, generated Allure report, traces, videos, XML results)
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**, allure-results/**, allure-report/**, results.xml', allowEmptyArchive: true

            // 4. Publish interactive Playwright HTML Report (HTML Publisher Plugin)
            script {
                try {
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright HTML Report'
                    ])
                } catch (Throwable e) {
                    echo "Notice: HTML Publisher plugin step skipped."
                }
            }
        }

        success {
            script {
                try {
                    slackSend color: 'good', message: "SUCCESSFUL: Job '${env.JOB_NAME}' [Build #${env.BUILD_NUMBER}] (${env.BUILD_URL})"
                } catch (Throwable e) {
                    echo "Notice: Slack notification step failed: ${e.message}"
                }
            }
        }

        failure {
            script {
                try {
                    slackSend color: 'danger', message: "FAILED: Job '${env.JOB_NAME}' [Build #${env.BUILD_NUMBER}] (${env.BUILD_URL})"
                } catch (Throwable e) {
                    echo "Notice: Slack notification step failed: ${e.message}"
                }
            }
        }
    }
}
