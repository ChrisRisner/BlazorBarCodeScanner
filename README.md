# BlazorBarCodeScanner

This sample application is the basic 'dotnet new blazorserver' application with the added capability of using the experimental Barcode Detection API.

The following sources were used to help figure out how to make this work
* [Using Javascript Barcode Detection API](https://www.educative.io/answers/how-to-use-javascript-barcode-detection-api)
* [Code Pen example of using streaming camera with JS](https://codepen.io/rebelchris/pen/jOyJOzr)

This started out as leveraging QuakkaJS to do barcode scanning but results were so hit and miss (almost all miss) that it was not a viable option.

# Redeployment

There is a GitHub action workflow that will facilitate deploying to Azure.  In order to recreate this process:

* Deploy a new web app (Linux based) in Azure
* From the Overview page, download the Provisioning Profile
* Go to Settings for project
* Go to Secrets and variables and add / update:
  * Name: AZURE_WEBAPP_PUBLISH_PROFILE
  * Value: Contents of provisioning profile
* Rerun the workflow
