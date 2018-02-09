#!groovy
properties ([
    buildDiscarder(logRotator(artifactNumToKeepStr: '5', daysToKeepStr: '15')),
    disableConcurrentBuilds()
])

def parameters = [:]
parameters['label'] = "vsearch.${env.BRANCH_NAME}.${env.BUILD_NUMBER}".replaceAll("[^a-zA-Z0-9]+","_")
parameters['resourceLimitCpu'] = "2"
parameters['resourceRequestCpu'] = "2"
parameters['resourceLimitMemory'] = "1Gi"
parameters['resourceRequestMemory'] = "1Gi"
parameters['buildCommands'] = ["lint", "test"]

appengineBuildDependenciesNode(parameters) {}

