#!groovy

@Library("workflowlibs@1.8.0") _

pipeline {

    options {
        ansiColor colorMapName: 'XTerm'
        timestamps()
    }

    agent any

    stages {
        stage('Checkout Global Library') {
            steps {
                script{
                    globalBootstrap {
                        libraryName   = "cellsworkflowlibs"
                        libraryBranch = "master"

                        entrypointParams = [
                            type                  : "cellsComponent",
                            lint                  :  true,
                            sonarQube             :  true,
                            test                  :  true,
                            publish               :  false
                        ]
                    }
                }
            }
        }
    }
}